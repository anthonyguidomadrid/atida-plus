import { combineReducers } from '@reduxjs/toolkit'
import { namespacesSlice } from './namespaces'

export const translationsReducer = combineReducers({
  namespaces: namespacesSlice.reducer
})

export const {
  trigger: namespacesTrigger,
  request: namespacesRequest,
  success: namespacesSuccess,
  failure: namespacesFailure,
  fulfill: namespacesFulfill
} = namespacesSlice.actions
