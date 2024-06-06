import { normalizeMarketingTeaser } from '../marketing-teaser'

const graphQLMock = {
  __typename: 'MarketingTeaser',
  title: 'Save over 50% with Atida Plus PT',
  description: null,
  text: 'Exclusive offer PT',
  color: { __typename: 'Color', ref: 'primary-oxford-blue' },
  fullWidth: false,
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
} as const

describe(normalizeMarketingTeaser, () => {
  describe('GraphQL', () => {
    it('pulls out the marketing teaser data', () => {
      expect(normalizeMarketingTeaser(graphQLMock)).toEqual({
        title: 'Save over 50% with Atida Plus PT',
        labelText: 'Exclusive offer PT',
        labelColor: 'primary-oxford-blue',
        isSponsoredContent: false,
        isFullWidthImage: false,
        image: {
          url:
            'https://images.ctfassets.net/7g2w796onies/6EOfodeKNE2uKYxJTrpbrA/2b730c8a3d7b66e27a4a78863c7a5156/ac6bb2e17841f7dd4ebd7b1fd77f0185.png'
        },
        backgroundColor: 'category-nutrition-exercise-and-weight-loss',
        hasButton: false,
        url: '/save-over-50-with-atida-plus',
        contentType: 'MarketingTeaser'
      })
    })
  })
})
