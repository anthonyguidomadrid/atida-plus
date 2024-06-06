import { act, screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { Slider } from '../Slider'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'

describe(Slider, () => {
  const setup = (
    props: Partial<{ className?: string; withNumericBullets?: boolean }> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <Slider {...props}>
        <div
          data-testid="slider-slide-1"
          className="flex w-full h-26 justify-center items-center bg-primary-caribbean-green"
        >
          Slide 1
        </div>
        <div
          data-testid="slider-slide-2"
          className="flex w-full h-26 justify-center items-center bg-secondary-champagne-pink"
        >
          Slide 2
        </div>
        <div
          data-testid="slider-slide-3"
          className="flex w-full h-26 justify-center items-center bg-secondary-portland-orange"
        >
          Slide 3
        </div>
      </Slider>
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

  it('renders left arrow button', () => {
    setup()
    expect(
      screen.getByTestId('slider-navigation-left-arrow')
    ).toBeInTheDocument()
  })

  it('renders right arrow button', () => {
    setup()
    expect(
      screen.getByTestId('slider-navigation-right-arrow')
    ).toBeInTheDocument()
  })

  it('renders slides', () => {
    setup()
    expect(screen.getByTestId('slider-slide-1')).toBeInTheDocument()
    expect(screen.getByTestId('slider-slide-2')).toBeInTheDocument()
    expect(screen.getByTestId('slider-slide-3')).toBeInTheDocument()
  })

  it('renders swiper with correct wrapper class', () => {
    setup({ withNumericBullets: true })
    expect(screen.getByTestId('swiperSlidesWrapper')).toHaveClass(
      'swiper-slides-wrapper'
    )
  })

  describe('renders pagination buttons', () => {
    it('renders pagination button with correct active and after active classes', () => {
      setup()
      expect(screen.getByTestId('slider_pagination_1')).toBeInTheDocument()
      const paginationButton = screen.getByTestId('slider_pagination_1')
      expect(screen.getByTestId('slider_pagination_2')).toBeInTheDocument()
      const paginationButtonAfterActive = screen.getByTestId(
        'slider_pagination_2'
      )
      act(() => {
        paginationButton.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        )
      })

      expect(paginationButton).toHaveClass('bg-color--animated')
      expect(paginationButtonAfterActive).toHaveClass('after-active')
    })
  })
})
