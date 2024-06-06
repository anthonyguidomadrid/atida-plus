import { screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { CmsContentTypes } from '~config/content-types'
import { HeroBanner, HeroBannerProps } from '../HeroBanner'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'

describe(HeroBanner, () => {
  const defaultProps = {
    contentType: CmsContentTypes.HERO_BANNER,
    image: {
      title: 'Some relevant image',
      alt: 'Some relevant image',
      url: 'https://picsum.photos/1000/200'
    },
    title: 'Your personal online pharmacy',
    richTextTitle: '<p>Your personal</p><p>online pharmacy</p>',
    text: 'Atida private label',
    searchPlaceholder: 'What are you looking for?',
    link: {
      label: 'view more',
      url: '/about-us'
    }
  } as const

  const setup = (
    props: Partial<HeroBannerProps> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <HeroBanner {...defaultProps} {...props} />
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

  it('renders title', () => {
    setup()
    expect(screen.getByTestId('heroBannerTitle')).toBeInTheDocument()
    expect(
      screen.getByText('Your personal online pharmacy')
    ).toBeInTheDocument()
  })

  it('renders text', () => {
    setup()
    expect(screen.getByText('Atida private label')).toBeInTheDocument()
  })

  it('renders image', () => {
    setup()
    expect(screen.queryAllByRole('img')[0]).toBeInTheDocument()
    expect(screen.queryAllByRole('img')[0]).toHaveAttribute(
      'src',
      'https://picsum.photos/1000/200'
    )
    expect(screen.queryAllByRole('img')[0]).toHaveAttribute(
      'alt',
      'Some relevant image'
    )
  })

  it("doesn't crash when image is not passed", () => {
    const { container } = setup({ image: undefined })
    expect(container).toBeInTheDocument()
  })

  it('renders link', () => {
    setup()
    expect(screen.getByRole('link', { name: 'view more' })).toHaveAttribute(
      'href',
      '/about-us'
    )
  })

  it("doesn't crash when text link is not passed", () => {
    const { container } = setup({ link: undefined })
    expect(container).toBeInTheDocument()
  })
})
