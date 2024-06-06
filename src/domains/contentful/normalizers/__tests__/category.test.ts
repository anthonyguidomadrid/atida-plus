import { ContentfulCategory, normalizeCategory } from '../category'

const restMock = {
  sys: {
    contentType: {
      sys: { type: 'Link', linkType: 'ContentType', id: 'category' }
    }
  },
  fields: {
    title: 'Digestion',
    id: 'Medicines > Digestion',
    level: 1,
    color: {
      sys: {
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'color' }
        }
      },
      fields: { ref: 'category-beauty' }
    },
    image: {
      sys: {
        type: 'Asset'
      },
      fields: {
        title: 'Beauty Category Image',
        file: {
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png',
          details: { size: 249696, image: { width: 845, height: 336 } },
          fileName: 'category-header-sample.png',
          contentType: 'image/png'
        }
      }
    }
  }
} as ContentfulCategory

const graphQLMock = {
  __typename: 'Category',
  title: 'Digestion',
  id: 'Medicines > Digestion',
  color: {
    __typename: 'Color',
    ref: 'category-beauty'
  },
  image: {
    __typename: 'Asset',
    title: 'Beauty Category Image',
    url:
      '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png',
    contentType: 'image/png'
  },
  level: 1,
  subcategories: {
    items: []
  },
  linkedFrom: {
    categoryCollection: {
      items: [
        {
          id: 'diet_exercise_weight_loss',
          linkedFrom: { categoryCollection: { items: [] } }
        }
      ]
    }
  }
} as const

const graphQLMockWithSubcategories = {
  ...graphQLMock,
  subcategories: {
    items: [
      {
        id: 'medicines_digestion',
        title: 'Digestion',
        level: 2,
        linkedFrom: {
          pageCollection: { items: [{ slug: 'medicines/digestion' }] }
        }
      },
      {
        id: 'medicines_allergy',
        title: 'Allergy',
        level: 2,
        linkedFrom: {
          pageCollection: { items: [{ slug: 'medicines/allergy' }] }
        }
      },
      {
        id: 'medicines_diabetes',
        title: 'Diabetes',
        level: 2,
        linkedFrom: {
          pageCollection: { items: [{ slug: 'medicines/diabetes' }] }
        }
      }
    ]
  }
} as const

const partialRestMock = {
  sys: {
    contentType: {
      sys: { type: 'Link', linkType: 'ContentType', id: 'category' }
    }
  },
  fields: {
    title: 'Digestion',
    id: 'Medicines > Digestion'
  }
} as ContentfulCategory

const partialGraphQLMock = {
  __typename: 'Category',
  title: 'Medicines',
  id: 'Medicines > Digestion'
} as const

describe(normalizeCategory, () => {
  describe('REST', () => {
    it('pulls out the category data', () => {
      expect(normalizeCategory(restMock)).toEqual({
        color: 'category-beauty',
        id: 'Medicines > Digestion',
        level: 1,
        image: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        }
      })
    })

    it('can return partial category data', () => {
      expect(normalizeCategory(partialRestMock)).toEqual({
        id: 'Medicines > Digestion'
      })
    })

    it('returns undefined when nothing is passed', () => {
      expect(normalizeCategory(undefined)).toEqual(undefined)
    })
  })

  describe('GraphQL', () => {
    it('pulls out the category data', () => {
      expect(normalizeCategory(graphQLMock)).toEqual({
        color: 'category-beauty',
        id: 'Medicines > Digestion',
        title: 'Digestion',
        image: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        },
        level: 1,
        path: {
          id0: 'diet_exercise_weight_loss',
          id1: 'Medicines > Digestion',
          title1: 'Digestion'
        },
        subcategories: []
      })
    })

    it('can return partial category data', () => {
      expect(normalizeCategory(partialGraphQLMock)).toEqual({
        id: 'Medicines > Digestion',
        title: 'Medicines',
        path: {
          id0: 'Medicines > Digestion',
          title0: 'Medicines'
        }
      })
    })

    describe('when category has subcategories', () => {
      it('includes them in the normalized response', () => {
        expect(normalizeCategory(graphQLMockWithSubcategories)).toHaveProperty(
          'subcategories',
          [
            {
              id: 'medicines_digestion',
              title: 'Digestion',
              url: '/medicines/digestion',
              level: 2
            },
            {
              id: 'medicines_allergy',
              title: 'Allergy',
              url: '/medicines/allergy',
              level: 2
            },
            {
              id: 'medicines_diabetes',
              title: 'Diabetes',
              url: '/medicines/diabetes',
              level: 2
            }
          ]
        )
      })
    })
  })
})
