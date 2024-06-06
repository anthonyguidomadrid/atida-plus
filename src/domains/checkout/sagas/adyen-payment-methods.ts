import type { SagaIterator } from 'redux-saga'
import { AxiosResponse } from 'axios'
import {
  all,
  call,
  getContext,
  put,
  takeLatest,
  select
} from 'redux-saga/effects'
import {
  createClient,
  logger,
  transformLocaleToUppercaseAndUnderscore,
  getIso2CodeFromLocale
} from '~helpers'
import {
  adyenPaymentMethodsTrigger,
  adyenPaymentMethodsRequest,
  adyenPaymentMethodsSuccess,
  adyenPaymentMethodsFailure,
  adyenPaymentMethodsFulfill
} from '../slices'
import { getErrorMessage } from '~helpers/error'
import { selectTotals, selectCurrency } from '~domains/basket'
import { ALLOWED_PAYMENT_METHODS_ADYEN } from '~config/constants/payments'
import { customerSelectors, OrderItemPrices } from '~domains/account'
import { AdyenPaymentMethodsResponse } from '../types'

function* doAdyenPaymentMethods(): SagaIterator {
  try {
    yield put(adyenPaymentMethodsRequest())
    const locale: string = yield getContext('locale')
    const totals: OrderItemPrices = yield select(selectTotals)

    const currency: string = yield select(selectCurrency)
    const customerReference: string = yield select(
      customerSelectors.selectCustomerReference
    )

    const countryCode = getIso2CodeFromLocale(locale)
    const shopperLocale = transformLocaleToUppercaseAndUnderscore(locale)

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<AdyenPaymentMethodsResponse> = yield call(
      client.post,
      '/api/checkout/adyen-payment-methods',
      {
        amount: totals.grandTotal,
        currency,
        countryCode,
        shopperLocale,
        allowedPaymentMethods: ALLOWED_PAYMENT_METHODS_ADYEN,
        ...(customerReference && { shopperReference: customerReference })
      }
    )

    yield put(adyenPaymentMethodsSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        adyenPaymentMethodsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        adyenPaymentMethodsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(adyenPaymentMethodsFulfill())
  }
}

export function* adyenPaymentMethodsSaga(): SagaIterator {
  yield all([takeLatest(adyenPaymentMethodsTrigger, doAdyenPaymentMethods)])
}
