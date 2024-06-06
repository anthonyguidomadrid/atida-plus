/**
 * @jest-environment node
 */
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { productsMock, productSkusMock } from '../../__mocks__/get-products'
import { getProducts } from '../get-products'

describe(getProducts, () => {
  beforeEach(() => {
    mget.mockResolvedValue(productsMock)
  })

  it('passes the correct index and skus to elasticsearch request', async () => {
    await getProducts('en-gb', {
      skus: productSkusMock,
      sessionChannel: { channel: 'amazon', sku: 'some-sku' }
    })
    expect(mget).toHaveBeenCalledWith({
      body: {
        ids: productSkusMock
      },
      index: 'index-en-gb'
    })
  })

  it('returns the normalized basket response with products', async () => {
    const response = await getProducts('en-gb', {
      skus: productSkusMock,
      sessionChannel: { channel: 'amazon', sku: 'some-sku' }
    })
    expect(response).toMatchSnapshot()
  })

  it('returns empty products', async () => {
    const response = await getProducts('en-gb', {
      skus: [],
      sessionChannel: undefined
    })
    expect(response).toMatchSnapshot()
  })
})
