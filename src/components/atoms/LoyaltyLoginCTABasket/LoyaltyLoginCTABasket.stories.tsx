import { LoyaltyLoginCTABasket } from './index'

export default {
  component: LoyaltyLoginCTABasket,
  title: 'atoms/LoyaltyLoginCTABasket'
}

export const Basic = (): JSX.Element => (
  <LoyaltyLoginCTABasket currency="EUR" rewardTotal={0.72} />
)
