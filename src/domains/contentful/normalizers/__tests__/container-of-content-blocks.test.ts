import { normalizeContainerOfContentBlocks } from '../container-of-content-blocks'

const graphQLMock = {
  __typename: 'ContainerOfContentBlocks',
  title: 'Home page marketing teasers',
  showTitle: true,
  contentCollection: {
    items: [
      {
        __typename: 'MarketingTeaser',
        title: 'Boost your immunity PT',
        teaserDescription: 'High quality vitamins for a low price. PT',
        text: '20 % Discount PT',
        color: {
          __typename: 'Color',
          ref: 'secondary-portland-orange'
        },
        image: null,
        bgColor: {
          __typename: 'Color',
          ref: 'category-beauty'
        },
        button: true,
        slug: 'boost-your-immunity-pt'
      },
      {
        __typename: 'MarketingTeaser',
        title: 'Save over 50% with Atida Plus PT',
        description: null,
        text: 'Exclusive offer PT',
        color: {
          __typename: 'Color',
          ref: 'primary-oxford-blue'
        },
        image: {
          __typename: 'Asset',
          url:
            'https://images.ctfassets.net/7g2w796onies/6EOfodeKNE2uKYxJTrpbrA/2b730c8a3d7b66e27a4a78863c7a5156/ac6bb2e17841f7dd4ebd7b1fd77f0185.png'
        },
        bgColor: {
          __typename: 'Color',
          ref: 'category-nutrition-exercise-and-weight-loss'
        },
        button: false,
        slug: 'save-over-50-with-atida-plus'
      }
    ]
  }
} as const

const promotionGraphQLMock = {
  __typename: 'ContainerOfContentBlocks',
  title: 'Home page Promotion Blocks',
  showTitle: false,
  contentCollection: {
    items: [
      {
        __typename: 'Promotion',
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
        teaserDescription: 'oh, shit...Monday came in',
        isContentWithImage: false,
        labelsCollection: {
          items: [
            {
              __typename: 'Translation',
              key: 'campaign-promo.black-friday.promo.2021',
              value: 'Whoop whoop'
            },
            {
              __typename: 'Translation',
              key: 'campaign-promo.black-friday',
              value: 'Whoop whoop 2'
            }
          ]
        },
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
        }
      },
      {
        __typename: 'Promotion',
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
        }
      }
    ]
  }
} as const

const nullGraphQLMock = {
  __typename: 'ContainerOfContentBlocks',
  title: 'Home page Promotion Blocks',
  contentCollection: {
    items: [null, null]
  }
} as const

describe(normalizeContainerOfContentBlocks, () => {
  describe('GraphQL MarketingTeaser blocks', () => {
    it('pulls out the container of content blocks Marketing Teasers', () => {
      expect(normalizeContainerOfContentBlocks(graphQLMock)).toMatchSnapshot()
    })
  })

  describe('GraphQL Promotion blocks', () => {
    it('pulls out the container of content blocks Promotions', () => {
      expect(
        normalizeContainerOfContentBlocks(promotionGraphQLMock)
      ).toMatchSnapshot()
    })
  })
  describe('GraphQL null blocks', () => {
    it('does not error', () => {
      expect(
        normalizeContainerOfContentBlocks(nullGraphQLMock)
      ).toMatchSnapshot()
    })
  })
})
