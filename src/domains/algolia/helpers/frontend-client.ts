import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import { useMemo } from 'react'
import getConfig from 'next/config'

let client: SearchClient

export const createAlgoliaFrontendClient = (): SearchClient => {
  const { publicRuntimeConfig } = getConfig()
  if (!client) {
    client = algoliasearch(
      publicRuntimeConfig.algolia.appId,
      publicRuntimeConfig.algolia.apiKey
    )
  }
  return client
}

export const useCreateAlgoliaFrontendClient = (): SearchClient => {
  const client = useMemo(() => createAlgoliaFrontendClient(), [])
  return client
}
