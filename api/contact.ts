// ─── Types ────────────────────────────────────────────────────────────────────

interface FnEvent {
  httpMethod: string
  headers: Record<string, string>
  body: string
}

interface FnResponse {
  statusCode: number
  headers?: Record<string, string>
  body?: string
}

// ─── Notion ───────────────────────────────────────────────────────────────────

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

async function notionPost(path: string, payload: unknown): Promise<{ id: string }> {
  const res = await fetch(`${NOTION_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Notion ${res.status}: ${err}`)
  }
  return res.json() as Promise<{ id: string }>
}

// ─── CORS ─────────────────────────────────────────────────────────────────────

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN ?? 'https://maximederycke.dev',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

const reply = (statusCode: number, body?: object): FnResponse => ({
  statusCode,
  headers: CORS,
  ...(body && { body: JSON.stringify(body) }),
})

// ─── Rate limiting ────────────────────────────────────────────────────────────

const rateMap = new Map<string, number[]>()
const RATE_LIMIT = 3
const RATE_WINDOW = 60 * 60 * 1000

function checkRate(ip: string): boolean {
  const now = Date.now()
  const hits = (rateMap.get(ip) ?? []).filter(t => now - t < RATE_WINDOW)
  if (hits.length >= RATE_LIMIT) return false
  rateMap.set(ip, [...hits, now])
  return true
}

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
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS }
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed' })

  let body: Record<string, string>
  try {
    body = JSON.parse(event.body)
  } catch {
    return reply(400, { error: 'Invalid JSON' })
  }

  // Honeypot
  if (body._hp) return { statusCode: 400, headers: CORS }

  // Rate limit
  const ip = event.headers['x-forwarded-for']?.split(',')[0].trim() ?? ''
  if (!checkRate(ip)) return reply(429, { error: 'Trop de demandes. Réessayez dans une heure.' })

  const { type, mode, budget, description, nom, email, entreprise } = body

  if (!nom?.trim() || !email?.trim() || !type) {
    return reply(400, { error: 'Champs requis manquants.' })
  }

  try {
    const clientPage = await notionPost('/pages', {
      parent: { page_id: process.env.NOTION_CLIENTS_FOLDER_ID },
      properties: {
        title: { title: [{ text: { content: nom.trim() } }] },
      },
      children: buildFicheClient({ nom, email, entreprise }),
    })

    await notionPost('/pages', {
      parent: { page_id: clientPage.id },
      properties: {
        title: { title: [{ text: { content: 'Recueil de besoins' } }] },
      },
      children: buildRecueil({ nom, email, entreprise, type, mode, budget, description }),
    })

    return reply(200, { ok: true })
  } catch (err) {
    console.error('Notion error:', err)
    return reply(500, { error: 'Erreur serveur.' })
  }
}

// ─── Fiche client ─────────────────────────────────────────────────────────────

function buildFicheClient(d: { nom: string; email: string; entreprise: string }) {
  return [
    h2('Informations'),
    bullet(`Email : ${d.email}`),
    ...(d.entreprise?.trim() ? [bullet(`Entreprise : ${d.entreprise}`)] : []),
  ]
}

// ─── Recueil de besoins ───────────────────────────────────────────────────────

function buildRecueil(d: {
  nom: string; email: string; entreprise: string
  type: string; mode: string; budget: string; description: string
}) {
  return [
    h2('Informations client'),
    bullet(`Nom : ${d.nom}`),
    bullet(`Email : ${d.email}`),
    ...(d.entreprise?.trim() ? [bullet(`Entreprise : ${d.entreprise}`)] : []),
    h2('Contexte projet'),
    bullet(`Type : ${TYPE[d.type] ?? d.type}`),
    bullet(`Mode souhaité : ${MODE[d.mode] ?? d.mode}`),
    bullet(`Budget estimé : ${BUDGET[d.budget] ?? d.budget}`),
    h2('Description initiale'),
    para(d.description || '—'),
    h2('Questions à approfondir'),
    para('À compléter lors du premier échange.'),
    h2('Notes'),
    para(''),
  ]
}

// ─── Block helpers ────────────────────────────────────────────────────────────

const rt = (content: string) => [{ type: 'text' as const, text: { content } }]

const h2 = (c: string) => ({ type: 'heading_2' as const, heading_2: { rich_text: rt(c) } })
const bullet = (c: string) => ({ type: 'bulleted_list_item' as const, bulleted_list_item: { rich_text: rt(c) } })
const para = (c: string) => ({ type: 'paragraph' as const, paragraph: { rich_text: rt(c) } })
