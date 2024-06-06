import { screen } from '@testing-library/react'
import { SuggestedAddresses, SuggestedAddressesProps } from './index'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { suggestedAddresses } from '~domains/address/__mocks__/addresses'
import userEvent from '@testing-library/user-event'
import { ValidatedAddress } from '~domains/address'

describe(SuggestedAddresses, () => {
  const selectAddress = jest.fn()
  const defaultProps = {
    suggestedAddresses: suggestedAddresses,
    setSelectedAddress: selectAddress,
    showSuggestedAddresses: true
  }
  const setup = (props: Partial<SuggestedAddressesProps> = {}) =>
    renderWithStoreAndFeatureFlags(
      <SuggestedAddresses {...defaultProps} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_ADDRESS_SUGGESTION_ADDRESS_BOOK]: {
            debounceMs: 200,
            maxNumberOfSuggestions: 5,
            minQueryLength: 5
          }
        }
      }
    )

  it('renders the number of addresses configured on the feature flag', () => {
    setup()
    expect(screen.queryByTestId('suggested-address-0')).toBeInTheDocument()
    expect(screen.queryByTestId('suggested-address-1')).toBeInTheDocument()
    expect(screen.queryByTestId('suggested-address-2')).toBeInTheDocument()
    expect(screen.queryByTestId('suggested-address-3')).toBeInTheDocument()
    expect(screen.queryByTestId('suggested-address-4')).toBeInTheDocument()
  })

  it('hides the addresses when needed', () => {
    setup({ showSuggestedAddresses: false })
    expect(screen.queryByTestId('suggestedAddresses')).not.toBeInTheDocument()
  })

  it('selects the addresses when ENTER key is pressed', () => {
    setup()
    expect(selectAddress).toHaveBeenCalledTimes(0)
    userEvent.type(screen.getByTestId('suggested-address-4'), '{enter}')
    expect(selectAddress).toHaveBeenCalledTimes(2)
  })

  it('selects the addresses when clicked', () => {
    setup()
    expect(selectAddress).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('suggested-address-4'))
    expect(selectAddress).toHaveBeenCalledTimes(1)
  })

  it('renders all the addresses when there are fewer than the number of addresses configured on the feature flag', () => {
    setup({
      suggestedAddresses: suggestedAddresses.slice(0, 2) as ValidatedAddress[]
    })
    expect(screen.queryByTestId('suggested-address-0')).toBeInTheDocument()
    expect(screen.queryByTestId('suggested-address-1')).toBeInTheDocument()
  })
})
