import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { updateAddressSaga } from './update-address'
import { createAddressSaga } from './create-address'
import { deleteAddressSaga } from './delete-address'
import { validateAddressSaga } from './validate-address'

export function* addressSaga(): SagaIterator {
  yield all(
    [
      updateAddressSaga,
      createAddressSaga,
      deleteAddressSaga,
      validateAddressSaga
    ].map(fork)
  )
}
