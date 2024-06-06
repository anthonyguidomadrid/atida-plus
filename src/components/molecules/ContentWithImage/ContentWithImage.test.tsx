import { screen } from '@testing-library/react'
import { CmsContentTypes } from '~config/content-types'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { ContentWithImage, ContentWithImageProps } from '../ContentWithImage'
import { renderWithStore } from '~test-helpers'

describe(ContentWithImage, () => {
  const defaultProps = {
    contentType: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE,
    image: {
      description: 'Some relevant image',
      url: 'https://picsum.photos/1000/200',
      title: '',
      type: ''
    },
    title: 'Any questions?',
    content:
      "<p>We're here to help. Ask about our products or get expert medical advice.</p>",
    cta: {
      url: '/cta',
      label: 'Chat with an expert',
      icon: 'NavAdvice24'
    },
    textLink: {
      url: '/link',
      label: 'Read our FAQ'
    },
    backgroundColor: 'primary-white',
    textColor: 'primary-oxford-blue',
    titleTypography: 'heading',
    imageSize: 'large',
    textAlignmentForMobile: 'left',
    showDescription: true,
    buttonVariant: 'primary',
    buttonWidthForMobile: 'auto',
    buttonPositionForTablet: 'right'
  } as const

  const setup = (
    props: Partial<ContentWithImageProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <ContentWithImage {...defaultProps} {...props} />
    )
    reset()
    return renderedComponent
  }

  it('renders title', () => {
    setup()
    expect(
      screen.getByRole('heading', { name: 'Any questions?' })
    ).toBeInTheDocument()
  })

  it('renders content', () => {
    setup()
    expect(
      screen.getByText(
        "We're here to help. Ask about our products or get expert medical advice."
      )
    ).toBeInTheDocument()
  })

  it('renders image', () => {
    setup()
    expect(screen.getByAltText('Some relevant image')).toHaveAttribute(
      'src',
      'https://picsum.photos/1000/200'
    )
  })

  it("doesn't crash when image is not passed", () => {
    const { container } = setup({ image: undefined })
    expect(container).toBeInTheDocument()
  })

  it('renders CTA', () => {
    setup()
    expect(
      screen.getByRole('link', { name: 'Chat with an expert' })
    ).toHaveAttribute('href', '/cta')
    expect(screen.getByTestId('dynamic component')).toBeInTheDocument()
  })

  it("doesn't crash when cta is not passed", () => {
    const { container } = setup({ cta: undefined })
    expect(container).toBeInTheDocument()
  })

  it('renders text link', () => {
    setup()
    expect(screen.getByRole('link', { name: 'Read our FAQ' })).toHaveAttribute(
      'href',
      '/link'
    )
  })

  it("doesn't crash when text link is not passed", () => {
    const { container } = setup({ textLink: undefined })
    expect(container).toBeInTheDocument()
  })

  it('renders cta link', () => {
    setup()
    expect(
      screen.getByRole('link', { name: 'Chat with an expert' })
    ).toHaveAttribute('href', '/cta')
  })

  it('does not render cta link when the url is undefined', () => {
    setup({
      cta: {
        url: undefined,
        label: 'Chat with an expert',
        icon: 'NavAdvice24'
      }
    })
    expect(
      screen.getByRole('link', { name: 'Chat with an expert' })
    ).not.toHaveAttribute('href', '/cta')
  })

  it('does not render textLink link when the url is undefined', () => {
    setup({
      textLink: {
        url: undefined,
        label: 'Read our FAQ'
      }
    })
    expect(
      screen.getByRole('link', { name: 'Read our FAQ' })
    ).not.toHaveAttribute('href', '/link')
  })
})
