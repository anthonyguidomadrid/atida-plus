import { screen } from '@testing-library/react'
import { promotionTeaser } from './PromotionTeaser.mock'
import { PromotionTeaser, PromotionTeaserProps } from '.'
import { renderWithStore } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe(PromotionTeaser, () => {
  const setup = (
    props: Partial<PromotionTeaserProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <PromotionTeaser {...promotionTeaser} {...props} />
    )
    reset()
    return renderedComponent
  }

  it('renders PromotionTeaser component', () => {
    setup()
    expect(screen.getByTestId('promotionTeaser')).toBeInTheDocument()
  })

  it('renders promotion name', () => {
    setup()
    expect(screen.getByText('Make the most of your money')).toBeInTheDocument()
  })

  it('renders promotion description', () => {
    setup()
    expect(
      screen.getByText('Free product with every purchase')
    ).toBeInTheDocument()
  })

  it("doesn't throw an error if no description is passed", () => {
    const { container } = setup({
      ...promotionTeaser,
      shortDescription: undefined
    })
    expect(container).toBeInTheDocument()
  })

  it("doesn't throw an error if no url is passed", () => {
    const { container } = setup({
      ...promotionTeaser,
      url: undefined
    })
    expect(container).toBeInTheDocument()
  })

  it('renders image', () => {
    setup()
    expect(screen.getByTestId('promotionTeaserImage')).toBeInTheDocument()
  })

  it("doesn't throw an error if no image is passed", () => {
    const { container } = setup({
      ...promotionTeaser,
      teaserImage: undefined
    })
    expect(container).toBeInTheDocument()
  })

  it('renders a various elements if teaserType is true', () => {
    setup()
    expect(screen.queryByTestId('teaserTypeTrueLink')).toBeInTheDocument()
    expect(screen.queryByTestId('teaserTypeTrueDivMain')).toBeInTheDocument()
    expect(screen.queryByTestId('teaserTypeTrueH2')).toBeInTheDocument()
    expect(screen.queryByTestId('teaserTypeTrueButton')).toBeInTheDocument()
    expect(screen.queryByTestId('promotionTeaserImage')).toBeInTheDocument()
  })

  it('renders other elements if teaserType is false', () => {
    setup({ teaserType: false })
    expect(screen.queryByTestId('teaserTypeFalseDiv')).toBeInTheDocument()
    expect(screen.queryByTestId('promotionImageLink')).toBeInTheDocument()
    expect(screen.queryByTestId('teaserTypeFalseImg')).toBeInTheDocument()
  })

  it('renders image a lazy image by default', () => {
    setup()
    expect(screen.getByTestId('promotionTeaserImage')).toHaveAttribute(
      'loading',
      'lazy'
    )
  })

  it('renders image an eager image when LCP', () => {
    setup({ isLcp: true })
    expect(screen.getByTestId('promotionTeaserImage')).toHaveAttribute(
      'loading',
      'eager'
    )
  })
})
