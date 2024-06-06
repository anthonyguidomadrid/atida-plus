/**
 * @jest-environment node
 */
import { Client } from '@elastic/elasticsearch'
import {
  createElasticSearchClient,
  getElasticSearchProductIndex,
  getElasticSearchUrlMapIndex
} from '../client'

describe(createElasticSearchClient, () => {
  it('creates the client with host and auth from next.js config', () => {
    createElasticSearchClient()
    expect(Client).toHaveBeenCalledWith({
      auth: {
        password: 'something-else',
        username: 'something'
      },
      node: 'elasticsearch.com'
    })
  })
})

describe(getElasticSearchProductIndex, () => {
  it('returns the correct index name for the locale', () => {
    expect(getElasticSearchProductIndex('pt-pt')).toBe('index-pt-pt')
    expect(getElasticSearchProductIndex('en-gb')).toBe('index-en-gb')
  })
})

describe(getElasticSearchUrlMapIndex, () => {
  it('returns the correct index name for the locale', () => {
    expect(getElasticSearchUrlMapIndex('pt-pt')).toBe('url-index-pt-pt')
    expect(getElasticSearchUrlMapIndex('en-gb')).toBe('url-index-en-gb')
  })
})
