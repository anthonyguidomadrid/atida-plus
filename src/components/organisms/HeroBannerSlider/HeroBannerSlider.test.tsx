import { screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { CmsContentTypes } from '~config/content-types'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { HeroBannerSlider, HeroBannerSliderProps } from '../HeroBannerSlider'

describe(HeroBannerSlider, () => {
  const defaultProps = {
    contentType: CmsContentTypes.SLIDER,
    title: 'Hero Banner Slider Test',
    contentBlocks: Array(3).fill({
      contentType: CmsContentTypes.HERO_BANNER,
      image: {
        title: 'Some relevant image',
        alt: 'Some relevant image',
        url: 'https://picsum.photos/1000/200'
      },
      title: '<p>Your personal</p><p>online pharmacy</p>',
      text: 'Atida private label',
      searchPlaceholder: 'What are you looking for?',
      link: {
        label: 'about us',
        url: '/about-us'
      }
    })
  } as const

  const setup = (
    props: Partial<HeroBannerSliderProps> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <HeroBannerSlider {...defaultProps} {...props} />
    )
    reset()
    return renderedComponent
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })

  describe('slides/hero banners', () => {
    it('renders all slides', () => {
      setup()
      expect(screen.getAllByTestId('heroBanner')).toHaveLength(3)
    })
  })
})
