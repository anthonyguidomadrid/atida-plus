import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const isFeatureEnabled = (featureFlag: string): string => {
  return (
    publicRuntimeConfig[featureFlag] &&
    publicRuntimeConfig[featureFlag] === 'true'
  )
}
