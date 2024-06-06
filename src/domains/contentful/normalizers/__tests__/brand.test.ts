import { ContentfulBrand, normalizeBrand, normalizeBrandPage } from '../brand'

const restMock = ({
  sys: {
    contentType: {
      sys: { type: 'Link', linkType: 'ContentType', id: 'brand' }
    }
  },
  fields: {
    title: 'some title',
    id: 'some-id',
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
    },
    logoImage: {
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
} as unknown) as ContentfulBrand

const graphQLMock = {
  __typename: 'Brand',
  title: 'Avène',
  id: 'Avene has an e with french accent',
  image: {
    __typename: 'Asset',
    title: 'Beauty Category Image',
    url:
      '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png',
    contentType: 'image/png'
  },
  logoImage: {
    __typename: 'Asset',
    title: 'Beauty Category Image',
    url:
      '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png',
    contentType: 'image/png'
  }
} as const
const url = 'some-url'
describe(normalizeBrand, () => {
  describe('REST', () => {
    it('pulls out the brand data', () => {
      expect(normalizeBrand(restMock)).toEqual({
        title: 'some title',
        id: 'some-id'
      })
    })
  })
  describe('GraphQL', () => {
    it('pulls out the brand data', () => {
      expect(normalizeBrand(graphQLMock)).toEqual({
        title: 'Avène',
        id: 'Avene has an e with french accent',
        image: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        },
        logoImage: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        }
      })
    })
  })
  describe('GraphQL for a BrandPage', () => {
    it('pulls out the brand data including the url', () => {
      expect(normalizeBrandPage(graphQLMock, url)).toEqual({
        title: 'Avène',
        id: 'Avene has an e with french accent',
        image: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        },
        logoImage: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        },
        url: '/some-url'
      })
    })
  })
})
