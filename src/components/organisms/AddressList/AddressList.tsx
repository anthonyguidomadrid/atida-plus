import classNames from 'classnames'
import { Dispatch, FunctionComponent, SetStateAction, useMemo } from 'react'
import { AddressSummaryTile } from '~components/molecules/AddressSummaryTile'
import { CustomerAddress } from '~domains/account'
import {
  UpdateAddressTriggerPayload,
  DeleteAddressPayload
} from '~domains/address'
import { Address } from '~domains/checkout/types'
import { getCountryFromLocale } from '~helpers'
import { AddressFormValues } from '../AddressForm'
import { FilterList } from '../FilterList'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type AddressListProps = {
  locale: string | undefined
  initialAddresses: CustomerAddress[]
  reference?: string | undefined
  isMinified: boolean
  companyName: string | null | undefined
  updateAddress: (address: UpdateAddressTriggerPayload) => void
  deleteAddress: ({
    addressId,
    isDefaultShipping,
    isDefaultBilling
  }: DeleteAddressPayload) => void
  updateIsPending: boolean
  setIsAddressModalOpen: (isAddressModalOpen: boolean) => void
  setSelectedAddress: Dispatch<
    SetStateAction<Partial<AddressFormValues> | Partial<Address> | undefined>
  >
  setShowCheckoutNotification: (isCheckoutNotificationShown: boolean) => void
}

export const AddressList: FunctionComponent<AddressListProps> = ({
  locale,
  initialAddresses,
  reference,
  isMinified,
  companyName,
  updateAddress,
  deleteAddress,
  updateIsPending,
  setIsAddressModalOpen,
  setSelectedAddress,
  setShowCheckoutNotification
}) => {
  const isAddressISO8601DateFormatEnabled = useFeatureFlag(
    FeatureFlag.ADDRESS_ADDRESS_ISO8601_DATE_FORMAT
  )

  const sortedAddresses = useMemo(
    () =>
      sortAddresses(
        isAddressISO8601DateFormatEnabled,
        [...initialAddresses],
        locale
      ),
    [initialAddresses, locale, isAddressISO8601DateFormatEnabled]
  )

  return (
    <div
      data-testid="addressList"
      className={classNames('w-full relative', {
        'mt-3 sm:mt-4 lg:mt-5': !isMinified
      })}
    >
      {sortedAddresses &&
        sortedAddresses.map((address, idx) => (
          <div id={`address-${idx}`} key={idx} className="my-2">
            <AddressSummaryTile
              companyName={companyName}
              address={address}
              reference={reference}
              isMinified={isMinified}
              isDisabled={address.country !== getCountryFromLocale(locale)}
              updateAddress={updateAddress}
              deleteAddress={deleteAddress}
              updateIsPending={updateIsPending}
              setIsAddressModalOpen={setIsAddressModalOpen}
              setSelectedAddress={setSelectedAddress}
              setShowCheckoutNotification={setShowCheckoutNotification}
            />
          </div>
        ))}
    </div>
  )
}
const sortAddresses = (
  featureFlagEnabled:
    | boolean
    | string
    | number
    | Record<string, unknown>
    | Array<unknown>,
  addresses: CustomerAddress[],
  locale: string | undefined
): Partial<Address>[] => {
  const getFormattedDate = (dateString: number | string | Date): number => {
    return featureFlagEnabled
      ? new Date(dateString).getTime()
      : new Date(dateString.toString().replace(' ', 'T')).getTime()
  }

  /*
    Here we sort addresses by Date *then* Availability *then* Billing and *then* Shipping,
    so that Shipping takes priority over Billing, Availability and Date; Billing takes priority
    over Availability and Date; and Availability takes priority over Date.
  */
  const sortedAddresses = addresses
    .sort((x, y) => {
      return y?.updatedAt && x?.updatedAt
        ? getFormattedDate(y?.updatedAt) - getFormattedDate(x?.updatedAt)
        : 0
    })
    .sort((x, y) => {
      return (
        (y?.country === getCountryFromLocale(locale) ? 1 : 0) -
        (x?.country === getCountryFromLocale(locale) ? 1 : 0)
      )
    })
    .sort((x, y) => {
      return (y?.isDefaultBilling ? 1 : 0) - (x?.isDefaultBilling ? 1 : 0)
    })
    .sort((x, y) => {
      return (y?.isDefaultShipping ? 1 : 0) - (x?.isDefaultShipping ? 1 : 0)
    })
  return sortedAddresses as Partial<Address>[]
}

export default FilterList
