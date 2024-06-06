/**
 * @jest-environment node
 */
// @ts-ignore
import { get } from '@elastic/elasticsearch'
import { lookupPageUrl } from '../lookup-page-url'

describe(lookupPageUrl, () => {
  describe('when url is found in the index', () => {
    beforeEach(() => {
      get.mockResolvedValue({
        body: {
          _index: 'url-map-pt-pt_pt',
          _type: '_doc',
          _id: '/some-product-slug',
          _score: 1.0,
          _source: {
            type: 'product',
            identifier: 'some-product-sku'
          }
        }
      })
    })

    it('searches for an object with the id of the url', async () => {
      await lookupPageUrl('en-gb', '/some-product-slug')
      expect(get).toHaveBeenCalledWith({
        id: '/some-product-slug',
        index: 'url-index-en-gb'
      })
    })

    it('returns the objects type and identifier', async () => {
      const response = await lookupPageUrl('en-gb', '/some-product-slug')
      expect(response).toEqual({
        type: 'product',
        identifier: 'some-product-sku'
      })
    })
  })

  describe('when url is not found in the index', () => {
    beforeEach(() => {
      get.mockRejectedValue({
        meta: {
          body: {
            found: false
          }
        }
      })
    })

    it('returns undefined', async () => {
      const response = await lookupPageUrl('en-gb', '/some-product-slug')
      expect(response).toEqual(undefined)
    })
  })

  describe('when a general error occurs', () => {
    beforeEach(() => {
      get.mockRejectedValue()
    })

    it('returns undefined', async () => {
      expect.assertions(1)
      await lookupPageUrl('en-gb', '/some-product-slug').catch(e =>
        expect(e).toEqual(e)
      )
    })
  })
})
