import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectContent = (state: RootState) => state?.server?.promotion?.content

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

export const selectData = createSelector(
  selectContent,
  content => content?.data
)

export const selectTotal = createSelector(
  selectContent,
  content => content?.total ?? 0
)

export const selectSkip = createSelector(
  selectContent,
  content => content?.skipped
)

export const selectFilters = createSelector(
  selectContent,
  content => content?.filters
)

export const selectId = createSelector(selectContent, content => content?.id)
