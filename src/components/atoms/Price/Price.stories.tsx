import { Price, PriceProps } from '.'

export default {
  component: Price,
  title: 'atoms/Price',
  args: {
    price: {
      value: 1299,
      currency: 'EUR'
    },
    pricePerUnit: {
      value: 516,
      currency: 'EUR',
      unit: '100ml'
    },
    rrp: {
      value: 1598,
      currency: 'EUR'
    }
  }
}

export const basic = (args: PriceProps): JSX.Element => <Price {...args} />
export const vertical = (args: PriceProps): JSX.Element => (
  <Price {...args} isVertical={true} />
)
export const withRRP = (args: PriceProps): JSX.Element => (
  <Price {...args} showRRP />
)
export const small = (args: PriceProps): JSX.Element => (
  <Price {...args} size="small" />
)
export const medium = (args: PriceProps): JSX.Element => (
  <Price {...args} size="medium" />
)
export const mediumVertical = (args: PriceProps): JSX.Element => (
  <Price {...args} size="medium" isVertical={true} />
)
