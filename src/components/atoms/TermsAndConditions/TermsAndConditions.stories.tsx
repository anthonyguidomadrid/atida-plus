import { TermsAndConditions, TermsAndConditionsProps } from '.'

export default {
  component: TermsAndConditions,
  title: 'atoms/TermsAndConditions'
}

export const basic = (args: TermsAndConditionsProps): JSX.Element => (
  <TermsAndConditions {...args} />
)
