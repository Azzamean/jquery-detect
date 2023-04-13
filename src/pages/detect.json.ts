import type { APIRoute } from 'astro'

export const post: APIRoute = async ({ request }) => {
  let url
  const contentType = request.headers.get('Content-Type')
  if (contentType === 'application/json') {
    const data = await request.json()
    url = data.url
  } else if (contentType === 'application/x-www-form-urlencoded') {
    const data = await request.formData()
    url = data.get('url')
  }

  if (typeof url !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing URL' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return {
    body: JSON.stringify({
      version: '1.0.0'
    })
  }
}
