import { ComponentPropsWithoutRef, FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrderId,
  selectOrderPaymentsData,
  createPaymentMethodClearDetails,
  selectBizumInternalRef,
  selectBizumFormUrl,
  selectBizumSignatureVersion,
  selectBizumMerchantParameters,
  selectBizumSignature,
  selectMultiplePaymentsBizumInternalRef,
  selectMultiplePaymentsBizumFormUrl,
  selectMultiplePaymentsBizumSignatureVersion,
  selectMultiplePaymentsMerchantParameters,
  selectMultiplePaymentsBizumSignature,
  createMultiplePaymentsResetState
} from '~domains/checkout'
import { useTranslation } from 'react-i18next'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import {
  triggerReportAddPaymentInfo,
  triggerReportCheckoutStepCompleted,
  triggerReportOrderCompleted,
  triggerReportProductOrdered
} from '~domains/analytics'
import { cookieStorageMechanism } from '~helpers'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { getOrderPaymentsData } from '~domains/checkout/helpers'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type BizumPaymentMethodProps = ComponentPropsWithoutRef<'span'>
export const BizumPaymentMethod: FunctionComponent<BizumPaymentMethodProps> = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const orderId = useSelector(selectOrderId)
  const orderPaymentsData = useSelector(selectOrderPaymentsData)
  const bizumPaymentRef = useSelector(selectBizumInternalRef)
  const bizumFormUrl = useSelector(selectBizumFormUrl)
  const bizumSignatureVersion = useSelector(selectBizumSignatureVersion)
  const bizumMerchantParameters = useSelector(selectBizumMerchantParameters)
  const bizumSignature = useSelector(selectBizumSignature)
  const multiplePaymentsBizumRef = useSelector(
    selectMultiplePaymentsBizumInternalRef
  )
  const multiplePaymentsBizumFormUrl = useSelector(
    selectMultiplePaymentsBizumFormUrl
  )
  const multiplePaymentsBizumSignatureVersion = useSelector(
    selectMultiplePaymentsBizumSignatureVersion
  )
  const multiplePaymentsMerchantParameters = useSelector(
    selectMultiplePaymentsMerchantParameters
  )
  const multiplePaymentsBizumSignature = useSelector(
    selectMultiplePaymentsBizumSignature
  )

  const bizumForm = document.getElementById('bizum-form') as HTMLFormElement

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isBizumRedirectionDataReceived = isLoyaltyAtidaCashEnabled
    ? multiplePaymentsBizumFormUrl &&
      multiplePaymentsBizumSignatureVersion &&
      multiplePaymentsMerchantParameters &&
      multiplePaymentsBizumSignature
    : bizumFormUrl &&
      bizumSignatureVersion &&
      bizumMerchantParameters &&
      bizumSignature

  useEffect(() => {
    isLoyaltyAtidaCashEnabled
      ? dispatch(createMultiplePaymentsResetState())
      : dispatch(createPaymentMethodClearDetails())
  }, [dispatch, isLoyaltyAtidaCashEnabled])

  useEffect(() => {
    if (
      (isLoyaltyAtidaCashEnabled
        ? multiplePaymentsBizumRef
        : bizumPaymentRef) &&
      orderPaymentsData &&
      isBizumRedirectionDataReceived
    ) {
      dispatch(
        triggerReportAddPaymentInfo({
          payment_method: PAYMENT_OPTIONS.REDSYS_BIZUM,
          success: true
        })
      )

      cookieStorageMechanism().set(
        getOrderPaymentsData(),
        JSON.stringify({
          method_code: PAYMENT_OPTIONS.REDSYS_BIZUM,
          is_redirected: true,
          order_id: orderId
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
        }
      )
      dispatch(
        triggerReportProductOrdered({
          payment_method: PAYMENT_OPTIONS.REDSYS_BIZUM,
          is_redirected: true
        })
      )
      dispatch(
        triggerReportOrderCompleted({
          payment_method: PAYMENT_OPTIONS.REDSYS_BIZUM,
          is_redirected: true
        })
      )
      dispatch(
        triggerReportCheckoutStepCompleted({
          payment_method: PAYMENT_OPTIONS.REDSYS_BIZUM
        })
      )
    }
  }, [
    bizumPaymentRef,
    dispatch,
    orderId,
    orderPaymentsData,
    multiplePaymentsBizumRef,
    isBizumRedirectionDataReceived,
    isLoyaltyAtidaCashEnabled
  ])

  useEffect(() => {
    if (bizumForm && isBizumRedirectionDataReceived) {
      bizumForm?.submit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBizumRedirectionDataReceived])

  return (
    <>
      <form
        data-testid="bizum-form"
        id="bizum-form"
        action={
          isLoyaltyAtidaCashEnabled
            ? multiplePaymentsBizumFormUrl
            : bizumFormUrl
        }
        method="POST"
      >
        <input
          data-testid="bizum-signature-version-input"
          type="hidden"
          name="Ds_SignatureVersion"
          value={
            isLoyaltyAtidaCashEnabled
              ? multiplePaymentsBizumSignatureVersion
              : bizumSignatureVersion
          }
        />
        <input
          data-testid="bizum-merchant-parameters-input"
          type="hidden"
          name="Ds_MerchantParameters"
          value={
            isLoyaltyAtidaCashEnabled
              ? multiplePaymentsMerchantParameters
              : bizumMerchantParameters
          }
        />
        <input
          data-testid="bizum-ds-signature-input"
          type="hidden"
          name="Ds_Signature"
          value={
            isLoyaltyAtidaCashEnabled
              ? multiplePaymentsBizumSignature
              : bizumSignature
          }
        />
      </form>
      <p className="text-sm">{t('checkout.bizum.redirection-message')}</p>
    </>
  )
}
