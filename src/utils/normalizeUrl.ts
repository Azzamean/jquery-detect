export default function normalizeUrl(url: string) {
  url = url.trim()
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `http://${url}`
}
