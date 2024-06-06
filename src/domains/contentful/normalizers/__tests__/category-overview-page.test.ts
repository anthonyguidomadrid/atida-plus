import {
  ContentfulCategoryCop,
  normalizeCategoryCop
} from '~domains/contentful'
import { CategoryCopFragment } from '~generated-graphql'
import type { DeepPartial } from '@reduxjs/toolkit'

const restMock: DeepPartial<ContentfulCategoryCop> = {
  sys: {
    contentType: {
      sys: { id: 'categoryCop' }
    }
  },
  fields: {
    title: 'Category Overview test',
    linkedCategory: {
      title: 'test title for linked category'
    }
  }
}

const graphQLMock: CategoryCopFragment = {
  __typename: 'CategoryCop',
  title: 'Category Cop',
  linkedCategory: {
    id: 'category_1',
    title: 'Category 1',
    subcategoriesCollection: {
      items: [
        {
          id: 'sub_1',
          title: 'Sub 1',
          level: 1,
          linkedFrom: {
            pageCollection: {
              items: [{ slug: 'sub1-slug' }]
            }
          }
        },
        {
          id: 'sub_2',
          title: 'Sub 2',
          level: 1,
          linkedFrom: {
            pageCollection: {
              items: [{ slug: 'sub2-slug' }]
            }
          }
        }
      ]
    },
    image: {
      __typename: 'Asset',
      title: 'Image 1',
      description: 'This is a image description',
      url: '/image-cat1',
      contentType: 'image type'
    },
    color: {
      __typename: 'Color',
      ref: 'test-color'
    },
    categoryPageSlug: {
      pageCollection: {
        items: [
          {
            slug: 'linked-from'
          }
        ]
      }
    }
  }
} as const

describe(normalizeCategoryCop, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeCategoryCop(
        restMock as ContentfulCategoryCop
      )
      expect(normalizedData).toEqual({
        title: 'Category Overview test',
        category: { title: 'test title for linked category' }
      })
    })

    it('does not error if passed undefined', () => {
      const normalizedData = normalizeCategoryCop(undefined)
      expect(normalizedData).toEqual(undefined)
    })

    it('does not error if passed empty object', () => {
      const normalizedData = normalizeCategoryCop({} as ContentfulCategoryCop)
      expect(normalizedData).toEqual({
        title: undefined,
        category: undefined
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeCategoryCop(graphQLMock)
      expect(normalizedData).toEqual({
        title: 'Category Cop',
        category: {
          id: 'category_1',
          title: 'Category 1',
          subcategories: [
            {
              id: 'sub_1',
              title: 'Sub 1',
              url: '/sub1-slug'
            },
            {
              id: 'sub_2',
              title: 'Sub 2',
              url: '/sub2-slug'
            }
          ],
          image: {
            description: 'This is a image description',
            title: 'Image 1',
            type: 'image type',
            url: '/image-cat1'
          }
        },
        color: 'test-color',
        categoryPageSlug: 'linked-from'
      })
    })
  })
})
