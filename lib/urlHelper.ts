export const extractHostname = (url: string) => {
  const urlWithProtocol = normalizeUrlWithProtocol(url)
  const hostname = new URL(urlWithProtocol).hostname
  return hostname
}

export const validateUrl = async (url: string, signal?: AbortSignal) => {
  const urlWithProtocol = normalizeUrlWithProtocol(url)

  try {
    await fetch(urlWithProtocol, {
      mode: 'no-cors',
      signal,
      redirect: 'follow',
    })
    return true
  } catch (e) {}

  return false
}

export const normalizeUrlWithProtocol = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : 'https://' + url
