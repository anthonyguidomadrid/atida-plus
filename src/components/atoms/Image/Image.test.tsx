import { screen } from '@testing-library/react'
import { Image, ImageProps } from '.'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'

describe('Image', () => {
  const imagePropsMock = {
    alt: 'Black Friday Campaign',
    src: 'https://source.unsplash.com/random/448x228?sig=0',
    'data-testid': 'testImageComponent'
  }

  const setup = (
    props: Partial<ImageProps> = {},
    isLargeFormat = false,
    isAlternativeFormatsEnabled = true,
    isAVIFFormatEnabled = true,
    AVIFCompressionRate = 50,
    WEBPCompressionRate = 80,
    JPEGCompressionRate = 70,
    isDecodingAsyncEnabled = false,
    isFetchPriorityEnabled = false,
    isNextImageComponentEnabled = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <Image {...imagePropsMock} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.IMAGE_ALLOW_ALTERNATIVE_FORMATS]: isAlternativeFormatsEnabled,
          [FeatureFlag.IMAGE_ALLOW_AVIF_FORMAT]: isAVIFFormatEnabled,
          [FeatureFlag.IMAGE_ALLOW_AVIF_COMPRESSION]: AVIFCompressionRate,
          [FeatureFlag.IMAGE_ALLOW_WEBP_COMPRESSION]: WEBPCompressionRate,
          [FeatureFlag.IMAGE_ALLOW_JPEG_COMPRESSION]: JPEGCompressionRate,
          [FeatureFlag.IMAGE_ALLOW_DECODING_ASYNC]: isDecodingAsyncEnabled,
          [FeatureFlag.FETCH_PRIORITY]: isFetchPriorityEnabled,
          [FeatureFlag.IMAGE_USE_NEXT_IMAGE_COMPONENT]: isNextImageComponentEnabled
        }
      }
    )
    reset()
    return renderedComponent
  }

  describe('image component', () => {
    it('renders the image', () => {
      setup()
      expect(screen.getByTestId('testImageComponent')).toBeInTheDocument()
    })

    it('has applied the passed classNames', () => {
      setup({ className: 'object-cover object-right-center w-full h-full' })
      expect(screen.getByTestId('testImageComponent')).toHaveClass(
        'object-cover'
      )
      expect(screen.getByTestId('testImageComponent')).toHaveClass(
        'object-right-center'
      )
      expect(screen.getByTestId('testImageComponent')).toHaveClass('w-full')
      expect(screen.getByTestId('testImageComponent')).toHaveClass('h-full')
    })

    it("when no 'loading' prop is passed", () => {
      setup()
      expect(screen.getByTestId('testImageComponent')).not.toHaveAttribute(
        'loading="lazy"'
      )
    })

    it('image is eager loaded when the prop is passed', () => {
      setup({ loading: 'eager' })
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'loading',
        'eager'
      )
    })

    it('image decoding is auto by default', () => {
      setup()
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'decoding',
        'auto'
      )
    })
    it('image decoding is auto for eager images', () => {
      setup({ loading: 'eager' }, false, true, true, 50, 80, 70, true)
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'decoding',
        'auto'
      )
    })

    it('image decoding is async for lazy images', () => {
      setup({ loading: 'lazy' }, false, true, true, 50, 80, 70, true, true)
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'decoding',
        'async'
      )
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'fetchpriority',
        'low'
      )
    })

    it('image includes sizes and srcset properties', () => {
      setup({ width: { xs: 100 } })
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'sizes',
        '100px'
      )

      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'srcset',
        'https://source.unsplash.com/random/448x228?sig=0?w=100&fm=jpg&q=70'
      )
    })

    it('image has default fetchpriority set', () => {
      setup()
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'fetchpriority',
        'auto'
      )
    })

    it('image sets fetchpriority property', () => {
      setup({ preload: true }, false, true, true, 50, 80, 70, true, true)
      expect(screen.getByTestId('testImageComponent')).toHaveAttribute(
        'fetchpriority',
        'high'
      )
    })

    it('uses the Next image component when the FF is on', () => {
      setup({}, false, true, true, 50, 80, 70, true, true, true)
      expect(screen.getByTestId('nextImg')).toBeInTheDocument()
    })
  })
})
