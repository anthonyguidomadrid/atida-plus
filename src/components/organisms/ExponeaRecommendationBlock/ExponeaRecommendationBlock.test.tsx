import { screen } from '@testing-library/react'
import { ExponeaRecommendationBlock } from '../ExponeaRecommendationBlock'
import { ExponeaRecommendationBlockProps } from './ExponeaRecommendationBlock'
import { renderWithStore } from '~test-helpers'
import { testInitialState } from './ExponeaRecommendationBlock.mock'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe(ExponeaRecommendationBlock, () => {
  const defaultProps = {
    recommendationId: 'someRecommendationId'
  }
  const setup = (
    props: Partial<ExponeaRecommendationBlockProps> = {},
    emptyInitialState = false
  ) => {
    const { reset } = setupMatchMediaMock(true)
    const renderedComponent = renderWithStore(
      <ExponeaRecommendationBlock
        loading="eager"
        {...defaultProps}
        {...props}
      />,
      {
        initialState: emptyInitialState ? undefined : testInitialState
      }
    )
    reset()
    return renderedComponent
  }

  // TODO: Update tests for accepting the slider
  it('renders the component', () => {
    setup()
    expect(screen.getByTestId('recommendationBlock')).toBeInTheDocument()
  })

  it('renders ProductGrid', () => {
    setup()
    expect(screen.getByTestId('recommendationProducts')).toBeInTheDocument()
  })
  it("renders the Link if a 'category' prop is passed", async () => {
    const { getByText } = setup({
      category: { id: 'someId', url: '/some-url' }
    })

    expect(await getByText('products.view-all')).toHaveAttribute(
      'href',
      '/some-url'
    )
  })
  it("renders the Button SVG if a 'category' prop is passed", () => {
    setup({ category: { id: 'someId', url: '/some-url' } })
    expect(
      screen.getByTestId('recommendationProducts').nextSibling?.firstChild
        ?.firstChild
    ).toHaveClass('button__icon--before icon-16')
  })

  it("doesn't render the component if there's no recommendations", () => {
    setup({}, true)
    expect(screen.queryByTestId('recommendationBlock')).not.toBeInTheDocument()
  })
})
