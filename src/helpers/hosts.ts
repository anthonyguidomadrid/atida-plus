/**
 * It returns a domain, ignoring http(s) and www, considering the full domain with locale,
 * but not the environment (if present, 'dev' or 'uat').
 *
 * Examples:
 *  - https://uat.atida.com -> atida.com
 *  - https://www.dev.atida.de -> atida.de
 *  - http://sparmed.de -> sparmed.de
 *  - http://localhost:3000/ -> localhost
 *  - http://atida.de:3000/ -> atida.de
 *
 * @param {String} host
 * @return {String}
 */
export const extractDomainFromHost = (host: string): string => {
  const regex = /(http)?(s)?(:\/\/)?(www\.)?(dev.|uat.)?(.*[^\:0-9\/\W])(\/)?/gi
  const matches = regex.exec(host)

  if (matches !== null && matches[6]) {
    return matches[6]
  }

  return ''
}

/**
 * It returns a domain, ignoring http(s) and www, but considering the full domain with locale,
 * included the environment.
 *
 * Examples:
 *  - https://uat.atida.com -> uat.atida.com
 *  - https://www.dev.atida.de -> dev.atida.de
 *  - http://sparmed.de -> sparmed.de
 *  - http://localhost:3000/ -> localhost:3000
 *
 * @param {String} host
 * @return {String}
 */
export const extractFullDomainFromHost = (host: string): string => {
  const regex = /(http)?[s]?(:\/\/)?(www\.)?(.*[^\W])(\/)?/gi
  const matches = regex.exec(host)

  if (matches !== null && matches[4]) {
    return matches[4]
  }

  return ''
}

export const checkIsAtidaDotCom = (host: string): boolean => {
  const extractedDomain = extractDomainFromHost(host)
  return !!(
    extractedDomain &&
    (extractedDomain === 'atida.com' || extractedDomain === 'localhost')
  )
}

export const checkIsAtidaGermany = (host: string): boolean => {
  const extractedDomain = extractDomainFromHost(host)
  return !!(extractedDomain && extractedDomain === 'atida.de')
}

export const checkIsSparMed = (host: string): boolean => {
  const extractedDomain = extractDomainFromHost(host)
  return !!(extractedDomain && extractedDomain === 'sparmed.de')
}

export const getHostFromLocale = (
  domainsPerLocale: {
    [key: string]: string
  },
  locale: string | undefined
): string => {
  if (locale !== undefined && domainsPerLocale[locale])
    return domainsPerLocale[locale]
  return domainsPerLocale[Object.keys(domainsPerLocale)[0]]
}

export const getHostWithProtocol = (host: string | undefined): string => {
  if (host === undefined) return ''
  const extractedDomain = extractFullDomainFromHost(host)

  if (extractedDomain.length > 0) {
    if (extractedDomain.substring(0, 9) === 'localhost') {
      return `http://${extractedDomain}`
    } else {
      return `https://www.${extractedDomain}`
    }
  }

  return ''
}

export const getLocalesPerHost = (domainsPerLocale: {
  [key: string]: string
}): {
  [key: string]: string[]
} => {
  const localesPerHost: {
    [key: string]: string[]
  } = {}

  Object.keys(domainsPerLocale).map(key => {
    const regex = /(http)?[s]?(:\/\/)?(www\.)?(.*[^\W])(\/)?/gi
    const matches = regex.exec(domainsPerLocale[key])
    let host = ''

    if (matches !== null && matches[4]) {
      if (matches[4].includes(`/${key}`)) {
        host = matches[4].replace(`/${key}`, '')
      } else {
        host = matches[4]
      }
    }

    if (host) {
      if (localesPerHost[host]) {
        localesPerHost[host].push(key)
      } else {
        localesPerHost[host] = [key]
      }
    }
  })
  return localesPerHost
}
