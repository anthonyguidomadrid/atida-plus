import { PersonalDetails, PersonalDetailsProps } from './PersonalDetails'

export default {
  component: PersonalDetails,
  title: 'molecules/PersonalDetails',
  args: {
    email: 'julia@atida.com',
    name: 'Julia Schubert',
    phone: '+44 345 740 4404'
  }
}

export const Basic = (args: PersonalDetailsProps): JSX.Element => (
  <PersonalDetails {...args} />
)
