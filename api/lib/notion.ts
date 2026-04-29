const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

export async function notionPost(path: string, payload: unknown): Promise<{ id: string }> {
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

const rt = (content: string) => [{ type: 'text' as const, text: { content } }]

export const h2 = (c: string) => ({ type: 'heading_2' as const, heading_2: { rich_text: rt(c) } })
export const bullet = (c: string) => ({ type: 'bulleted_list_item' as const, bulleted_list_item: { rich_text: rt(c) } })
export const para = (c: string) => ({ type: 'paragraph' as const, paragraph: { rich_text: rt(c) } })