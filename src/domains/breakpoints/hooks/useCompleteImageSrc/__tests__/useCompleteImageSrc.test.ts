import { renderHook } from '@testing-library/react-hooks'
import {
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH
} from '~config/constants/images'
import { useCompleteImageSrc } from '../useCompleteImageSrc'

describe(useCompleteImageSrc, () => {
  it('returns the correct image sources for Contentful images', () => {
    const { result } = renderHook(() =>
      useCompleteImageSrc(
        'https://source.unsplash.com/random/448x228',
        'contentful',
        DEFAULT_IMAGE_WIDTH
      )
    )
    expect(result.current).toStrictEqual({
      sizes:
        '(max-width: 375px) 600px, (max-width: 768px) 800px, (max-width: 1024px) 1200px, (max-width: 1440px) 1440px, 600px',
      srcSet: {
        avif:
          'https://source.unsplash.com/random/448x228?w=600&fm=avif&q=100 600w,https://source.unsplash.com/random/448x228?w=800&fm=avif&q=100 800w,https://source.unsplash.com/random/448x228?w=1200&fm=avif&q=100 1200w,https://source.unsplash.com/random/448x228?w=1440&fm=avif&q=100 1440w',
        jpg:
          'https://source.unsplash.com/random/448x228?w=600&fm=jpg&q=100 600w,https://source.unsplash.com/random/448x228?w=800&fm=jpg&q=100 800w,https://source.unsplash.com/random/448x228?w=1200&fm=jpg&q=100 1200w,https://source.unsplash.com/random/448x228?w=1440&fm=jpg&q=100 1440w',
        webp:
          'https://source.unsplash.com/random/448x228?w=600&fm=webp&q=100 600w,https://source.unsplash.com/random/448x228?w=800&fm=webp&q=100 800w,https://source.unsplash.com/random/448x228?w=1200&fm=webp&q=100 1200w,https://source.unsplash.com/random/448x228?w=1440&fm=webp&q=100 1440w'
      }
    })
  })
  it('returns the correct image sources for Bynder images', () => {
    const { result } = renderHook(() =>
      useCompleteImageSrc(
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png',
        'bynder',
        DEFAULT_IMAGE_WIDTH,
        DEFAULT_IMAGE_HEIGHT
      )
    )
    expect(result.current).toStrictEqual({
      sizes:
        '(max-width: 375px) 600px, (max-width: 768px) 800px, (max-width: 1024px) 1200px, (max-width: 1440px) 1440px, (max-width: 562.5px) 900px, (max-width: 1152px) 1200px, (max-width: 1536px) 1800px, (max-width: 2160px) 2160px, 600px',
      srcSet: {
        avif:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:600,height:250 600w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:800,height:450 800w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:1200,height:500 1200w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:1440,height:500 1440w, https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:900,height:375 900w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:1200,height:675 1200w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:1800,height:750 1800w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:2160,height:750 2160w',
        jpg:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:600,height:250 600w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:800,height:450 800w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:1200,height:500 1200w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:1440,height:500 1440w, https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:900,height:375 900w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:1200,height:675 1200w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:1800,height:750 1800w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:2160,height:750 2160w',
        webp:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:600,height:250 600w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:800,height:450 800w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:1200,height:500 1200w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:1440,height:500 1440w, https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:900,height:375 900w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:1200,height:675 1200w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:1800,height:750 1800w,https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:2160,height:750 2160w'
      }
    })
  })
  it('returns the correct sources for Contentful images when a defined width and height are passed', () => {
    const { result } = renderHook(() =>
      useCompleteImageSrc(
        'https://source.unsplash.com/random/448x228',
        'contentful',
        DEFAULT_IMAGE_WIDTH,
        DEFAULT_IMAGE_HEIGHT
      )
    )
    expect(result.current).toStrictEqual({
      sizes:
        '(max-width: 375px) 600px, (max-width: 768px) 800px, (max-width: 1024px) 1200px, (max-width: 1440px) 1440px, 600px',
      srcSet: {
        avif:
          'https://source.unsplash.com/random/448x228?w=600&fm=avif&q=100 600w,https://source.unsplash.com/random/448x228?w=800&fm=avif&q=100 800w,https://source.unsplash.com/random/448x228?w=1200&fm=avif&q=100 1200w,https://source.unsplash.com/random/448x228?w=1440&fm=avif&q=100 1440w',
        jpg:
          'https://source.unsplash.com/random/448x228?w=600&fm=jpg&q=100 600w,https://source.unsplash.com/random/448x228?w=800&fm=jpg&q=100 800w,https://source.unsplash.com/random/448x228?w=1200&fm=jpg&q=100 1200w,https://source.unsplash.com/random/448x228?w=1440&fm=jpg&q=100 1440w',
        webp:
          'https://source.unsplash.com/random/448x228?w=600&fm=webp&q=100 600w,https://source.unsplash.com/random/448x228?w=800&fm=webp&q=100 800w,https://source.unsplash.com/random/448x228?w=1200&fm=webp&q=100 1200w,https://source.unsplash.com/random/448x228?w=1440&fm=webp&q=100 1440w'
      }
    })
  })
  it('returns the correct sources for Bynder images when a defined width and height are passed', () => {
    const { result } = renderHook(() =>
      useCompleteImageSrc(
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png',
        'bynder',
        { xs: 200 },
        { xs: 200 }
      )
    )
    expect(result.current).toStrictEqual({
      sizes: '(max-width: 375px) 200px, (max-width: 562.5px) 300px, 200px',
      srcSet: {
        avif:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:200,height:200 200w, https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=avif&quality=100&io=transform:extend,width:300,height:300 300w',
        jpg:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:200,height:200 200w, https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=jpg&io=transform:extend,width:300,height:300 300w',
        webp:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:200,height:200 200w, https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/693672AD-8D40-4A0B-BE139B4A51D8205C/3010F0E2-BAEB-4432-B48D11350E9C801F/Product%20Tile%20Thumbnail-EAN_IMG_0810907028898_1.png?format=webp&quality=100&io=transform:extend,width:300,height:300 300w'
      }
    })
  })
})
