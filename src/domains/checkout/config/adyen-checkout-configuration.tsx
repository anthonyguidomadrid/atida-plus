import getConfig from 'next/config'
import { getIso2CodeFromLocale, transformLocaleToUppercase } from '~helpers'
import {
  AdyenAmount,
  AdyenPaymentDetailsState,
  AdyenPaymentMethodsResponseData,
  AdyenPaymentCardPlaceholdersTranslations,
  AdyenSubmitEvent
} from '../types'

export const AdyenCheckoutConfiguration = (
  amount: AdyenAmount,
  locale: string,
  adyenPaymentMethodsData: AdyenPaymentMethodsResponseData,
  handleAdyenPaymentSubmit: (e: AdyenSubmitEvent) => void,
  handleAdyenPaymentChange: (e: AdyenSubmitEvent) => void,
  handleAdyenPaymentOnClick: () => void,
  handleAdyenPaymentDetails: (e: AdyenPaymentDetailsState) => void,
  handleAdyenPaymentError: (e: Error) => void,
  isLoggedIn: boolean,
  translations: AdyenPaymentCardPlaceholdersTranslations
) => {
  const { publicRuntimeConfig } = getConfig()
  const gatewayMerchantIdFinder = (locale: string) => {
    const gatewayMerchantArray = publicRuntimeConfig?.adyen?.gatewayMerchantId

    let myMerchantId = undefined
    if (gatewayMerchantArray !== undefined) {
      myMerchantId = gatewayMerchantArray[locale] ?? undefined
    }

    if (gatewayMerchantArray !== undefined && myMerchantId === undefined) {
      const arrayKey = Object.keys(gatewayMerchantArray)[0]
      myMerchantId = gatewayMerchantArray[arrayKey] ?? undefined
    }

    return myMerchantId
  }
  return {
    paymentMethodsResponse: adyenPaymentMethodsData,
    environment: publicRuntimeConfig.adyen?.environment,
    clientKey: publicRuntimeConfig.adyen?.clientKey,
    onAdditionalDetails: (state: AdyenPaymentDetailsState) => {
      handleAdyenPaymentDetails(state)
    },
    onError: (e: Error) => {
      handleAdyenPaymentError(e)
    },
    locale: transformLocaleToUppercase(locale),
    translations,
    showPayButton: false,
    paymentMethodsConfiguration: {
      paywithgoogle: {
        amount,
        countryCode: getIso2CodeFromLocale(locale),
        environment: publicRuntimeConfig.adyen?.googlePayEnvironment,
        buttonSizeMode: 'fill',
        buttonLocale: getIso2CodeFromLocale(locale)?.toLowerCase(),
        onSubmit: (e: AdyenSubmitEvent) => handleAdyenPaymentSubmit(e),
        onChange: (e: AdyenSubmitEvent) => handleAdyenPaymentChange(e),
        configuration: {
          merchantName: 'ATIDA',
          gatewayMerchantId: gatewayMerchantIdFinder(locale),
          merchantId: publicRuntimeConfig.adyen?.googlePayMerchantId
        }
      },
      applepay: {
        amount,
        countryCode: getIso2CodeFromLocale(locale),
        buttonType: 'buy',
        onSubmit: (e: AdyenSubmitEvent) => {
          handleAdyenPaymentChange(e)
          handleAdyenPaymentSubmit(e)
        }
      },
      klarna_account: {
        onSubmit: (e: AdyenSubmitEvent) => handleAdyenPaymentSubmit(e)
      },
      mbway: {
        onSubmit: (e: AdyenSubmitEvent) => handleAdyenPaymentSubmit(e),
        onChange: (e: AdyenSubmitEvent) => handleAdyenPaymentChange(e)
      },
      multibanco: {
        onSubmit: (e: AdyenSubmitEvent) => {
          handleAdyenPaymentChange(e)
          handleAdyenPaymentSubmit(e)
        }
      },
      card: {
        brands: ['mc', 'visa'],
        showBrandsUnderCardNumber: false,
        enableStoreDetails: isLoggedIn,
        hasHolderName: false,
        autoFocus: true,
        onSubmit: (e: AdyenSubmitEvent) => handleAdyenPaymentSubmit(e),
        onChange: (e: AdyenSubmitEvent) => handleAdyenPaymentChange(e),
        SRConfig: {
          moveFocus: true
        },
        styles: {
          placeholder: {
            lineHeight: '24px',
            fontFamily: ['Sohne', 'Helvetica', 'Arial', 'sans-serif']
          }
        }
      },
      storedCard: {
        hideCVC: true,
        onSubmit: (e: AdyenSubmitEvent) => handleAdyenPaymentSubmit(e),
        onChange: (e: AdyenSubmitEvent) =>
          handleAdyenPaymentChange({ ...e, isStoredCard: true })
      }
    }
  }
}
