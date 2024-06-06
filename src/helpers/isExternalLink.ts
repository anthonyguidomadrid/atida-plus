export const isExternalLink = (url: string): boolean => {
  if (url.match(/^(http(s)?|ftp):\/\/|mailto:/)) {
    return true
  }
  return false
}
