import { HeroBanner } from '.'
import { HeroBannerProps } from './HeroBanner'

export default {
  component: HeroBanner,
  title: 'organisms/HeroBanner',
  parameters: { layout: 'fullscreen' },
  args: {
    contentType: 'heroBanner',
    image: {
      alt: 'Hero image',
      title: 'Hero Image',
      url:
        '//images.ctfassets.net/7g2w796onies/15Vp4EwS0FtPyW6T1F3I2q/42d999e88586f87d7d1a94ca736475a4/Atida_Private_label_wide_STV_1__1_.png'
    },
    link: {
      content: '',
      label: 'view more',
      url: '/view-more'
    },
    searchPlaceholder: 'What are you looking for?',
    text: '<p>Atida private label</p>',
    title: '<p>Your personal</p><p>online pharmacy</p>'
  }
}

export const withContentFromDesign = (args: HeroBannerProps): JSX.Element => (
  <HeroBanner {...args} />
)
