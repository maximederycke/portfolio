import { sendEmail } from './lib/email.ts'
import { type FnEvent, type FnResponse, reply } from './lib/http.ts'
import { checkRate } from './lib/rate-limit.ts'

// ─── Labels ───────────────────────────────────────────────────────────────────

const TYPE: Record<string, string> = {
  web: 'Application web',
  mobile: 'Application mobile',
  conseil: 'Conseil & audit',
}
const MODE: Record<string, string> = {
  agile: 'Agile',
  forfait: 'Forfait',
  unknown: 'À définir',
}
const BUDGET: Record<string, string> = {
  '<2k': '< 2 000 €',
  '2-5k': '2 000 – 5 000 €',
  '5-10k': '5 000 – 10 000 €',
  '+10k': '> 10 000 €',
  unknown: 'Non défini',
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export const handle = async (event: FnEvent): Promise<FnResponse> => {
  const origin = event.headers['origin'] ?? event.headers['Origin'] ?? ''
  if (event.httpMethod === 'OPTIONS') return reply(204, undefined, origin)
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed' }, origin)

  let body: Record<string, string>
  try {
    body = JSON.parse(event.body)
  } catch {
    return reply(400, { error: 'Invalid JSON' }, origin)
  }

  // Honeypot
  if (body._hp) return reply(400, undefined, origin)

  // Rate limit
  const ip = event.headers['x-forwarded-for']?.split(',')[0].trim() ?? ''
  if (!checkRate(ip)) return reply(429, { error: 'Trop de demandes. Réessayez dans une heure.' }, origin)

  const { type, mode, budget, description, nom, email, entreprise } = body

  if (!nom?.trim() || !email?.trim() || !type) {
    return reply(400, { error: 'Champs requis manquants.' }, origin)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return reply(400, { error: 'Email invalide.' }, origin)
  }
  if (!Object.keys(TYPE).includes(type)) {
    return reply(400, { error: 'Type de projet invalide.' }, origin)
  }
  if (mode && !Object.keys(MODE).includes(mode)) {
    return reply(400, { error: 'Mode de collaboration invalide.' }, origin)
  }
  if (budget && !Object.keys(BUDGET).includes(budget)) {
    return reply(400, { error: 'Budget invalide.' }, origin)
  }
  if (nom.trim().length > 100 || email.trim().length > 200) {
    return reply(400, { error: 'Champs trop longs.' }, origin)
  }
  if (description && description.length > 2000) {
    return reply(400, { error: 'Description trop longue.' }, origin)
  }

  try {
    await sendEmail({
      subject: `Nouveau contact — ${nom.trim()}`,
      text: buildEmailBody({ nom, email, entreprise, type, mode, budget, description }),
      replyTo: email.trim(),
    })

    return reply(200, { ok: true }, origin)
  } catch (err) {
    console.error('Email error:', err)
    return reply(500, { error: 'Erreur serveur.' }, origin)
  }
}

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildEmailBody(d: {
  nom: string; email: string; entreprise: string
  type: string; mode: string; budget: string; description: string
}) {
  return [
    `Nom : ${d.nom}`,
    `Email : ${d.email}`,
    ...(d.entreprise?.trim() ? [`Entreprise : ${d.entreprise}`] : []),
    '',
    `Type de projet : ${TYPE[d.type] ?? d.type}`,
    `Mode souhaité : ${MODE[d.mode] ?? d.mode}`,
    `Budget estimé : ${BUDGET[d.budget] ?? d.budget}`,
    '',
    'Description :',
    d.description || '—',
  ].join('\n')
}