import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  takeLatest,
  select
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import { selectId, resetBasket, selectData } from '~domains/basket'
import {
  createOrderTrigger,
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  createOrderFulfill,
  createOrderSetTemporaryBasket
} from '../slices'
import {
  selectOrder,
  selectTaxReference,
  mbWayPaymentClearDetails,
  sibsMultibancoPaymentClearDetails,
  createPaymentMethodClearDetails,
  bizumPaymentClearDetails,
  adyenPaymentResetState,
  createMultiplePaymentsResetState
} from '~domains/checkout'
import { SetCheckoutDataPayload, CheckoutData } from '../types'
import { isJson } from '~helpers/isJson'
import { ApiError, getErrorMessage } from '~helpers/error'
import { selectInvoiceRequired } from '~domains/account/selectors/customer'

function* doCreateOrder({ payload }: PayloadAction<SetCheckoutDataPayload>) {
  try {
    const order: ReturnType<typeof selectOrder> = yield select(selectOrder)
    const taxReference: ReturnType<typeof selectTaxReference> = yield select(
      selectTaxReference
    )
    yield put(sibsMultibancoPaymentClearDetails())
    yield put(mbWayPaymentClearDetails())
    yield put(createPaymentMethodClearDetails())
    yield put(bizumPaymentClearDetails())
    yield put(adyenPaymentResetState())
    yield put(createMultiplePaymentsResetState())
    yield put(createOrderRequest())
    const basketItems: ReturnType<typeof selectData> = yield select(selectData)
    const basketId: string = yield select(selectId)
    const locale: string = yield getContext('locale')
    const invoiceRequired: ReturnType<
      typeof selectInvoiceRequired
    > = yield select(selectInvoiceRequired)

    if (typeof order === 'undefined') {
      const client = createClient({
        locale,
        addAnonymousCustomerUniqueId: false
      })
      const response: AxiosResponse<CheckoutData> = yield call(
        client.post,
        '/api/checkout/create-order',
        {
          ...payload,
          taxReference,
          basketId,
          invoiceRequired
        }
      )
      yield put(resetBasket())
      yield put(createOrderSuccess(response.data))
      yield put(createOrderSetTemporaryBasket({ basketItems }))
    } else {
      yield put(createOrderSuccess(order))
    }
  } catch (error) {
    logger.error(getErrorMessage(error))
    let errorDetail = (error as ApiError)?.response?.data?.details?.detail
    errorDetail = isJson(errorDetail) ? JSON.parse(errorDetail) : errorDetail

    const errorMessages = getErrorMessage(error)
    yield put(
      createOrderFailure({
        errorMessage: Array.isArray(errorMessages)
          ? errorMessages[0]
          : errorMessages,
        details: errorDetail
      })
    )
  } finally {
    yield put(createOrderFulfill())
  }
}

export function* createOrderSaga(): SagaIterator {
  yield all([takeLatest(createOrderTrigger, doCreateOrder)])
}
