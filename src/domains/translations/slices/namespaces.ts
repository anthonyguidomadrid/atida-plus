import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { hasOwnProperty } from '~helpers'
import { hydrate } from '~domains/redux/actions'

type Language = string
type LanguageState = Record<Namespace, NamespaceState>

type Namespace = string
type NamespaceState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

type NamespacesState = Record<Language, LanguageState>

type CommonPayload = { language: Language; namespace: Namespace }

const initialState: NamespacesState = {}

// handles setting up the state object for language/namespace pair
const populateState = (
  state: NamespacesState,
  { language, namespace }: CommonPayload
) => {
  if (!state[language]) {
    state[language] = {}
  }

  state[language][namespace] = {
    isLoading: false,
    wasSuccess: false,
    wasError: false
  }
}

export const namespacesSlice = createSlice({
  name: 'translations/namespaces',
  initialState,
  reducers: {
    trigger(state, action: PayloadAction<CommonPayload>) {
      populateState(state, action.payload)
    },
    request(state, action: PayloadAction<CommonPayload>) {
      const { language, namespace } = action.payload

      if (!state[language]?.[namespace]) populateState(state, action.payload)

      state[language][namespace].isLoading = true
    },
    success(state, action: PayloadAction<CommonPayload>) {
      const { language, namespace } = action.payload

      if (!state[language]?.[namespace]) populateState(state, action.payload)

      state[language][namespace].wasSuccess = true
    },
    failure(state, action: PayloadAction<CommonPayload & { message: string }>) {
      const { language, namespace, message } = action.payload

      if (!state[language]?.[namespace]) populateState(state, action.payload)

      state[language][namespace].wasError = true
      state[language][namespace].error = message
    },
    fulfill(state, action: PayloadAction<CommonPayload>) {
      const { language, namespace } = action.payload

      if (!state[language]?.[namespace]) populateState(state, action.payload)

      state[language][namespace].isLoading = false
    }
  },
  extraReducers: builder => {
    builder.addCase(hydrate, (_state, action) => {
      if (
        typeof action.payload === 'object' &&
        hasOwnProperty(action.payload, 'translations') &&
        typeof action.payload.translations === 'object' &&
        hasOwnProperty(action.payload.translations, 'namespaces')
      ) {
        return action.payload.translations.namespaces as NamespacesState
      }
    })
  }
})
