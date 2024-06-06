import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'
import { availableLocales } from '~domains/translated-routes/config'

const selectPage = (state: RootState) => state.server.page

export const selectPageContent = createSelector(
  selectPage,
  page => page?.['page-content']
)

export const selectContent = createSelector(
  selectPageContent,
  pageContent => pageContent?.content
)

export const selectContentLoading = createSelector(
  selectPageContent,
  pageContent => pageContent?.isLoading ?? false
)

export const selectPageType = createSelector(
  selectPageContent,
  pageContent => pageContent?.content?.type
)

export const selectCampaignPage = createSelector(
  selectPageContent,
  pageContent => pageContent?.content?.isCampaignPage
)

export const selectPageTitle = createSelector(
  selectPageContent,
  pageContent => pageContent?.content?.title
)

export const selectPageSlug = createSelector(
  selectPageContent,
  pageContent => pageContent?.content?.slug
)

export const selectPageAllSlugs = createSelector(
  selectPageContent,
  pageContent => pageContent?.content?.allSlugs
)

export const selectPagePortugueseSlug = createSelector(
  selectPageContent,
  pageContent => pageContent?.content?.allSlugs?.[availableLocales[1]]
)

export const selectPageSpanishSlug = createSelector(
  selectPageContent,
  pageContent => pageContent?.content?.allSlugs?.[availableLocales[2]]
)
