import {
  PersonalDetailsSummary,
  PersonalDetailsSummaryProps
} from './PersonalDetailsSummary'

export default {
  component: PersonalDetailsSummary,
  title: 'molecules/PersonalDetailsSummary',
  args: {
    email: 'julia@atida.com',
    firstName: 'Julia',
    lastName: 'Schubert',
    salutation: 'Mrs'
  }
}

export const Basic = (args: PersonalDetailsSummaryProps): JSX.Element => (
  <PersonalDetailsSummary {...args} />
)
