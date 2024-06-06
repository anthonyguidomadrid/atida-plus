export const sanitiseUrl = (url: string): string => {
  if (url.includes(' ')) return encodeURI(url)
  return url
}
