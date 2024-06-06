import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { Button } from '~components/atoms/Button'
import { InfoLabel } from '~components/atoms/InfoLabel'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { InfoLabelEnum } from '~domains/product'
import { ReactComponent as NavDelete } from '~assets/svg/navigation-24px/NavDelete.svg'
import { ReactComponent as Edit } from '~assets/svg/navigation-24px/Edit.svg'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { ReactComponent as Description } from '~assets/svg/navigation-24px/Description.svg'
import { useTranslation } from 'react-i18next'
import { Address } from '~domains/checkout/types'
import {
  UpdateAddressTriggerPayload,
  DeleteAddressPayload,
  deleteAddressSelectors,
  DeleteAddressItemState
} from '~domains/address'
import { AddressFormValues } from '~components/organisms/AddressForm'
import {
  getCountryFromIso2Code,
  getSubdivisionPerIso2Code,
  getSubdivisionPerLocale
} from '~helpers'
import { useRouter } from 'next/router'

export type AddressSummaryTileProps = Partial<Address> & {
  address: Partial<Address>
  companyName?: string | null
  reference?: string | undefined
  isMinified?: boolean
  isDisabled: boolean
  updateAddress: (address: UpdateAddressTriggerPayload) => void
  deleteAddress: ({
    addressId,
    isDefaultShipping,
    isDefaultBilling
  }: DeleteAddressPayload) => void
  updateIsPending: boolean
  setIsAddressModalOpen: (isAddressModalOpen: boolean) => void
  setSelectedAddress: Dispatch<
    SetStateAction<Partial<AddressFormValues> | undefined>
  >
  setShowCheckoutNotification: (isCheckoutNotificationShown: boolean) => void
}

export const AddressSummaryTile: FunctionComponent<AddressSummaryTileProps> = ({
  address,
  companyName,
  reference,
  isMinified = false,
  isDisabled,
  updateAddress,
  deleteAddress,
  updateIsPending,
  setIsAddressModalOpen,
  setSelectedAddress,
  setShowCheckoutNotification,
  ...props
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const isDesktopSize = useBreakpoint(breakpoints.sm)

  const selectDeleteAddressIsLoading = useSelector(
    deleteAddressSelectors.selectDeleteAddressItems
  )

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    !isLoading &&
      selectDeleteAddressIsLoading?.some(
        (item: DeleteAddressItemState) =>
          item.id === address.id && item.isLoading
      ) &&
      setIsLoading(true)

    isLoading &&
      selectDeleteAddressIsLoading?.some(
        (item: DeleteAddressItemState) =>
          item.id === address.id &&
          !item.isLoading &&
          (item.wasError || item.wasSuccess)
      ) &&
      setIsLoading(false)
  }, [address.id, isLoading, selectDeleteAddressIsLoading])

  const {
    firstName,
    lastName,
    address1,
    houseNumber,
    addition,
    zipCode,
    city,
    province,
    district,
    country,
    iso2Code,
    isDefaultShipping,
    isDefaultBilling
  } = address

  const handleMinifiedSelectedAddress = () => {
    isMinified && setIsAddressModalOpen(false)
    isMinified && setSelectedAddress(address)
  }

  return (
    <article
      data-testid="AddressSummaryTile"
      {...props}
      className={classNames('relative p-3 border border-ui-grey-light', {
        'opacity-50 pointer-events-none': isDisabled,
        'cursor-pointer': isMinified && !isDisabled
      })}
      role="presentation"
      onKeyDown={() => handleMinifiedSelectedAddress()}
      onClick={() => handleMinifiedSelectedAddress()}
    >
      <div
        className={classNames(
          'flex flex-col sm:flex-row place-content-between',
          {
            'sm:flex-row-reverse': isDefaultShipping || isDefaultBilling
          }
        )}
      >
        {(isDefaultShipping || isDefaultBilling) && (
          <section className="mb-2 sm:mb-0 flex flex-row sm:flex-col sm:items-end gap-1">
            {isDefaultShipping && (
              <div data-testid="defaultShippingAddressLabel">
                <InfoLabel
                  variant={
                    isDisabled
                      ? InfoLabelEnum.AddressDisabled
                      : InfoLabelEnum.Address
                  }
                >
                  {t('address-book.delivery-address')}
                </InfoLabel>
              </div>
            )}
            {isDefaultBilling && (
              <div data-testid="defaultBillingAddressLabel">
                <InfoLabel
                  variant={
                    isDisabled
                      ? InfoLabelEnum.AddressDisabled
                      : InfoLabelEnum.Address
                  }
                >
                  {t('address-book.billing-address')}
                </InfoLabel>
              </div>
            )}
          </section>
        )}
        <section
          className={classNames('mb-2 sm:mb-0 flex flex-col', {
            'sm:w-2/3': isMinified,
            'sm:w-3/4': !isMinified
          })}
        >
          {companyName && (
            <p className=" mb-0.5 font-semibold truncate">{companyName}</p>
          )}
          <p className="truncate">
            {`${firstName ?? ''} `}
            {lastName ?? ''}
          </p>
          {address1 && (
            <p className="truncate" data-testid="AddressSummaryTile-Address1">
              {`${address1}`} {houseNumber ?? ''}
              {addition && `, ${addition}`}
            </p>
          )}
          {city && zipCode && (
            <p className="truncate">
              {zipCode} {city}
            </p>
          )}
          <div className="flex">
            {(province || district) && (
              <p className="truncate">
                {getSubdivisionPerIso2Code(iso2Code ?? '', address)},&nbsp;
              </p>
            )}
            {iso2Code && (
              <p className="truncate">{getCountryFromIso2Code(iso2Code)}</p>
            )}
          </div>
        </section>
      </div>
      {!isDisabled && !isMinified && (
        <>
          <section className="flex flex-col sm:flex-row gap-2 mb-3 mt-3">
            <div
              data-testid="defaultShippingAddressButton"
              className={classNames('flex', {
                'opacity-50 pointer-events-none': updateIsPending,
                'text-ui-grey': isDefaultShipping
              })}
            >
              <Delivery
                role="presentation"
                className="icon-24 inline mr-1.25"
              />
              {!isDefaultShipping ? (
                <Button
                  data-testid="setAsDefaultDelivery"
                  variant="back"
                  className="text-base align-bottom text-left"
                  onClick={() => {
                    updateAddress({
                      isDefaultShipping: true,
                      reference,
                      addressId: address.id,
                      subdivision: address?.province || address?.district
                    })
                  }}
                >
                  {t('address-book.set-default-delivery')}
                </Button>
              ) : (
                <span className="align-bottom text-left">
                  {t('address-book.delivery-address')}
                </span>
              )}
            </div>
            <div
              data-testid="defaultBillingAddressButton"
              className={classNames('flex', {
                'opacity-50 pointer-events-none': updateIsPending,
                'text-ui-grey': isDefaultBilling
              })}
            >
              <Description
                role="presentation"
                className="icon-24 inline mr-1.25"
              />
              {!isDefaultBilling ? (
                <Button
                  data-testid="setAsDefaultBilling"
                  variant="back"
                  className="text-base leading-6 align-bottom text-left"
                  onClick={() =>
                    updateAddress({
                      isDefaultBilling: true,
                      reference,
                      addressId: address.id
                    })
                  }
                >
                  {t('address-book.set-default-billing')}
                </Button>
              ) : (
                <span className="align-bottom text-left">
                  {t('address-book.billing-address')}
                </span>
              )}
            </div>
          </section>
          <section className="flex flex-row gap-1 place-content-stretch">
            <Button
              className={classNames('w-6 h-auto sm:w-auto sm:grow', {
                'text-ui-grey border-ui-grey': isDefaultShipping
              })}
              variant="tertiary"
              data-testid="deleteAddressButton"
              aria-label={t('address-book.delete-address')}
              isLoading={isLoading}
              disabled={updateIsPending || isLoading}
              icon={<NavDelete role="presentation" className="icon-24" />}
              onClick={() => {
                if (address?.id) {
                  deleteAddress({
                    addressId: address.id,
                    isDefaultShipping,
                    isDefaultBilling
                  })
                }
              }}
            >
              {isDesktopSize && t('address-book.delete-address')}
            </Button>
            <Button
              className="grow"
              variant="tertiary"
              data-testid="editAddressButton"
              icon={<Edit role="presentation" className="icon-24" />}
              disabled={updateIsPending}
              onClick={() => {
                setShowCheckoutNotification(false)
                setIsAddressModalOpen(true)
                // TODO: Add missing fields once the BE work is finished
                setSelectedAddress({
                  id: address.id,
                  firstName,
                  lastName,
                  address1,
                  houseNumber,
                  addition,
                  zipCode,
                  city,
                  subdivision: getSubdivisionPerLocale(locale ?? '', address),
                  country,
                  isDefaultShipping,
                  isDefaultBilling
                })
              }}
            >
              {t('address-book.edit-address')}
            </Button>
          </section>
        </>
      )}
    </article>
  )
}
