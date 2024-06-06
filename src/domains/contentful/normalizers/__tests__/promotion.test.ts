import { ContentfulPromotion, normalizePromotion } from '../promotion'

const restMock = ({
  sys: {
    contentType: {
      sys: {
        type: 'Link',
        linkType: 'ContentType',
        id: 'promotion'
      }
    }
  },
  fields: {
    title: 'some title',
    id: 'some-id',
    description: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'Its Fridaaaay, again',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    },
    teaserDescription: 'oh, shit...Monday came in',
    color: {
      sys: {
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'color' }
        }
      },
      fields: {
        ref: 'category-beauty'
      }
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
} as unknown) as ContentfulPromotion

const graphQLMock = {
  __typename: 'Promotion',
  sys: { firstPublishedAt: '2021-06-09T12:28:23.692Z' },
  title: 'Avène',
  id: 'Avene has an e with french accent',
  description: {
    __typename: 'PromotionDescription',
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value:
                "We're here to help. Ask about our products or get expert medical advice.",
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  promoInformation: {
    __typename: 'PromotionPromoInformation',
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'Explain this to me',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  teaserDescription: 'oh, shit...Monday came in',
  isContentWithImage: false,
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
  labelsCollection: {
    items: [
      {
        __typename: 'Translation',
        key: 'campaign-promo.black-friday.promo.2021',
        value: 'Whoop whoop'
      },
      {
        __typename: 'Translation',
        key: 'promo.black-friday',
        value: 'Whoop whoop 2'
      }
    ]
  }
} as const
describe(normalizePromotion, () => {
  describe('REST', () => {
    it('pulls out the category data', () => {
      expect(normalizePromotion(restMock)).toEqual({
        contentType: 'Promotion',
        title: 'some title',
        id: 'some-id',
        description: '<p>Its Fridaaaay, again</p>',
        teaserDescription: 'oh, shit...Monday came in',
        color: 'category-beauty',
        image: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        }
      })
    })
  })
  describe('GraphQL', () => {
    it('pulls out the promotion data', () => {
      expect(normalizePromotion(graphQLMock)).toEqual({
        createdAt: '2021-06-09T12:28:23.692Z',
        contentType: 'Promotion',
        title: 'Avène',
        id: 'Avene has an e with french accent',
        description:
          '<p>We&#39;re here to help. Ask about our products or get expert medical advice.</p>',
        promoInformation: '<p>Explain this to me</p>',
        teaserDescription: 'oh, shit...Monday came in',
        isSponsoredContent: false,
        isContentWithImage: false,
        labels: [
          {
            type: 'campaign-promo',
            label: 'campaign-promo.black-friday.promo.2021'
          },
          { type: 'promotion', label: 'Whoop whoop 2' }
        ],
        color: 'category-beauty',
        image: {
          title: 'Beauty Category Image',
          type: 'image/png',
          url:
            '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
        },
        url: '',
        categories: []
      })
    })
  })
})
