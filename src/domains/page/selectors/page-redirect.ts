import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectPage = (state: RootState) => state.server.page

export const selectPageRedirect = createSelector(
  selectPage,
  page => page['page-redirect']
)

export const selectPageRedirectContent = createSelector(
  selectPageRedirect,
  pageRedirect => pageRedirect.pageRedirect
)
