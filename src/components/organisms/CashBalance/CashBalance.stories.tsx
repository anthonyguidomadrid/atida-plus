import { CashBalance, CashBalanceProps } from '.'

export default {
  component: CashBalance,
  title: 'molecules/CashBalance',
  args: {
    amount: 777888,
    currency: 'EUR'
  }
}

export const withContentFromDesign = (args: CashBalanceProps): JSX.Element => (
  <CashBalance {...args} />
)
