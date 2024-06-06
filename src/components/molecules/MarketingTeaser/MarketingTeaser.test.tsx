import { screen } from '@testing-library/react'
import { marketingTeaser } from './MarketingTeaser.mock'
import { MarketingTeaser, MarketingTeaserProps } from '.'
import { renderWithStore } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe(MarketingTeaser, () => {
  const setup = (
    props: Partial<MarketingTeaserProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)

    const renderedComponent = renderWithStore(
      <MarketingTeaser {...marketingTeaser} {...props} />
    )
    reset()
    return renderedComponent
  }

  it('renders MarketingTeaser component', () => {
    setup()
    expect(screen.getByTestId('marketingTeaser')).toBeInTheDocument()
  })

  it('renders teaser title', () => {
    setup()
    expect(
      screen.getByText('Save over 50% with Atida Plus')
    ).toBeInTheDocument()
  })

  it('renders teaser description', () => {
    setup()
    expect(
      screen.getByText('Free product with every purchase')
    ).toBeInTheDocument()
  })

  it('renders teaser label', () => {
    setup()
    expect(screen.getByTestId('teaserLabel')).toBeInTheDocument()
  })

  it('renders teaser button', () => {
    setup({
      ...marketingTeaser,
      hasButton: true
    })
    expect(screen.getByTestId('marketingTeaserButton')).toBeInTheDocument()
  })

  it("doesn't throw an error if no description is passed", () => {
    const { container } = setup({
      ...marketingTeaser,
      description: undefined
    })
    expect(container).toBeInTheDocument()
  })

  it("doesn't throw an error if no url is passed doesn't contain a href", () => {
    const { container } = setup({
      ...marketingTeaser,
      url: undefined
    })
    expect(container).not.toContainHTML('<a>')
    expect(container).toBeInTheDocument()
  })

  it('renders image', () => {
    setup()
    expect(screen.getByTestId('marketingTeaserImage')).toBeInTheDocument()
  })

  it('render brand logo if is FullWidthImage', () => {
    setup({ ...marketingTeaser, isFullWidthImage: true })
    expect(screen.getByTestId('marketingTeaserLogo')).toBeInTheDocument()
  })

  it("doesn't throw an error if no image is passed", () => {
    const { container } = setup({
      ...marketingTeaser,
      image: undefined
    })
    expect(container).toBeInTheDocument()
  })

  it('renders a lazy image when not LCP', () => {
    setup()
    expect(screen.getByTestId('marketingTeaserImage')).toHaveAttribute(
      'loading',
      'lazy'
    )
  })

  it('renders aa eager image when LCP', () => {
    setup({ isLcp: true })
    expect(screen.getByTestId('marketingTeaserImage')).toHaveAttribute(
      'loading',
      'eager'
    )
  })
})
