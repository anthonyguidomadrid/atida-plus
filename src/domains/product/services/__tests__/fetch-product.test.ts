/**
 * @jest-environment node
 */
// @ts-ignore
import { get } from '@elastic/elasticsearch'
import { elasticsearchProduct } from '../../__mocks__/product'
import { fetchProduct } from '../fetch-product'

describe(fetchProduct, () => {
  beforeEach(() => {
    get.mockResolvedValue(elasticsearchProduct)
  })

  it('passes the correct index and sku to elasticsearch request', async () => {
    await fetchProduct('en-gb', {
      sku: '200000004',
      sessionChannel: { channel: 'some-channel', sku: 'some-sku' }
    })
    expect(get).toHaveBeenCalledWith({
      id: '200000004',
      index: 'index-en-gb'
    })
  })

  it('returns the normalized product response', async () => {
    const response = await fetchProduct('en-gb', {
      sku: '200000004',
      sessionChannel: { channel: 'some-channel', sku: 'some-sku' }
    })
    expect(response).toMatchSnapshot()
  })
})
