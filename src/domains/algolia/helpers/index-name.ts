import getConfig from 'next/config'

export const getAlgoliaIndex = (
  locale?: string,
  indexName?: string
): string => {
  const { publicRuntimeConfig } = getConfig()

  return publicRuntimeConfig.algolia[indexName as string][locale as string]
}
