import { GetStaticPropsContext } from 'next'
import type { EnhancedStore, AnyAction, Middleware } from '@reduxjs/toolkit'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'

import { RootState } from '~domains/redux'
import { getPromotionFulfill, getPromotionTrigger } from '~domains/promotion'
import { selectPageContent } from '~domains/page'
import { getMenuFulfill, getMenuTrigger } from '~domains/menu'

export const getCopDataProps = async (
  context: GetStaticPropsContext,
  store: EnhancedStore<RootState, AnyAction, Middleware<RootState>[]>
) => {
  const pageContent = selectPageContent(store.getState())

  store.dispatch(
    getPromotionTrigger({
      filters: [pageContent.content?.categoryCop?.category?.id as string]
    })
  )
  store.dispatch(
    getMenuTrigger({
      menuTitle: `${pageContent?.content?.categoryCop?.category?.title} categories`
    })
  )

  await Promise.all([
    store.dispatch({
      type: 'promotion',
      [WAIT_FOR_ACTION]: getPromotionFulfill().type
    }),
    store.dispatch({
      type: 'menu',
      [WAIT_FOR_ACTION]: getMenuFulfill().type
    })
  ])

  return {}
}
