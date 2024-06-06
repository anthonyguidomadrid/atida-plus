/**
 * @jest-environment node
 */
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { elasticsearchProducts, basket } from '../../__mocks__/basket'
import { fetchProductsForBasket } from '../fetch-products-for-basket'

describe(fetchProductsForBasket, () => {
  beforeEach(() => {
    mget.mockResolvedValue(elasticsearchProducts)
  })

  it('passes the correct index and skus to elasticsearch request', async () => {
    await fetchProductsForBasket('en-gb', basket)
    expect(mget).toHaveBeenCalledWith({
      body: {
        ids: ['100000001', '100000002', '100000003']
      },
      index: 'index-en-gb'
    })
  })

  it('returns the normalized basket response with products', async () => {
    const response = await fetchProductsForBasket('en-gb', basket)
    expect(response).toMatchSnapshot()
  })
})
