import type { DeepPartial } from '@reduxjs/toolkit'
import { memo, ReactNode } from 'react'
import { Provider } from 'react-redux'
import isEqual from 'react-fast-compare'
import { RootState } from '../reducers'
import { useCreateReduxStore } from './store'

type ReduxProviderProps = {
  preloadedState?: DeepPartial<RootState>
  locale: string
  children?: ReactNode
}

export const ReduxProvider = memo(function ReduxProvider({
  preloadedState,
  locale,
  children,
  ...props
}: ReduxProviderProps) {
  const store = useCreateReduxStore(preloadedState, locale)

  return (
    <Provider store={store} {...props}>
      {children}
    </Provider>
  )
},
isEqual)
