import { CampaignHeroBanner, CampaignHeroBannerProps } from '.'

export default {
  component: CampaignHeroBanner,
  title: 'molecules/CampaignHeroBanner',
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Black Friday Campaign',
    description: 'Everything you need to know about this campaign.',
    altTitle: 'Up to 35% discounts',
    finishingDate: '2021-10-09T00:00:00.000+02:00',
    image: {
      title: 'A sample image',
      url: 'https://source.unsplash.com/random/448x228?sig=0'
    },
    url: '/examplecampaign'
  }
}

export const withContentFromDesign = (
  args: CampaignHeroBannerProps
): JSX.Element => <CampaignHeroBanner {...args} />
