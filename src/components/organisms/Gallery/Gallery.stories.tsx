import { Gallery } from '.'
import { GalleryProps } from './Gallery'
import { images, videos } from './Gallery.mock'

export default {
  component: Gallery,
  title: 'organisms/Gallery',
  parameters: { layout: 'fullscreen' },
  args: {
    productName: 'Product name',
    images,
    videos
  }
}

export const withContentFromDesign = (args: GalleryProps): JSX.Element => (
  <Gallery {...args} />
)
