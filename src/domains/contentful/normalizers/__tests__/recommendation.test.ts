import { DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY } from '~config/constants/recommendations'
import {
  ContentfulExponeaRecommendation,
  normalizeExponeaFeed
} from '../recommendation'

const restMock = {
  sys: {
    space: { sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' } },
    id: 'mBpB7FFdcWAa7YrXwQ2Q3',
    type: 'Entry',
    createdAt: '2021-02-11T10:43:54.954Z',
    updatedAt: '2021-02-11T10:43:54.954Z',
    environment: { sys: { id: 'dev', type: 'Link', linkType: 'Environment' } },
    revision: 1,
    contentType: {
      sys: {
        type: 'Link',
        linkType: 'ContentType',
        id: 'exponeaRecommendation'
      }
    },
    locale: 'en-gb'
  },
  fields: {
    title: 'Trending',
    altTitle: 'Best Seller',
    id: 'someRecommendationId'
  }
}

const graphQLMock = {
  __typename: 'ExponeaRecommendation',
  title: 'Trending',
  altTitle: 'Best Seller',
  id: 'someRecommendationId'
} as const

describe(normalizeExponeaFeed, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      // @ts-expect-error
      const normalizedData = normalizeExponeaFeed(restMock)
      expect(normalizedData).toEqual({
        contentType: 'ExponeaRecommendation',
        title: 'Trending',
        altTitle: 'Best Seller',
        recommendationId: 'someRecommendationId',
        isProductSlider: false,
        itemsQuantity: DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY
      })
    })

    it('normalizes the data properly when isProductSlider is true', () => {
      // @ts-expect-error
      const normalizedData = normalizeExponeaFeed({
        ...restMock,
        fields: {
          ...restMock.fields,
          isSlider: true
        }
      })
      expect(normalizedData).toEqual({
        contentType: 'ExponeaRecommendation',
        title: 'Trending',
        recommendationId: 'someRecommendationId',
        isProductSlider: true,
        itemsQuantity: DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
        altTitle: 'Best Seller'
      })
    })

    it('does not error if passed undefined', () => {
      const normalizedData = normalizeExponeaFeed(undefined)
      expect(normalizedData).toEqual({
        contentType: 'ExponeaRecommendation',
        title: '',
        recommendationId: '',
        isProductSlider: false,
        itemsQuantity: DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
        altTitle: ''
      })
    })

    it('does not error if passed empty object', () => {
      const normalizedData = normalizeExponeaFeed(
        {} as ContentfulExponeaRecommendation
      )
      expect(normalizedData).toEqual({
        contentType: 'ExponeaRecommendation',
        title: '',
        recommendationId: '',
        isProductSlider: false,
        itemsQuantity: DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
        altTitle: ''
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeExponeaFeed(graphQLMock)
      expect(normalizedData).toEqual({
        contentType: 'ExponeaRecommendation',
        title: 'Trending',
        recommendationId: 'someRecommendationId',
        isProductSlider: false,
        itemsQuantity: DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
        altTitle: 'Best Seller'
      })
    })

    it('normalizes the data properly when isProductSlider is true', () => {
      const normalizedData = normalizeExponeaFeed({
        ...graphQLMock,
        isSlider: true
      })
      expect(normalizedData).toEqual({
        contentType: 'ExponeaRecommendation',
        title: 'Trending',
        recommendationId: 'someRecommendationId',
        isProductSlider: true,
        itemsQuantity: DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
        altTitle: 'Best Seller'
      })
    })
  })
})
