import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Menu } from '~domains/contentful'
import { hydrate } from '~domains/redux/actions'
import { hasOwnProperty } from '~helpers'

export type MenuPayload = {
  menuTitle: string
}

type MenuState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  menu?: Menu | null
}

const initialState: MenuState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  menu: null
}

export const fetchMenuItemCollectionSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<MenuPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<Menu>) {
      const data = action.payload
      if (typeof data !== 'undefined') state.menu = data
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    }
  },
  extraReducers: builder => {
    builder.addCase(hydrate, (_state, action) => {
      if (
        typeof action.payload === 'object' &&
        hasOwnProperty(action.payload, 'menu') &&
        typeof action.payload.menu === 'object' &&
        hasOwnProperty(action.payload.menu, 'menu')
      ) {
        return action.payload.menu['menu'] as MenuState
      }
    })
  }
})
