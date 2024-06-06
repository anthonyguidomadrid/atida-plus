import { fetchMenuItemCollectionSlice } from '~domains/menu/slices/fetch-menu-item-collection'
import { combineReducers } from '@reduxjs/toolkit'

export const menuReducer = combineReducers({
  menu: fetchMenuItemCollectionSlice.reducer
})

export const {
  trigger: getMenuTrigger,
  request: getMenuRequest,
  success: getMenuSuccess,
  failure: getMenuFailure,
  fulfill: getMenuFulfill
} = fetchMenuItemCollectionSlice.actions
