import type { APIRoute } from 'astro'
import getVersion from '../utils/getVersion'

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

  let version
  try {
    version = await getVersion(url)
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: 'Error retrieving version.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  return {
    body: JSON.stringify({ version })
  }
}
