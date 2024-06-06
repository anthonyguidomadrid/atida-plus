import { render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { LoyaltyLoginCTABasket } from './LoyaltyLoginCTABasket'

describe(LoyaltyLoginCTABasket, () => {
  const setup = () => {
    const { reset } = setupMatchMediaMock(true)
    const renderedComponent = render(
      <LoyaltyLoginCTABasket currency="EUR" rewardTotal={0.73} />
    )
    reset()
    return renderedComponent
  }

  it('render the component', () => {
    setup()
    expect(screen.getByTestId('loyaltyLoginCTABasket')).toBeInTheDocument()
  })
})
