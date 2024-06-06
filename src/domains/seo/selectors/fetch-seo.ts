import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectSeo = (state: RootState) => state.server.seo

export const selectSeoContent = createSelector(selectSeo, seo => seo?.content)

export const selectSeoData = createSelector(
  selectSeo,
  seo => seo?.content?.data
)
