import { BusinessDetails, BusinessDetailsProps } from './BusinessDetails'

export default {
  component: BusinessDetails,
  title: 'molecules/BusinessDetails',
  args: {
    companyName: 'Company Name',
    taxReference: '12345678A',
    equivalenceSurcharge: true
  }
}

export const Basic = (args: BusinessDetailsProps): JSX.Element => (
  <BusinessDetails {...args} />
)
