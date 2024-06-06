export const buildQueryWithUrl = (url: string, params: object): string => {
  let paramsStr = ''

  if (Object.values(params).length) {
    for (const [key, value] of Object.entries(params)) {
      paramsStr += `${key}=${value}&`
    }

    paramsStr = paramsStr.substring(0, paramsStr.length - 1)

    return `${url}?${paramsStr}`
  }

  return url
}
