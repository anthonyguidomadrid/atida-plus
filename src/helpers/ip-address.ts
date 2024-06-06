import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const getIpAddressLookupUrl = (): string => {
  return `${publicRuntimeConfig.IPAddressLookupUrl}`
}

export const getMyIpAddress = async (): Promise<string> => {
  const result = await fetch(getIpAddressLookupUrl())
    .then(response => response.json())
    .then(data => {
      return data?.ip
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error)
    })

  return result
}
