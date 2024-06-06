import { ContentWithImage } from '.'
import { ContentWithImageProps } from './ContentWithImage'

export default {
  component: ContentWithImage,
  title: 'molecules/ContentWithImage',
  args: {
    backgroundColor: 'secondary-dark-sky-blue',
    textColor: 'primary-white',
    image: {
      alt: 'Some relevant image',
      url: 'https://picsum.photos/1000/200'
    },
    title: 'Any questions?',
    content:
      "<p>We're here to help. Ask about our products or get expert medical advice.</p>",
    cta: {
      label: 'Chat with an expert',
      url: '#',
      icon: 'NavAdvice24'
    },
    textLink: {
      url: '#',
      label: 'Read our FAQ'
    }
  }
}

export const basic = (args: ContentWithImageProps): JSX.Element => (
  <ContentWithImage {...args} />
)
