import getConfig from 'next/config'

export const getJWTCookieDomain = (): string => {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig.host.includes('localhost') ||
    serverRuntimeConfig.host.includes('atida.de:3000')
    ? ''
    : serverRuntimeConfig.jwtCookieDomain
}
