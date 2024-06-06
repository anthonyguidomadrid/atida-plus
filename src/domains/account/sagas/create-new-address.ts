import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  createNewAddressTrigger,
  createNewAddressRequest,
  createNewAddressSuccess,
  createNewAddressFailure,
  createNewAddressFulfill
} from '../slices'
import { CreateNewAddressTriggerPayload } from '../types'
import Router from 'next/router'
import { getErrorMessage } from '~helpers/error'

function* doCreateNewAddressSaga({
  payload
}: PayloadAction<CreateNewAddressTriggerPayload>) {
  try {
    yield put(createNewAddressRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    yield call(client.post, '/api/account/create-new-address', details)
    yield put(createNewAddressSuccess())
    if (payload.redirect) {
      Router.push(payload.redirect)
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        createNewAddressFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        createNewAddressFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(createNewAddressFulfill())
  }
}

export function* createNewAddressSaga(): SagaIterator {
  yield all([takeLatest(createNewAddressTrigger, doCreateNewAddressSaga)])
}
