import { FunctionComponent } from 'react'
import {
  AddressSuggestionFeatureFlagProps,
  ValidatedAddress
} from '~domains/address'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { DEFAULT_ADDRESS_MAX_NUMBER_OF_SUGGESTION } from '~config/constants/address-lookup'
import { getSuggestedAddressLabel } from '~helpers/addressLookup'
import classNames from 'classnames'

export type SuggestedAddressesProps = {
  suggestedAddresses: ValidatedAddress[]
  setSelectedAddress: (selectedAddress: ValidatedAddress) => void
  showSuggestedAddresses: boolean
}

export const SuggestedAddresses: FunctionComponent<SuggestedAddressesProps> = ({
  suggestedAddresses,
  setSelectedAddress,
  showSuggestedAddresses
}) => {
  const isAddressSuggestionEnabled: AddressSuggestionFeatureFlagProps = useFeatureFlag(
    FeatureFlag.ACCOUNT_ADDRESS_SUGGESTION_ADDRESS_BOOK
  ) as AddressSuggestionFeatureFlagProps

  const addresses = suggestedAddresses.slice(
    0,
    isAddressSuggestionEnabled.maxNumberOfSuggestions ??
      DEFAULT_ADDRESS_MAX_NUMBER_OF_SUGGESTION
  )

  return (
    <>
      {showSuggestedAddresses && suggestedAddresses.length > 0 ? (
        <ul
          data-testid="suggestedAddresses"
          className="w-full flex flex-col absolute z-50 divide-y divide-ui-grey-default-alt border border-ui-grey-default-alt bg-primary-white -mt-1.5 shadow-lg rounded"
        >
          {addresses.map((address, idx) => {
            return (
              <li key={`suggested-address-${idx}`}>
                <button
                  data-testid={`suggested-address-${idx}`}
                  className={classNames(
                    'w-full px-2 py-1 text-left text-sm font-light hover:bg-ui-quick-help',
                    {
                      'rounded-t': idx === 0,
                      'rounded-b': idx === addresses.length - 1
                    }
                  )}
                  type="button"
                  onKeyDown={e =>
                    e.key === 'Enter' && setSelectedAddress(address)
                  }
                  onMouseDown={() => {
                    // onBlur events fire before onClick ones,
                    // so we need to use onMouseDown to capture the selected address before the dropdown classes
                    setSelectedAddress(address)
                  }}
                >
                  {getSuggestedAddressLabel(address.address)}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </>
  )
}
