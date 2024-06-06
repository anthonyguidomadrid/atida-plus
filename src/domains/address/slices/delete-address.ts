import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { DeleteAddressTriggerPayload, DeleteAddressState } from '../types'

const initialState: DeleteAddressState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  items: []
}

export const deleteAddressSlice = createSlice({
  name: 'address/delete-address',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<DeleteAddressTriggerPayload>) {
      const data = _action.payload
      _state.items &&
        !_state.items.some(item => item.id === data.addressId) &&
        _state.items.push({
          id: data.addressId,
          isLoading: false,
          wasSuccess: false,
          wasError: false
        })
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state) {
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    itemIsLoading(
      state,
      action: PayloadAction<{
        id: string
        isLoading: boolean
      }>
    ) {
      const data = action.payload
      state.items &&
        state.items.forEach(item => {
          if (item.id === data.id) {
            item.isLoading =
              typeof data.isLoading === 'undefined' ? false : data.isLoading
          }
        })
    },
    itemWasSuccess(
      state,
      action: PayloadAction<{
        id: string
        wasSuccess: boolean
      }>
    ) {
      const data = action.payload
      state.items &&
        state.items.forEach(item => {
          if (item.id === data.id) {
            item.wasSuccess = data.wasSuccess
          }
        })
    },
    itemWasError(
      state,
      action: PayloadAction<{
        id: string
        wasError: boolean
      }>
    ) {
      const data = action.payload
      state.items &&
        state.items.forEach(item => {
          if (item.id === data.id) {
            item.wasError = data.wasError
          }
        })
    },
    clearSuccess(state) {
      state.wasSuccess = false
    }
  }
})
