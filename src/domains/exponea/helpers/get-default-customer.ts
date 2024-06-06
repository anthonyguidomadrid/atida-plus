import getConfig from 'next/config'

export const getDefaultCustomer = (): string => {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig.exponea.defaultCustomer
}
