import { InteractivePencilBanner, InteractivePencilBannerProps } from './index'

export default {
  component: InteractivePencilBanner,
  title: 'molecules/InteractivePencilBanner'
}

export const Default = (args: InteractivePencilBannerProps): JSX.Element => (
  <InteractivePencilBanner {...args} />
)

Default.args = {
  closeIcon: true,
  initialCouponCode: 'ATIDA10',
  initialShortOffer: '10% Rabatt auf Ihre erste Bestellung'
}
