import {
  createElasticSearchClient,
  getElasticSearchUrlMapIndex
} from '~domains/elasticsearch/helpers/client'
import { ElasticSearchUrlMapRecord } from '../types'
import { isElasticsearchResponseError } from '~domains/elasticsearch'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const lookupPageUrl = async (
  locale?: string,
  path?: string
): Promise<ElasticSearchUrlMapRecord | undefined> => {
  const client = createElasticSearchClient()

  try {
    if (!path) {
      return undefined
    }

    const response = await client.get<{ _source: ElasticSearchUrlMapRecord }>({
      index: getElasticSearchUrlMapIndex(locale),
      id: path
    })

    return response.body?._source
  } catch (error) {
    if (
      isElasticsearchResponseError(error) &&
      error?.meta?.body?.found === false
    ) {
      return undefined
    }

    throw error
  }
}
