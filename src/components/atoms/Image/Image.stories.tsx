import { Image, ImageProps } from '.'

export default {
  component: Image,
  title: 'atoms/Image',
  parameters: { layout: 'fullscreen' },
  args: {
    alt: 'Black Friday Campaign',
    src: 'https://source.unsplash.com/random/448x228?sig=0'
  }
}

export const withContentFromDesign = (args: ImageProps): JSX.Element => (
  <Image {...args} />
)
