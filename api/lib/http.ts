export interface FnEvent {
  httpMethod: string
  headers: Record<string, string>
  body: string
}

export interface FnResponse {
  statusCode: number
  headers?: Record<string, string>
  body?: string
}

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? 'https://maximederycke.dev')
  .split(',')
  .map(o => o.trim())

const corsHeaders = (requestOrigin: string): Record<string, string> => {
  const origin = ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }
}

export const reply = (statusCode: number, body?: object, requestOrigin = ''): FnResponse => ({
  statusCode,
  headers: corsHeaders(requestOrigin),
  ...(body && { body: JSON.stringify(body) }),
})