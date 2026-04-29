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

export const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN ?? 'https://maximederycke.dev',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export const reply = (statusCode: number, body?: object): FnResponse => ({
  statusCode,
  headers: CORS,
  ...(body && { body: JSON.stringify(body) }),
})