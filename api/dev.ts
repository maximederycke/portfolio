// Wrapper local — simule le runtime Scaleway Functions pour tester sans déployer
import http from 'http'
import { handle } from './contact.ts'

const server = http.createServer(async (req, res) => {
  const chunks: Buffer[] = []
  req.on('data', chunk => chunks.push(chunk))
  req.on('end', async () => {
    const result = await handle({
      httpMethod: req.method ?? 'GET',
      headers: req.headers as Record<string, string>,
      body: Buffer.concat(chunks).toString(),
    })
    res.writeHead(result.statusCode, result.headers ?? {})
    res.end(result.body ?? '')
  })
})

const PORT = parseInt(process.env.PORT ?? '8080', 10)
server.listen(PORT, () => console.log(`Dev server → http://localhost:${PORT}/api/contact`))
