const rateMap = new Map<string, number[]>()
const RATE_LIMIT = 3
const RATE_WINDOW = 60 * 60 * 1000

export function checkRate(ip: string): boolean {
  const now = Date.now()
  const hits = (rateMap.get(ip) ?? []).filter(t => now - t < RATE_WINDOW)
  if (hits.length >= RATE_LIMIT) return false
  rateMap.set(ip, [...hits, now])
  return true
}