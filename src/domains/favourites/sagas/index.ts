import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { getFavouritesSaga } from '~domains/favourites/sagas/get-favourites'
import { getProductsSaga } from '~domains/favourites/sagas/get-products'
import { addFavouritesSaga } from '~domains/favourites/sagas/add-favourites'
import { removeFavouritesSaga } from '~domains/favourites/sagas/remove-favourites'
import { addFavouritesSaveSaga } from '~domains/favourites/sagas/add-favourites-save'
import { removeFavouritesSaveSaga } from '~domains/favourites/sagas/remove-favourites-save'

export function* favouritesSaga(): SagaIterator {
  yield all(
    [
      getFavouritesSaga,
      getProductsSaga,
      addFavouritesSaga,
      removeFavouritesSaga,
      addFavouritesSaveSaga,
      removeFavouritesSaveSaga
    ].map(fork)
  )
}
