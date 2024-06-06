import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectItemState = (state: RootState, props: { sku?: string }) =>
  props.sku ? state.client.basket?.['item-states']?.[props.sku] : undefined

const selectItemsState = (state: RootState) =>
  state.client.basket?.['item-states']

export const selectItemIsLoading = createSelector(
  selectItemState,
  state => state?.isLoading ?? false
)

export const selectItemWasError = createSelector(
  selectItemState,
  state => state?.wasError ?? false
)

export const selectItemWasSuccess = createSelector(
  selectItemState,
  state => state?.wasSuccess ?? false
)

export const selectItemError = createSelector(
  selectItemState,
  state => state?.error
)

export const selectItemsQuantityError = createSelector(
  selectItemState,
  state => state?.errorInfo?.not_available_items?.[0]
)

export const selectItemsAnyLoading = createSelector(selectItemsState, state =>
  Object.values(state)?.find(value => value.isLoading) ? true : false
)

export const selectItemsAnySuccess = createSelector(selectItemsState, state =>
  Object.values(state)?.find(value => value.wasSuccess) ? true : false
)

export const selectItemsAnyError = createSelector(selectItemsState, state =>
  Object.values(state)?.find(value => value.error) ? true : false
)
