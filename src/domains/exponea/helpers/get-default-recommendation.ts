import getConfig from 'next/config'
export const getDefaultRecommendation = (
  locale: string | undefined
): string => {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig.exponea.defaultRecommendation[locale as string]
}
