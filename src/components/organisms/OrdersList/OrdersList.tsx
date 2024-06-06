import classNames from 'classnames'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { ToggleSwitch } from '~components/atoms/ToggleSwitch'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { OrderHistoryItem } from '~components/molecules/OrderHistoryItem'
import { Pagination } from '~components/molecules/Pagination'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  OrderHistorySortedDates,
  invoiceRequireTrigger,
  updateTaxReferenceTrigger,
  clearUpdateTaxReferenceError
} from '~domains/account'
import {
  selectCustomerDetails,
  selectCustomerReference,
  selectCustomerTaxReference,
  selectDefaultShippingAddressIsTaxExempt,
  selectDefaultShippingAddressRegion,
  selectInvoiceRequired,
  selectIsLoading
} from '~domains/account/selectors/customer'
import { ACCOUNT_TYPE_BUSINESS } from '~config/constants/account-types'
import { useSize } from '~helpers/useSize'
import { SPECIAL_TAX_PROVINCES_ES } from '~config/constants/subdivisions-per-locale'
import { NotificationModalLayout } from '~components/molecules/NotificationModalLayout'
import { useBreakpoint, breakpoints } from '~domains/breakpoints'
import { Notification } from '~components/atoms/Notification'
import { Button } from '~components/atoms/Button'
import { TextField } from '~components/atoms/TextField'
import { Field, Form, Formik } from 'formik'
import { FormField } from '~components/molecules/FormField'
import { taxReferenceRegexByLocale, useDetectOutsideClick } from '~helpers'
import { useRouter } from 'next/router'
import {
  selectError,
  selectWasError,
  selectWasIsLoading
} from '~domains/account/selectors/update-tax-reference'

export type OrdersListProps = {
  orders: OrderHistorySortedDates[]
  ordersLoaded: boolean
  totalPages: number | undefined
}

const MAX_SHOWN_PAGES = 3
const IMG_SIZE = 78

export const OrdersList: FunctionComponent<OrdersListProps> = ({
  orders,
  ordersLoaded,
  totalPages
}) => {
  const { t } = useTranslation()
  const listRef = useRef<HTMLDivElement>(null)
  const { width } = useSize(listRef)
  const [maxProductsIndex, setMaxProductsIndex] = useState(4)
  const isRequestingInvoicesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_REQUEST_INVOICE
  )

  const customerDetails = useSelector(selectCustomerDetails)
  const customerRegion = useSelector(selectDefaultShippingAddressRegion)
  const isBusinessAccount =
    customerDetails?.accountType === ACCOUNT_TYPE_BUSINESS
  const isTaxExempt = useSelector(selectDefaultShippingAddressIsTaxExempt)
  const customerTaxReference = useSelector(selectCustomerTaxReference)
  const customerReference = useSelector(selectCustomerReference)
  const isCustomerLoading = useSelector(selectIsLoading)
  const isUpdateTaxReferenceLoading = useSelector(selectWasIsLoading)
  const invoiceRequired = useSelector(selectInvoiceRequired)
  const dispatch = useDispatch()
  const isSpecialTaxProvince = (subdivision: string): boolean => {
    return SPECIAL_TAX_PROVINCES_ES.some(
      province => province.label === subdivision
    )
  }
  const wasError = useSelector(selectWasError)
  const error = useSelector(selectError)

  const modalRef = useRef(null)
  const { locale } = useRouter()
  const isDesktopScreen = useBreakpoint(breakpoints.sm)
  const [
    isTaxReferenceMissingModalOpen,
    setIsTaxReferenceMissingModalOpen
  ] = useDetectOutsideClick(modalRef, false)

  const [isToggling, setIsToggling] = useState(false)

  const requestInvoiceLocked =
    isBusinessAccount || isTaxExempt || isSpecialTaxProvince(customerRegion)

  useEffect(() => {
    width && setMaxProductsIndex(Math.min(Math.round(width / IMG_SIZE - 1), 8))
  }, [width, listRef])

  useEffect(() => {
    if (
      isRequestingInvoicesEnabled &&
      !customerTaxReference &&
      requestInvoiceLocked
    )
      setIsTaxReferenceMissingModalOpen(true)
  }, [
    customerTaxReference,
    isRequestingInvoicesEnabled,
    requestInvoiceLocked,
    setIsTaxReferenceMissingModalOpen
  ])

  useEffect(() => {
    if (
      isRequestingInvoicesEnabled &&
      customerReference &&
      customerTaxReference &&
      isToggling
    ) {
      dispatch(
        invoiceRequireTrigger({
          customerReference,
          invoiceRequired: !invoiceRequired
        })
      )
      setIsToggling(false)
    }
  }, [
    customerReference,
    customerTaxReference,
    dispatch,
    invoiceRequired,
    isRequestingInvoicesEnabled,
    isToggling
  ])

  useEffect(() => {
    if (
      isRequestingInvoicesEnabled &&
      !isUpdateTaxReferenceLoading &&
      customerTaxReference
    ) {
      setIsTaxReferenceMissingModalOpen(false)
    }
  }, [
    customerTaxReference,
    isRequestingInvoicesEnabled,
    isUpdateTaxReferenceLoading,
    setIsTaxReferenceMissingModalOpen
  ])

  useEffect(() => {
    if (!isTaxReferenceMissingModalOpen) {
      dispatch(clearUpdateTaxReferenceError())
    }
  }, [dispatch, isTaxReferenceMissingModalOpen])

  const onToggleSwitch = () => {
    if (customerReference && !customerTaxReference) {
      setIsTaxReferenceMissingModalOpen(true)
      return
    }
    if (customerReference) {
      dispatch(
        invoiceRequireTrigger({
          customerReference,
          invoiceRequired: !invoiceRequired
        })
      )
    }
  }

  const taxReferenceFieldValidationSchema = Yup.object({
    taxReference: Yup.string()
      .matches(
        taxReferenceRegexByLocale(locale ?? '', true),
        t('account.address-form.tax-reference-format')
      )
      .required(t('account.address-form.tax-reference-required'))
  })

  return (
    <main ref={listRef}>
      <h1 className={classNames('px-2 md:px-0 mb-3 sm:mb-4 md:mb-5')}>
        {t('account.order-history')}
      </h1>
      {isRequestingInvoicesEnabled && (
        <>
          <div
            data-testid="requestInvoice"
            className="flex justify-between border-ui-grey-lightest border p-3 mx-2 md:mx-0 mb-3 sm:mb-4 md:mb-5 items-center"
          >
            <p className="max-w-[76%] font-semibold text-base">
              {requestInvoiceLocked
                ? t('account.toggle-request-invoice-title.locked')
                : t('account.toggle-request-invoice-title')}
            </p>
            <ToggleSwitch
              isToggleLocked={requestInvoiceLocked}
              onToggleSwitch={onToggleSwitch}
              toggleEnabled={!!invoiceRequired}
              isLoading={isCustomerLoading}
            />
          </div>
          {isTaxReferenceMissingModalOpen ? (
            <NotificationModalLayout
              modalRef={modalRef}
              isOpen={isTaxReferenceMissingModalOpen}
              variant={isDesktopScreen ? 'center' : 'bottom'}
              maxWidth={!isDesktopScreen}
              isFixedPosition
              showIcon={false}
              className="sm:pb-4 max-w-[767px] sm:max-w-60"
              hideButtonSection
              isTaxReferenceModal
              children={
                <div className="w-full">
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-bold mb-0.5">
                      {t('account.tax-reference-modal.label')}
                    </p>
                    <p className="text-sm sm:text-base mb-1">
                      {t('account.tax-reference-modal.description')}
                    </p>
                  </div>
                  {wasError ? (
                    <Notification
                      type="error"
                      role="alert"
                      title=""
                      content={error ? t(error) : ''}
                      className="mb-1"
                    />
                  ) : undefined}
                  <Formik<{ taxReference: string }>
                    enableReinitialize={true}
                    initialValues={{ taxReference: '' }}
                    onSubmit={values => {
                      if (customerReference) {
                        dispatch(
                          updateTaxReferenceTrigger({
                            customerReference,
                            taxReference: values.taxReference
                          })
                        )
                        setIsToggling(true)
                      }
                    }}
                    validationSchema={taxReferenceFieldValidationSchema}
                    validateOnBlur={false}
                  >
                    {({ errors, touched, setFieldError, setFieldValue }) => (
                      <Form data-testid="taxReferenceForm">
                        <FormField
                          required={true}
                          inputId="taxReference"
                          label={t('form.field.tax-reference.label')}
                          data-testid="taxReferenceFormField"
                          error={touched.taxReference && errors.taxReference}
                          className="text-left"
                        >
                          <Field
                            data-testid="taxReferenceField"
                            component={TextField}
                            type="text"
                            name="taxReference"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldError(e.target.name, undefined)
                              setFieldValue(e.target.name, e.target.value)
                            }}
                          />
                        </FormField>
                        {!isDesktopScreen && (
                          <hr className="my-2 absolute right-0 left-0 text-ui-grey-lightest" />
                        )}
                        <div className="flex justify-between gap-1 mt-4.25 sm:mt-4">
                          <Button
                            variant="tertiary"
                            className="flex-1"
                            onClick={() =>
                              setIsTaxReferenceMissingModalOpen(false)
                            }
                          >
                            {t('shared.cancel')}
                          </Button>
                          <Button
                            data-testid="submitButton"
                            variant="primary"
                            className="flex-1"
                            type="submit"
                            isLoading={
                              isUpdateTaxReferenceLoading || isCustomerLoading
                            }
                          >
                            {t('shared.accept')}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              }
            />
          ) : null}
        </>
      )}

      {ordersLoaded ? (
        orders.length > 0 ? (
          <>
            {orders?.map(order => (
              <section className="px-2 md:px-0" key={order.date}>
                <header>
                  <h6 className="mb-2">{order.date}</h6>
                </header>
                <div>
                  {order.orderHistory &&
                    order.orderHistory.map(item => (
                      <OrderHistoryItem
                        key={item.id}
                        {...item}
                        maxProductsIndex={maxProductsIndex}
                      />
                    ))}
                </div>
              </section>
            ))}
            <Pagination
              pages={totalPages ?? 1}
              maxShownPages={MAX_SHOWN_PAGES}
            />
          </>
        ) : (
          <h3 className="px-2 md:px-0">{t('order-history.no-orders')}</h3>
        )
      ) : (
        <LoadingSpinner className="min-h-30" />
      )}
    </main>
  )
}
