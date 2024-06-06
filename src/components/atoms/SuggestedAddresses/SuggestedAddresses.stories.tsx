import { SuggestedAddresses, SuggestedAddressesProps } from './index'
import { suggestedAddresses } from '~domains/address/__mocks__/addresses'
export default {
  component: SuggestedAddresses,
  title: 'atoms/SuggestedAddresses',
  args: {
    suggestedAddresses: suggestedAddresses,
    showSuggestedAddresses: true
  }
}

export const Basic = (args: SuggestedAddressesProps): JSX.Element => (
  <SuggestedAddresses {...args} />
)
