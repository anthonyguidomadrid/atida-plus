import type { DeepPartial } from '@reduxjs/toolkit'
import { CategoryGridFragment } from '~generated-graphql'
import { ContentfulCategoryGrid, normalizeCategoryGrid } from '../category-grid'

const restMock: DeepPartial<ContentfulCategoryGrid> = {
  sys: {
    contentType: {
      sys: { id: 'categoryGrid' }
    }
  },
  fields: {
    title: 'Shop by category',
    items: [
      {
        fields: {
          title: 'Cosmetics & Beauty',
          color: 'bg-category-beauty',
          imageAsset: {
            fields: {
              title: 'Cosmetics & Beauty',
              description: 'Cosmetics & Beauty',
              file: {
                url:
                  '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
              }
            }
          },
          url: 'https://google.de'
        }
      },
      {
        fields: {
          title: 'Personal care',
          color: 'bg-category-personal-care',
          imageAsset: {
            fields: {
              title: 'Personal care',
              description: 'Personal care',
              file: {
                url:
                  '//images.ctfassets.net/7g2w796onies/6lL3GTSipzBGf3K67argHx/d929e7d3cc7163336e68524a1ac8fa8f/Personal_care.png'
              }
            }
          },
          url: '/'
        }
      },
      {
        fields: {
          title: 'Promotions',
          color: 'bg-secondary-portland-orange',
          url: '/'
        }
      }
    ],
    viewType: null
  }
}

const restMockPartial = {
  sys: {
    contentType: {
      sys: { id: 'categoryGrid' }
    }
  },
  fields: {
    title: 'Shop by category',
    items: [
      {
        fields: {
          title: 'Cosmetics & Beauty',
          color: 'bg-category-beauty',
          imageAsset: {
            fields: {
              title: 'Cosmetics & Beauty',
              description: 'Cosmetics & Beauty',
              file: {
                url:
                  '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
              }
            }
          },
          url: 'https://google.de'
        }
      }
    ],
    viewType: null
  }
}

const graphQLMock: CategoryGridFragment = {
  __typename: 'CategoryGrid',
  title: 'Shop by category',
  itemsCollection: {
    items: [
      {
        __typename: 'CategoryTile',
        title: 'Cosmetics & Beauty',
        color: 'bg-category-beauty',
        url: 'https://google.de',
        imageAsset: {
          __typename: 'Asset',
          title: 'Cosmetics & Beauty',
          description: 'Cosmetics & Beauty',
          url:
            '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
        }
      },
      {
        __typename: 'CategoryTile',
        title: 'Personal care',
        color: 'bg-category-personal-care',
        url: '/',
        imageAsset: {
          __typename: 'Asset',
          title: 'Personal care',
          description: 'Personal care',
          url:
            '//images.ctfassets.net/7g2w796onies/6lL3GTSipzBGf3K67argHx/d929e7d3cc7163336e68524a1ac8fa8f/Personal_care.png'
        }
      },
      {
        __typename: 'CategoryTile',
        title: 'Promotions',
        color: 'bg-secondary-portland-orange',
        url: '/'
      }
    ]
  },
  viewType: null
} as const

const graphQLMockPartial = {
  __typename: 'CategoryGrid',
  title: 'Shop by category',
  itemsCollection: {
    items: [
      {
        __typename: 'CategoryTile',
        title: 'Cosmetics & Beauty',
        color: 'bg-category-beauty',
        url: 'https://google.de',
        imageAsset: {
          __typename: 'Asset',
          title: 'Cosmetics & Beauty',
          description: 'Cosmetics & Beauty',
          url:
            '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
        }
      }
    ]
  },
  viewType: null
} as const

const expected = {
  contentType: 'CategoryGrid',
  title: 'Shop by category',
  items: [
    {
      title: 'Cosmetics & Beauty',
      color: 'bg-category-beauty',
      image: {
        title: 'Cosmetics & Beauty',
        alt: 'Cosmetics & Beauty',
        url:
          '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
      },
      url: 'https://google.de'
    },
    {
      title: 'Personal care',
      color: 'bg-category-personal-care',
      image: {
        title: 'Personal care',
        alt: 'Personal care',
        url:
          '//images.ctfassets.net/7g2w796onies/6lL3GTSipzBGf3K67argHx/d929e7d3cc7163336e68524a1ac8fa8f/Personal_care.png'
      },
      url: '/'
    },
    {
      title: 'Promotions',
      color: 'bg-secondary-portland-orange',
      url: '/'
    }
  ],
  viewType: 'Slider'
}

const expectedPartial = {
  contentType: 'CategoryGrid',
  title: 'Shop by category',
  items: [
    {
      title: 'Cosmetics & Beauty',
      color: 'bg-category-beauty',
      image: {
        title: 'Cosmetics & Beauty',
        alt: 'Cosmetics & Beauty',
        url:
          '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
      },
      url: 'https://google.de'
    }
  ],
  viewType: 'Slider'
}

describe(normalizeCategoryGrid, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeCategoryGrid(
        restMock as ContentfulCategoryGrid
      )
      expect(normalizedData).toEqual(expected)
    })

    it('normalizes incomplete data', () => {
      const normalizedData = normalizeCategoryGrid(
        restMockPartial as ContentfulCategoryGrid
      )
      expect(normalizedData).toEqual(expectedPartial)
    })

    it('does not error if passed undefined', () => {
      const normalizedData = normalizeCategoryGrid(undefined)
      expect(normalizedData).toEqual({
        contentType: 'CategoryGrid',
        title: '',
        viewType: 'Slider'
      })
    })

    it('does not error if passed empty object', () => {
      const normalizedData = normalizeCategoryGrid({} as ContentfulCategoryGrid)
      expect(normalizedData).toEqual({
        contentType: 'CategoryGrid',
        title: '',
        viewType: 'Slider'
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeCategoryGrid(graphQLMock)
      expect(normalizedData).toEqual(expected)
    })

    it('normalizes incomplete data', () => {
      const normalizedData = normalizeCategoryGrid(graphQLMockPartial)
      expect(normalizedData).toEqual(expectedPartial)
    })
  })
})
