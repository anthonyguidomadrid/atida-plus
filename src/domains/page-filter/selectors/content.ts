import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectContent = (state: RootState) => state?.server?.pageFilter?.content

export const selectIsLoading = createSelector(
  selectContent,
  content => content?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectContent,
  content => content?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectContent,
  content => content?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectContent,
  content => content?.error
)

export const selectSlug = createSelector(
  selectContent,
  content => content?.slug
)

export const selectFilters = createSelector(
  selectContent,
  content => content?.filters
)
