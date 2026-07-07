const TEM_API = 'https://api.scaleway.com/transactional-email/v1alpha1'

export async function sendEmail(payload: {
  subject: string
  text: string
  replyTo: string
}): Promise<void> {
  const res = await fetch(`${TEM_API}/regions/${process.env.SCW_DEFAULT_REGION ?? 'fr-par'}/emails`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': process.env.SCW_SECRET_KEY ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project_id: process.env.SCW_DEFAULT_PROJECT_ID,
      from: { name: 'Portfolio — Contact', email: process.env.EMAIL_FROM },
      to: [{ email: process.env.EMAIL_TO }],
      subject: payload.subject,
      text: payload.text,
      additional_headers: [{ key: 'Reply-To', value: payload.replyTo }],
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Scaleway TEM ${res.status}: ${err}`)
  }
}
