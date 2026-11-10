import { sendEmail } from './lib/email.ts'
import { type FnEvent, type FnResponse, reply } from './lib/http.ts'
import { checkRate } from './lib/rate-limit.ts'

// ─── Règles ───────────────────────────────────────────────────────────────────

// Limites alignées sur src/components/ContactForm.tsx
const MAX = { probleme: 2000, nom: 100, email: 200, telephone: 30, entreprise: 100 }

const FORMAT: Record<string, string> = {
  appel: 'Un appel',
  visite: 'Une visite sur place',
}

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
// Même règle que le formulaire : chiffres, espaces, points, tirets, parenthèses, « + » en tête ; 8 à 15 chiffres
const isValidPhone = (v: string) => {
  const digits = v.replace(/\D/g, '').length
  return /^\+?[\d\s().-]+$/.test(v) && digits >= 8 && digits <= 15
}

// Un champ absent ou d'un autre type que texte compte comme vide
const text = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

type Demande = {
  probleme: string
  format: string
  nom: string
  email: string
  telephone: string
  entreprise: string
}

// Renvoie le message d'erreur, ou null si la demande est valide
function validate(d: Demande): string | null {
  if (!d.probleme || !d.format || !d.nom || !d.email) return 'Champs requis manquants.'
  if (!Object.keys(FORMAT).includes(d.format)) return 'Format invalide.'
  if (d.format === 'appel' && !d.telephone) return 'Téléphone requis pour un appel.'
  if (!isValidEmail(d.email)) return 'Email invalide.'
  if (d.telephone && !isValidPhone(d.telephone)) return 'Téléphone invalide.'
  const tooLong = (Object.keys(MAX) as (keyof typeof MAX)[]).some(k => d[k].length > MAX[k])
  if (tooLong) return 'Champs trop longs.'
  return null
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export const handle = async (event: FnEvent): Promise<FnResponse> => {
  const origin = event.headers['origin'] ?? event.headers['Origin'] ?? ''
  if (event.httpMethod === 'OPTIONS') return reply(204, undefined, origin)
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed' }, origin)

  let body: Record<string, unknown>
  try {
    body = JSON.parse(event.body)
  } catch {
    return reply(400, { error: 'Invalid JSON' }, origin)
  }
  if (!body || typeof body !== 'object') return reply(400, { error: 'Invalid JSON' }, origin)

  // Honeypot
  if (body._hp) return reply(400, undefined, origin)

  // Rate limit
  const ip = event.headers['x-forwarded-for']?.split(',')[0].trim() ?? ''
  if (!checkRate(ip)) return reply(429, { error: 'Trop de demandes. Réessayez dans une heure.' }, origin)

  const demande: Demande = {
    probleme: text(body.probleme),
    format: text(body.format),
    nom: text(body.nom),
    email: text(body.email),
    telephone: text(body.telephone),
    entreprise: text(body.entreprise),
  }

  const error = validate(demande)
  if (error) return reply(400, { error }, origin)

  try {
    await sendEmail({
      subject: `Demande de rendez-vous — ${demande.nom}`,
      text: buildEmailBody(demande),
      replyTo: demande.email,
    })

    return reply(200, { ok: true }, origin)
  } catch (err) {
    console.error('Email error:', err)
    return reply(500, { error: 'Erreur serveur.' }, origin)
  }
}

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildEmailBody(d: Demande) {
  return [
    'Ce qui coince :',
    d.probleme,
    '',
    `Format souhaité : ${FORMAT[d.format]}`,
    '',
    `Nom : ${d.nom}`,
    `Email : ${d.email}`,
    `Téléphone : ${d.telephone || '—'}`,
    `Entreprise : ${d.entreprise || '—'}`,
  ].join('\n')
}
