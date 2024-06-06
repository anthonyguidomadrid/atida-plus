import { CampaignHeroBannerFragment } from '~generated-graphql'
import { normalizeCampaignHeroBanner } from '../campaign-hero-banner'

const graphQLMock: CampaignHeroBannerFragment = {
  __typename: 'CampaignHeroBanner',
  title: 'Black Friday Campaign - PT',
  altTitle: 'Up to 35% discounts - PT',
  description: {
    __typename: 'CampaignHeroBannerDescription',
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'Everything you ',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [
                {
                  type: 'bold'
                }
              ],
              value: 'need',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [],
              value: ' to know about this campaign, in Portuguese.',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  finishingDate: '2021-10-09T10:00:00.000+02:00',
  backgroundColor: {
    __typename: 'Color',
    ref: 'category-beauty'
  },
  image: {
    __typename: 'Asset',
    title: 'big4899.jpg',
    url:
      'https://images.ctfassets.net/7g2w796onies/6RrFjb88Y5yl8nNHtzrGva/ba8c675e52b7d5f180ec5a7cb902697a/big4899.jpg'
  },
  campaignUrl: 'examplecampaign'
}

describe(normalizeCampaignHeroBanner, () => {
  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeCampaignHeroBanner(graphQLMock)
      expect(normalizedData?.contentType).toBe('CampaignHeroBanner')
      expect(normalizedData?.title).toBe('Black Friday Campaign - PT')
      expect(normalizedData?.altTitle).toBe('Up to 35% discounts - PT')
      expect(normalizedData?.description).toBe(
        '<p>Everything you <b>need</b> to know about this campaign, in Portuguese.</p>'
      )
      expect(normalizedData?.finishingDate).toBe(
        '2021-10-09T10:00:00.000+02:00'
      )
      expect(normalizedData?.image).toEqual({
        title: 'big4899.jpg',
        url:
          'https://images.ctfassets.net/7g2w796onies/6RrFjb88Y5yl8nNHtzrGva/ba8c675e52b7d5f180ec5a7cb902697a/big4899.jpg'
      })
      expect(normalizedData?.url).toBe('/examplecampaign')
    })
  })
})
