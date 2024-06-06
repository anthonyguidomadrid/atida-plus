import type { GetServerSideProps, NextPage } from 'next'
// @ts-ignore
import smoothscroll from 'smoothscroll-polyfill'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import { pageContentFulfill, pageContentTrigger } from '~domains/page'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { ReactComponent as Add } from '~assets/svg/navigation-16px/NavAdd.svg'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  selectCustomerReference,
  selectAddresses,
  selectWasSuccess as selectWasCustomerSuccess,
  selectWasError as selectWasCustomerError,
  selectCustomerSalutation,
  selectCustomerTaxReference,
  selectCustomerSurcharge,
  selectCustomerDetails,
  selectDefaultShippingAddressIsTaxExempt,
  selectDefaultShippingAddressIsoCode,
  selectDefaultBillingAddress,
  selectDefaultShippingAddress
} from '~domains/account/selectors/customer'
import {
  CustomerAddress,
  getCustomerTrigger,
  updateBusinessDetailsTrigger,
  updateTaxReferenceTrigger
} from '~domains/account'
import { triggerReportPageViewed } from '~domains/analytics'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { Button } from '~components/atoms/Button'
import { Address, CustomerSalutation } from '~domains/checkout/types'
import { AddressFormModalLayout } from '~components/molecules/AddressFormModalLayout'
import { AddressList } from '~components/organisms/AddressList'
import {
  AddressForm,
  AddressFormValues
} from '~components/organisms/AddressForm'
import {
  cookieStorageMechanism,
  getCountryFromLocale,
  getIso2CodeFromLocale,
  getLastPathFromURL,
  getSubdivisionPerLocale,
  useDetectOutsideClick
} from '~helpers'
import {
  createAddressTrigger,
  selectIsAnyAddressLoading,
  updateAddressSelectors,
  createAddressSelectors,
  deleteAddressSelectors,
  DeleteAddressPayload,
  updateAddressTrigger,
  UpdateAddressTriggerPayload,
  deleteAddressTrigger,
  DeleteAddressTriggerPayload,
  createAddressClearSuccess,
  deleteAddressClearSuccess,
  updateAddressClearSuccess,
  UpdateBusinessDetailsTriggerPayload
} from '~domains/address'
import { breakpoints } from '~domains/breakpoints/config'
import { useBreakpoint } from '~domains/breakpoints'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { Notification } from '~components/atoms/Notification'
import { NotificationModalLayout } from '~components/molecules/NotificationModalLayout'
import { selectIsBasketEmpty } from '~domains/basket'
import { setDataClear } from '~domains/checkout'
import { ACCOUNT_TYPE_BUSINESS } from '~config/constants/account-types'
import { SPECIAL_TAX_PROVINCES_ES } from '~config/constants/subdivisions-per-locale'
import classNames from 'classnames'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import 'globalthis'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { isTaxRegionValid } from '~helpers/isTaxRegionValid'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

export type NotificationModalProps = {
  title: string
  content: string
  confirmLabel: string
  cancelLabel: string
  shouldOpen?: boolean
}

const AddressBook: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  /** Initialize smooth scroll polyfill for Safari/IE */
  smoothscroll.polyfill()

  const { t } = useTranslation()
  const { locale, query, replace } = useRouter()
  const dispatch = useDispatch()
  const deliveryAddress = useSelector(selectDefaultShippingAddress)
  const billingAddress = useSelector(selectDefaultBillingAddress)
  const reference = useSelector(selectCustomerReference)
  const taxReference = useSelector(selectCustomerTaxReference)
  const addresses = useSelector(selectAddresses) as Partial<Address>[]
  const customerDetails = useSelector(selectCustomerDetails)
  const salutation = useSelector(selectCustomerSalutation) ?? 'Ms'
  const surcharge = useSelector(selectCustomerSurcharge)
  const wasCustomerError = useSelector(selectWasCustomerError)
  const isAddressLoading = useSelector(selectIsAnyAddressLoading)
  const wasCustomerSuccess = useSelector(selectWasCustomerSuccess)
  const wasUpdateAddressSuccess = useSelector(
    updateAddressSelectors.selectWasSuccess
  )
  const wasCreateAddressSuccess = useSelector(
    createAddressSelectors.selectWasSuccess
  )
  const wasDeleteAddressSuccess = useSelector(
    deleteAddressSelectors.selectDeletedAddressWasSuccess
  )
  const isBasketEmpty = useSelector(selectIsBasketEmpty)
  const isTaxExempt = useSelector(selectDefaultShippingAddressIsTaxExempt)
  const addressIsoCode = useSelector(selectDefaultShippingAddressIsoCode)
  const [updateIsPending, setUpdateIsPending] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<
    Partial<AddressFormValues> | undefined
  >(undefined)
  const [selectedAddressId, setSelectedAddressId] = useState('')

  const isSmallScreen = useBreakpoint(breakpoints.sm)

  const [notificationModalOpen, setNotificationModalOpen] = useState(false)
  const [notificationModalTitle, setNotificationModalTitle] = useState('')
  const [
    notificationModalConfirmButtonLabel,
    setNotificationModalConfirmButtonLabel
  ] = useState('')
  const [
    notificationModalCancelButtonLabel,
    setNotificationModalCancelButtonLabel
  ] = useState('')
  const [notificationModalContent, setNotificationModalContent] = useState('')
  const [showCheckoutNotification, setShowCheckoutNotification] = useState(
    false
  )
  const isFirstRender = useRef(true)
  const prevPath = getLastPathFromURL(
    globalThis?.sessionStorage?.getItem('prevPath') ?? ''
  )
  const [isCheckoutPath, setIsCheckoutPath] = useState(
    prevPath.includes('checkout')
  )
  const addressModal = useRef<HTMLDivElement>(null)
  const [isAddressModalOpen, setIsAddressModalOpen] = useDetectOutsideClick(
    addressModal,
    false,
    isAddressLoading
  )
  const isMultipleTaxRegionsValidationEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION
  )

  const iso2Code = getIso2CodeFromLocale(locale)

  const isBusinessAccount =
    customerDetails?.accountType === ACCOUNT_TYPE_BUSINESS

  const isSpecialTaxProvince = (subdivision: string): boolean => {
    return SPECIAL_TAX_PROVINCES_ES.some(
      province => province.label === subdivision
    )
  }

  const setNotification: ({
    title,
    content,
    confirmLabel,
    cancelLabel,
    shouldOpen
  }: NotificationModalProps) => void = ({
    title,
    content,
    confirmLabel,
    cancelLabel,
    shouldOpen = true
  }) => {
    setNotificationModalTitle(title)
    setNotificationModalContent(content)
    setNotificationModalConfirmButtonLabel(confirmLabel)
    setNotificationModalCancelButtonLabel(cancelLabel)
    setNotificationModalOpen(shouldOpen)
  }

  const updateBusinessDetails = useCallback(
    (address: UpdateAddressTriggerPayload) => {
      if (
        reference &&
        customerDetails?.company &&
        taxReference &&
        address?.subdivision &&
        address?.isDefaultShipping
      ) {
        const payload: UpdateBusinessDetailsTriggerPayload = {
          reference,
          companyName: customerDetails.company,
          taxReference,
          ...(isSpecialTaxProvince(address.subdivision) && {
            equivalenceSurcharge: false
          })
        }

        setUpdateIsPending(true)
        setShowCheckoutNotification(false)
        dispatch(updateBusinessDetailsTrigger({ ...payload }))
      }
    },
    [customerDetails?.company, dispatch, reference, taxReference]
  )

  const handleCreateAddressOnSubmit = useCallback(
    (values: AddressFormValues) => {
      const shipping = values?.isDefaultShipping
        ? (values as CustomerAddress)
        : deliveryAddress
      const billing = values?.isDefaultBilling
        ? (values as CustomerAddress)
        : billingAddress

      reference &&
        salutation &&
        dispatch(
          createAddressTrigger({
            reference,
            salutation: salutation as CustomerSalutation,
            firstName: values.firstName,
            lastName: values.lastName,
            address1: values.address1,
            address3: '',
            houseNumber: values.houseNumber,
            addition: values.addition,
            zipCode: values.zipCode,
            city: values.city,
            subdivision: values.subdivision,
            iso2Code: getIso2CodeFromLocale(locale ?? ''),
            isDefaultShipping: values.isDefaultShipping,
            isDefaultBilling: values.isDefaultBilling,
            ...(isMultipleTaxRegionsValidationEnabled && {
              hasValidTaxRegion: isTaxRegionValid(shipping, billing, locale)
            })
          })
        )
      reference &&
        !taxReference &&
        values.taxReference &&
        dispatch(
          updateTaxReferenceTrigger({
            customerReference: reference,
            taxReference: values.taxReference
          })
        )

      /* Recalculate equivalence surcharge for business account */
      isBusinessAccount && updateBusinessDetails(values)
    },
    [
      deliveryAddress,
      billingAddress,
      reference,
      salutation,
      dispatch,
      locale,
      isMultipleTaxRegionsValidationEnabled,
      taxReference,
      isBusinessAccount,
      updateBusinessDetails
    ]
  )

  const handleUpdateAddress = useCallback(
    (values: AddressFormValues) => {
      const shipping = values?.isDefaultShipping
        ? (values as CustomerAddress)
        : deliveryAddress
      const billing = values?.isDefaultBilling
        ? (values as CustomerAddress)
        : billingAddress

      reference &&
        dispatch(
          updateAddressTrigger({
            ...values,
            forceRefresh: true,
            ...(isMultipleTaxRegionsValidationEnabled && {
              hasValidTaxRegion: isTaxRegionValid(shipping, billing, locale)
            })
          })
        )
      reference &&
        !taxReference &&
        values.taxReference &&
        dispatch(
          updateTaxReferenceTrigger({
            customerReference: reference,
            taxReference: values.taxReference
          })
        )

      /* Recalculate equivalence surcharge for business account */
      isBusinessAccount && updateBusinessDetails(values)
    },
    [
      deliveryAddress,
      billingAddress,
      reference,
      dispatch,
      isMultipleTaxRegionsValidationEnabled,
      locale,
      taxReference,
      isBusinessAccount,
      updateBusinessDetails
    ]
  )

  const areAnyValidShippingAddresses = (
    customerAddressBook: Partial<Address>[]
  ) =>
    customerAddressBook.some(
      address =>
        address.isDefaultShipping &&
        address.country === getCountryFromLocale(locale)
    )

  const areAnyValidBillingAddresses = (
    customerAddressBook: Partial<Address>[]
  ) =>
    customerAddressBook.some(
      address =>
        address.isDefaultBilling &&
        address.country === getCountryFromLocale(locale)
    )

  const isInvalidCountryAddress =
    addresses?.length > 0 &&
    (!areAnyValidShippingAddresses(addresses) ||
      !areAnyValidBillingAddresses(addresses))

  const isValidTaxRegions = useMemo(() => {
    return isMultipleTaxRegionsValidationEnabled &&
      !isInvalidCountryAddress &&
      addresses?.length > 0
      ? deliveryAddress &&
          billingAddress &&
          isTaxRegionValid(deliveryAddress, billingAddress, locale)
      : true
  }, [
    isMultipleTaxRegionsValidationEnabled,
    isInvalidCountryAddress,
    addresses?.length,
    deliveryAddress,
    billingAddress,
    locale
  ])

  const handleDeleteAddress = ({
    addressId,
    isDefaultShipping,
    isDefaultBilling
  }: DeleteAddressPayload) => {
    setShowCheckoutNotification(false)
    const notificationSettings = {
      title:
        isDefaultBilling && !isDefaultShipping
          ? t('address-book.notification.title.default-billing.selected')
          : t('address-book.notification.title.default-shipping.selected'),
      content:
        isDefaultBilling && !isDefaultShipping
          ? t('address-book.notification.default-billing.selected')
          : t('address-book.notification.default-shipping.selected'),
      confirmLabel:
        isDefaultBilling && !isDefaultShipping
          ? t('address-book.notification.confirm')
          : t('address-book.notification.accept'),
      cancelLabel:
        isDefaultBilling && !isDefaultShipping
          ? t('address-book.notification.cancel')
          : ''
    }

    setNotification({
      ...notificationSettings,
      shouldOpen: isDefaultShipping || isDefaultBilling
    })

    setSelectedAddressId(!isDefaultShipping ? addressId : '')

    !isDefaultShipping &&
      !isDefaultBilling &&
      reference &&
      deleteAddress({ reference, addressId })
  }

  const handleNotificationModalClose = () => {
    setNotificationModalOpen(false)
  }

  const handleNotificationModalConfirm = () => {
    if (selectedAddressId && reference) {
      deleteAddress({ reference, addressId: selectedAddressId })
    }

    setNotificationModalOpen(false)
  }

  useEffect(() => {
    if (isCheckoutPath && isFirstRender.current && query.doEdit) {
      const currentSelectedAddress = addresses.find(
        address => address.isDefaultShipping === true
      )
      setSelectedAddress({
        ...currentSelectedAddress,
        subdivision: getSubdivisionPerLocale(
          locale ?? '',
          currentSelectedAddress
        )
      })
      setIsAddressModalOpen(true)
      isFirstRender.current = false
    }
  }, [addresses, isCheckoutPath, locale, query.doEdit, setIsAddressModalOpen])

  useEffect(() => {
    if ((wasCustomerError || wasCustomerSuccess) && query.address) {
      const address = addresses.find(adress => adress.id === query.address)
      if (address && address.iso2Code === iso2Code) {
        setSelectedAddress({
          ...address,
          subdivision: getSubdivisionPerLocale(locale ?? '', address)
        })
        setIsAddressModalOpen(true)
      }
      if (query.address === 'new') {
        setSelectedAddress(undefined)
        setIsAddressModalOpen(true)
      }
      delete query.address
      replace(
        {
          query
        },
        undefined,
        { shallow: true }
      )
    }
  }, [
    query,
    addresses,
    wasCustomerError,
    wasCustomerSuccess,
    iso2Code,
    replace,
    locale,
    setIsAddressModalOpen
  ])

  useEffect(() => {
    wasUpdateAddressSuccess && setIsAddressModalOpen(false)
  }, [setIsAddressModalOpen, wasUpdateAddressSuccess])

  useEffect(() => {
    wasCreateAddressSuccess && setIsAddressModalOpen(false)
  }, [setIsAddressModalOpen, wasCreateAddressSuccess])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Address Book', pageType: 'account' })
    )
    dispatch(setDataClear())
  }, [dispatch])

  useEffect(() => {
    !isAddressModalOpen &&
      (addressModal.current as HTMLDivElement)?.scrollTo({ top: 0 })
  }, [isAddressModalOpen])

  useEffect(() => {
    if (wasCustomerError || wasCustomerSuccess) {
      setUpdateIsPending(false)
    }
  }, [wasCustomerError, wasCustomerSuccess])

  useEffect(() => {
    ;(wasUpdateAddressSuccess ||
      wasCreateAddressSuccess ||
      wasDeleteAddressSuccess) &&
      setShowCheckoutNotification(true)
  }, [
    wasCreateAddressSuccess,
    wasUpdateAddressSuccess,
    wasDeleteAddressSuccess
  ])

  useEffect(() => {
    setShowCheckoutNotification(false)
    dispatch(createAddressClearSuccess())
    dispatch(updateAddressClearSuccess())
    dispatch(deleteAddressClearSuccess())
  }, [dispatch])

  useEffect(() => {
    const isTaxExemptCookie = cookieStorageMechanism().get('isTaxExempt')
    const isTaxExemptCookieStore =
      isTaxExemptCookie && JSON.parse(isTaxExemptCookie).store
    if (
      !isTaxExempt &&
      isTaxExemptCookie &&
      addressIsoCode === iso2Code &&
      isTaxExemptCookieStore === addressIsoCode
    ) {
      cookieStorageMechanism().remove('isTaxExempt')
    }
  }, [addressIsoCode, isTaxExempt, locale, iso2Code])

  useEffect(() => {
    !prevPath.includes('address-book') &&
      setIsCheckoutPath(prevPath.includes('checkout'))
  }, [prevPath])

  useEffect(() => {
    if (reference) {
      dispatch(getCustomerTrigger({ customerReference: reference }))
    }
  }, [dispatch, reference])

  const updateAddress = (payload: UpdateAddressTriggerPayload) => {
    let hasValidTaxRegion: undefined | boolean = undefined
    if (
      isMultipleTaxRegionsValidationEnabled &&
      (payload.isDefaultBilling || payload.isDefaultShipping)
    ) {
      const address = addresses.find(
        address => address.id === payload.addressId
      )
      const shipping = payload?.isDefaultShipping
        ? (address as CustomerAddress)
        : deliveryAddress
      const billing = payload?.isDefaultBilling
        ? (address as CustomerAddress)
        : billingAddress

      hasValidTaxRegion = isTaxRegionValid(shipping, billing, locale)
    }

    setUpdateIsPending(true)
    setShowCheckoutNotification(false)
    dispatch(
      updateAddressTrigger({
        ...payload,
        forceRefresh: true,
        hasValidTaxRegion
      })
    )

    /* Recalculate equivalence surcharge for business account */
    isBusinessAccount && updateBusinessDetails(payload)
  }

  const deleteAddress = (payload: DeleteAddressTriggerPayload) => {
    dispatch(deleteAddressTrigger({ ...payload }))
  }

  return (
    <>
      <MetaData title={t('seo.titles.address-book')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('account', locale)} />
      <div className="mx-2 sm:mx-0">
        <h1>{t('account.address-book')}</h1>
      </div>
      {!wasCustomerError && !wasCustomerSuccess && addresses.length === 0 ? (
        <div className="mt-3 flex justify-center relative sm:mt-4 lg:mt-5">
          <LoadingSpinner className="w-5" />
        </div>
      ) : (
        <>
          <div className="mt-3 relative mx-2 sm:mx-0 sm:mt-4 lg:mt-5">
            {isValidTaxRegions && showCheckoutNotification && isCheckoutPath && (
              <Notification
                className="mb-3"
                type="success"
                role="alert"
                title={t('address-book.checkout.update.success.title')}
              >
                {!isBasketEmpty && (
                  <NextLink href="/checkout" passHref prefetch={false}>
                    <Link data-testid="navigationItemLink">
                      {t('address-book.checkout.update.success.link')}
                    </Link>
                  </NextLink>
                )}
              </Notification>
            )}
            {isInvalidCountryAddress && (
              <Notification
                className="mb-3"
                type="warning"
                title={t('account.address-book.warning.wrong-country.title')}
                content={t(
                  'account.address-book.warning.wrong-country.content'
                )}
              >
                <div className="mt-1">
                  <button
                    className="underline font-light"
                    onClick={() => {
                      setSelectedAddress(undefined)
                      setIsAddressModalOpen(true)
                    }}
                  >
                    {t('account.address-book.edit-or-add-a-new-address')}
                  </button>
                </div>
              </Notification>
            )}
            {!isValidTaxRegions && (
              <Notification
                className="mb-3"
                type="warning"
                title={t(
                  'account.address-book.warning.invalid-tax-regions.title'
                )}
                content={t(
                  'account.address-book.warning.invalid-tax-regions.content'
                )}
              >
                <NextLink
                  href={`/account/address-book?address=${billingAddress?.id}`}
                  passHref
                >
                  <Link className="font-semibold">
                    {t(
                      'account.address-book.warning.invalid-tax-regions.button'
                    )}
                  </Link>
                </NextLink>
              </Notification>
            )}
            <div
              className={classNames({
                'mt-3 sm:mt-4 lg:mt-5':
                  addresses &&
                  (!areAnyValidShippingAddresses(addresses) ||
                    !areAnyValidBillingAddresses(addresses))
              })}
            >
              <Button
                className="w-full h-12"
                onClick={() => {
                  setShowCheckoutNotification(false)
                  setSelectedAddress(undefined)
                  setIsAddressModalOpen(true)
                }}
                icon={<Add className="icon-16" />}
                variant="add-address"
              >
                {t('account.address-book.add-new-address')}
              </Button>
            </div>
            {addresses && (
              <AddressList
                locale={locale}
                initialAddresses={addresses as CustomerAddress[]}
                reference={reference}
                companyName={customerDetails?.company}
                isMinified={false}
                updateAddress={updateAddress}
                deleteAddress={handleDeleteAddress}
                updateIsPending={updateIsPending}
                setIsAddressModalOpen={setIsAddressModalOpen}
                setSelectedAddress={setSelectedAddress}
                setShowCheckoutNotification={setShowCheckoutNotification}
              />
            )}
          </div>
        </>
      )}
      <AddressFormModalLayout
        title={
          selectedAddress
            ? t('account.address-book.edit-address')
            : t('account.address-book.add-new-address')
        }
        isOpen={isAddressModalOpen}
        addressModal={addressModal}
        setIsAddressModalOpen={setIsAddressModalOpen}
      >
        <AddressForm
          isOpen={isAddressModalOpen}
          anyValidShippingAddress={
            addresses ? areAnyValidShippingAddresses(addresses) : true
          }
          anyValidBillingAddress={
            addresses ? areAnyValidBillingAddresses(addresses) : true
          }
          onSubmit={values => {
            !selectedAddress && handleCreateAddressOnSubmit(values)
            selectedAddress && handleUpdateAddress(values)
          }}
          setIsAddressModalOpen={setIsAddressModalOpen}
          isBusinessAccount={isBusinessAccount}
          selectedAddress={selectedAddress}
          reference={reference}
          surcharge={surcharge}
          taxReference={taxReference}
          firstName={customerDetails?.firstName}
          lastName={customerDetails?.lastName}
        />
      </AddressFormModalLayout>
      <NotificationModalLayout
        isOpen={notificationModalOpen}
        variant={isSmallScreen ? 'center' : 'bottom'}
        maxWidth={!isSmallScreen}
        isFixedPosition
        handleClose={handleNotificationModalClose}
        closeButtonLabel={notificationModalCancelButtonLabel}
        handleConfirm={handleNotificationModalConfirm}
        confirmButtonLabel={notificationModalConfirmButtonLabel}
        title={notificationModalTitle}
      >
        {notificationModalContent}
      </NotificationModalLayout>
    </>
  )
}

AddressBook.Layout = (page: JSX.Element) => (
  <AccountPageLayout>{page}</AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_ADDRESS_SUGGESTION_ADDRESS_BOOK,
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION
  ])

  store.dispatch(pageContentTrigger({ slug: getPageUrlSlug(context) }))

  await store.dispatch({
    type: 'page-content',
    [WAIT_FOR_ACTION]: pageContentFulfill().type
  })

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default AddressBook
