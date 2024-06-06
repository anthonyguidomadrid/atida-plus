import { AtidaCash, RedeemAtidaCashFormProps } from '.'

export default {
  component: AtidaCash,
  title: 'molecules/AtidaCash',
  args: {
    wasSuccess: false,
    atidaCashUsed: 0,
    totalBalance: 1400
  }
}

export const basic = (args: RedeemAtidaCashFormProps): JSX.Element => (
  <AtidaCash {...args} />
)

export const successForm = (args: RedeemAtidaCashFormProps): JSX.Element => (
  <AtidaCash {...args} atidaCashUsed={10} />
)

export const unsuccessfulForm = (
  args: RedeemAtidaCashFormProps
): JSX.Element => <AtidaCash {...args} />
