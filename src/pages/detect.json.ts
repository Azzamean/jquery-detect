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
    return new Response(JSON.stringify({ message: 'Missing URL' }), {
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
    const message = (error as Error)?.message

    // Better message for URL not found
    if (message.includes('ERR_NAME_NOT_RESOLVED')) {
      console.log(message)
      return {
        body: JSON.stringify({
          message: '404: Not Found. Please check the URL.'
        })
      }
    }

    console.error(error)
    return new Response(
      JSON.stringify({
        message: 'Error detecting version. Please try again later.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  console.log(
    version
      ? `Detected version ${version} for ${url}`
      : `No version detected for ${url}`
  )

  return {
    body: JSON.stringify({ version })
  }
}
