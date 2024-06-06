import { screen } from '@testing-library/react'

import { setupMatchMediaMock } from '~domains/breakpoints'
import { InfoLabelEnum } from '~domains/product/types'
import { PromotionHeader, PromotionHeaderProps } from '.'
import { renderWithStore } from '~test-helpers'

describe(PromotionHeader, () => {
  const defaultProps = {
    title: 'Sample Title',
    description: 'Sample description',
    image: {
      title: 'A sample image',
      url: 'https://source.unsplash.com/random/448x228?sig=0'
    },
    color: 'category-beauty',
    labels: [
      {
        type: InfoLabelEnum.Promotion,
        label: '-15% desc.'
      },
      {
        type: InfoLabelEnum.CampaignPromotion,
        label: 'Gift'
      }
    ],
    backFunction: jest.fn()
  }
  const setup = (
    props: PromotionHeaderProps = defaultProps,
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    renderWithStore(<PromotionHeader {...props} />)
    reset()
  }

  it('renders the title', () => {
    setup()
    expect(
      screen.getByRole('heading', { name: 'Sample Title' })
    ).toBeInTheDocument()
  })

  it('renders the description', () => {
    setup()
    expect(screen.getByText('Sample description')).toBeInTheDocument()
  })

  it('renders the labels', () => {
    setup()
    expect(screen.getByTestId('labelsList')).toHaveTextContent(
      `${defaultProps.labels[0].label}`
    )
  })

  it('renders a back button', () => {
    setup()
    expect(
      screen.getByRole('button', { name: 'shared.back' })
    ).toBeInTheDocument()
  })
})
