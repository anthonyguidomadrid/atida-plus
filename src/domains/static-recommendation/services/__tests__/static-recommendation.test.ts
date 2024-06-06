/**
 * @jest-environment node
 */
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { Product } from '~domains/product/types'
import {
  staticRecommendationPayload,
  staticRecommendationNormalizedDataResponse
} from '../../__mocks__/staticRecommendation'
import { fetchStaticRecommendation } from '../static-recommendation'

describe(fetchStaticRecommendation, () => {
  beforeEach(() => {
    ;(mget as jest.Mock).mockResolvedValue(staticRecommendationPayload)
  })

  it('passes the correct parameters to elasticsearch request', async () => {
    await fetchStaticRecommendation('en-gb', {
      list: [
        {
          key: staticRecommendationPayload.list[0].key,
          products: staticRecommendationPayload.list[0].products.map(
            product => product
          ) as Partial<Product>[]
        }
      ],
      sessionChannel: undefined
    })

    expect(mget).toHaveBeenCalledWith({
      index: 'index-en-gb',
      body: {
        ids: staticRecommendationPayload.list[0].products
      }
    })
  })

  it('returns the normalized product response - without session channel', async () => {
    const response = await fetchStaticRecommendation('en-gb', {
      list: [
        {
          key: staticRecommendationNormalizedDataResponse[0].key,
          products: staticRecommendationNormalizedDataResponse[0].products.map(
            product => product
          ) as Partial<Product>[]
        }
      ],
      sessionChannel: undefined
    })

    expect(response).toMatchSnapshot()
  })
  it('returns the normalized product response - with session channel', async () => {
    const response = await fetchStaticRecommendation('en-gb', {
      list: [
        {
          key: staticRecommendationNormalizedDataResponse[0].key,
          products: staticRecommendationNormalizedDataResponse[0].products.map(
            product => product
          ) as Partial<Product>[]
        }
      ],
      sessionChannel: { channel: 'amazon', sku: '100000001100000002100000003' }
    })

    expect(response).toMatchSnapshot()
  })
})
