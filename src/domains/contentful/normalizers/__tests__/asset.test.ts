import type { Asset as ContentfulAsset } from 'contentful'
import type { Asset as GraphQLAsset } from '~generated-graphql'
import { normalizeAsset } from '../asset'

const restMock = {
  fields: {
    title: 'Contact image',
    description: 'Person looking at a tablet',
    file: {
      url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg',
      details: {
        size: 203421,
        image: {
          width: 751,
          height: 384
        }
      },
      fileName: 'adam-winger-iirbrh939yc-unsplash 1.jpg',
      contentType: 'image/jpeg'
    }
  }
} as ContentfulAsset

const graphQLMock = {
  __typename: 'Asset',
  title: 'Contact image',
  description: 'Person looking at a tablet',
  url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg',
  contentType: 'image/jpeg'
} as const

describe(normalizeAsset, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeAsset(restMock)

      expect(normalizedData).toEqual({
        description: 'Person looking at a tablet',
        title: 'Contact image',
        type: 'image/jpeg',
        url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg'
      })
    })

    it('does not error if passed empty object', () => {
      const normalizedData = normalizeAsset({} as ContentfulAsset)
      expect(normalizedData).toEqual({})
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeAsset(graphQLMock as GraphQLAsset)

      expect(normalizedData).toEqual({
        description: 'Person looking at a tablet',
        title: 'Contact image',
        type: 'image/jpeg',
        url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg'
      })
    })
  })
})
