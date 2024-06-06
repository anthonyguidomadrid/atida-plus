import { PromoInformationBox, PromoInformationBoxProps } from '.'

export default {
  component: PromoInformationBox,
  title: 'atoms/PromoInformationBox',
  args: {
    promoInformation: 'Buy 2 items of brand X and get product Z for free',
    hasGift: true
  }
}

export const basic = (args: PromoInformationBoxProps): JSX.Element => (
  <PromoInformationBox {...args} />
)
