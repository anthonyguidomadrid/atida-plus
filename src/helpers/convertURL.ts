import { convert } from 'url-slug'

export const convertURL = (url: string, locale: string): string => {
  return url.includes(`/${locale}/`)
    ? `/${locale}/${convert(url.replace(`/${locale}/`, ''))}`
    : convert(url)
}

export const prependURLWithSlash = (
  url?: string | undefined
): string | undefined => {
  return url || url === ''
    ? url.charAt(0) === '/' || url.startsWith('http')
      ? url
      : `/${url}`
    : undefined
}

export const getLastPathFromURL = (url: string): string => {
  const pathArr = url.split('/')
  return pathArr[pathArr.length - 1]
}
