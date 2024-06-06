import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeEvery } from 'redux-saga/effects'

import { createClient, logger } from '~helpers'
import {
  getMenuFailure,
  getMenuFulfill,
  getMenuRequest,
  getMenuSuccess,
  getMenuTrigger
} from '~domains/menu'
import { Menu } from '~domains/contentful'
import { getErrorMessage } from '~helpers/error'

const dispatchMenuItemCollectionFetchRequest = async (
  locale: string,
  menuTitle: string
): Promise<Menu> => {
  if (typeof window === 'undefined') {
    const {
      fetchMenuItemCollection
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require('../services/fetch-menu-item-collection')
    return fetchMenuItemCollection(locale, menuTitle)
  } else {
    const client = createClient({ locale })
    const response = await client.get<Menu>(
      `/api/submenu/get?menuTitle=${menuTitle}`
    )

    return response.data
  }
}

function* getMenuSaga({ payload }: ReturnType<typeof getMenuTrigger>) {
  const { menuTitle } = payload

  try {
    yield put(getMenuRequest())
    const locale: string = yield getContext('locale')
    const response: Menu = yield call(
      dispatchMenuItemCollectionFetchRequest,
      locale,
      menuTitle
    )
    yield put(getMenuSuccess(response))
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      getMenuFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(getMenuFulfill())
  }
}

export function* fetchMenuItemCollectionSaga(): SagaIterator {
  yield all([takeEvery(getMenuTrigger, getMenuSaga)])
}
