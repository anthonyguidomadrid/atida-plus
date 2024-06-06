/**
 * @jest-environment node
 */
// @ts-ignore
import { getEntries } from 'contentful'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import axios from 'axios'
import { fetchBrands } from '../fetch-brands'

const contentfulBrands = {
  data: {
    pageCollection: {
      total: 1,
      items: [
        {
          __typename: 'Page',
          referencedContent: {
            __typename: 'Brand',
            title: 'Babaria',
            id: 'babaria-test-brand',
            image: {
              __typename: 'Asset',
              url:
                'https://images.ctfassets.net/7g2w796onies/38LA8ERIEBglSvG3XR2vCi/01fbdbc080c12381cf118fd8c90d1bf4/babaria-body-milk.jpeg'
            },
            url: {
              pageCollection: {
                items: [
                  {
                    slug: 'marca/babaria',
                    referenceContent: {
                      id: 'babaria-test-brand'
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
}

describe(fetchBrands, () => {
  beforeEach(() => {
    getEntries.mockResolvedValue({
      total: 3,
      limit: 500,
      skip: 0,
      items: [
        {
          fields: {
            title: 'Mercks',
            slug: 'marca/mercks',
            pageType: 'Brand',
            referencedContent: { fields: { title: 'Merck', id: 'mercks' } }
          }
        },
        {
          fields: {
            title: 'Patata',
            slug: 'marca/patata',
            pageType: 'Brand',
            referencedContent: { fields: { title: 'Patata', id: 'patata' } }
          }
        },
        {
          fields: {
            title: 'Atida',
            slug: 'marca/atida',
            pageType: 'Brand',
            referencedContent: { fields: { title: 'Atida', id: 'atida' } }
          }
        }
      ]
    })
  })
  describe('fetch brands with Content Delivery API', () => {
    beforeEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockResolvedValue(true)
    })

    afterEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockReset()
    })

    it('uses the CDA when the FF is on', async () => {
      await fetchBrands('en-gb')
      expect(getEntries).toHaveBeenCalledTimes(1)
      expect(getEntries).toHaveBeenCalledWith({
        include: 1,
        locale: 'en-GB',
        limit: 500,
        skip: 0,
        content_type: 'page',
        'metadata.tags.sys.id[in]': 'country-gb',
        'fields.pageType[in]': 'Brand'
      })
    })

    it('generates a brand per item in the response', async () => {
      const result = await fetchBrands('en-gb')
      expect(result.total).toBe(3)
      expect(result.items?.length).toBe(3)
    })

    it('generates a correct URL for a brand', async () => {
      const result = await fetchBrands('en-gb')
      expect(result.items?.[0].url).toBe('/marca/mercks')
    })
  })

  describe('calls Content Delivery API with pagination', () => {
    beforeEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockResolvedValue(true)
    })

    afterEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockReset()
    })

    it('can fetch more than one page', async () => {
      getEntries.mockResolvedValueOnce({
        total: 1800,
        limit: 500,
        skip: 0,
        items: [
          {
            fields: {
              title: 'Mercks',
              slug: 'marca/mercks',
              pageType: 'Brand',
              referencedContent: { fields: { title: 'Merck', id: 'mercks' } }
            }
          }
        ]
      })
      getEntries.mockResolvedValueOnce({
        total: 1800,
        limit: 500,
        skip: 500,
        items: [
          {
            fields: {
              title: 'Patata',
              slug: 'marca/patata',
              pageType: 'Brand',
              referencedContent: { fields: { title: 'Patata', id: 'patata' } }
            }
          }
        ]
      })
      getEntries.mockResolvedValueOnce({
        total: 1800,
        limit: 500,
        skip: 1000,
        items: [
          {
            fields: {
              title: 'Atida',
              slug: 'marca/atida',
              pageType: 'Brand',
              referencedContent: { fields: { title: 'Atida', id: 'atida' } }
            }
          }
        ]
      })
      getEntries.mockResolvedValueOnce({
        total: 1800,
        limit: 500,
        skip: 1500,
        items: [
          {
            fields: {
              title: 'Test',
              slug: 'marca/test',
              pageType: 'Brand',
              referencedContent: { fields: { title: 'Test', id: 'test' } }
            }
          }
        ]
      })

      const response = await fetchBrands('en-gb')
      expect(getEntries).toHaveBeenCalledTimes(4)
      expect(getEntries).toHaveBeenNthCalledWith(1, {
        include: 1,
        locale: 'en-GB',
        limit: 500,
        skip: 0,
        content_type: 'page',
        'metadata.tags.sys.id[in]': 'country-gb',
        'fields.pageType[in]': 'Brand'
      })
      expect(getEntries).toHaveBeenNthCalledWith(2, {
        include: 1,
        locale: 'en-GB',
        limit: 500,
        skip: 500,
        content_type: 'page',
        'metadata.tags.sys.id[in]': 'country-gb',
        'fields.pageType[in]': 'Brand'
      })
      expect(getEntries).toHaveBeenNthCalledWith(3, {
        include: 1,
        locale: 'en-GB',
        limit: 500,
        skip: 1000,
        content_type: 'page',
        'metadata.tags.sys.id[in]': 'country-gb',
        'fields.pageType[in]': 'Brand'
      })
      expect(getEntries).toHaveBeenNthCalledWith(4, {
        include: 1,
        locale: 'en-GB',
        limit: 500,
        skip: 1500,
        content_type: 'page',
        'metadata.tags.sys.id[in]': 'country-gb',
        'fields.pageType[in]': 'Brand'
      })
      expect(response).toEqual({
        items: [
          {
            id: 'mercks',
            title: 'Merck',
            url: '/marca/mercks'
          },
          {
            id: 'patata',
            title: 'Patata',
            url: '/marca/patata'
          },
          {
            id: 'atida',
            title: 'Atida',
            url: '/marca/atida'
          },
          {
            id: 'test',
            title: 'Test',
            url: '/marca/test'
          }
        ],
        total: 1800
      })
    })

    it('can fetch a single page', async () => {
      getEntries.mockResolvedValueOnce({
        total: 499,
        limit: 500,
        skip: 0,
        items: [
          {
            fields: {
              title: 'Atida',
              slug: 'marca/atida',
              pageType: 'Brand',
              referencedContent: { fields: { title: 'Atida', id: 'atida' } }
            }
          }
        ]
      })
      const response = await fetchBrands('en-gb')
      expect(getEntries).toHaveBeenCalledTimes(1)
      expect(getEntries).toHaveBeenNthCalledWith(1, {
        include: 1,
        locale: 'en-GB',
        limit: 500,
        skip: 0,
        content_type: 'page',
        'metadata.tags.sys.id[in]': 'country-gb',
        'fields.pageType[in]': 'Brand'
      })
      expect(response).toEqual({
        items: [
          {
            id: 'atida',
            title: 'Atida',
            url: '/marca/atida'
          }
        ],
        total: 499
      })
    })
  })
  describe('fetch brands with GrahpQL', () => {
    beforeEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockResolvedValue(false)
    })

    afterEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockReset()
    })
    it('does not use the CDA when the FF is on', async () => {
      await fetchBrands('en-gb')
      expect(getEntries).toHaveBeenCalledTimes(0)
    })
    it('creates the client passes the locale to request', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: contentfulBrands
      })

      await fetchBrands('en-gb')
      expect(axios.post).toHaveBeenLastCalledWith('', {
        query: expect.any(String),
        variables: {
          locale: 'en-GB',
          tags: 'country-gb',
          allLocales: ['en-GB', 'pt-PT', 'es-ES', 'de-DE']
        }
      })
    })

    it('returns the normalized response', async () => {
      ;(axios.post as jest.Mock).mockResolvedValueOnce({
        data: contentfulBrands
      })
      const response = await fetchBrands('en-gb')
      expect(response).toMatchSnapshot()
    })
  })
})
