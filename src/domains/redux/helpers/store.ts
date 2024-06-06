import { configureStore } from '@reduxjs/toolkit'
import type {
  DeepPartial,
  EnhancedStore,
  AnyAction,
  Middleware
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import createReduxWaitForMiddleware from 'redux-wait-for-action'
import { useMemo, useRef } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { hydrate } from '../actions'
import { rootReducer, RootState } from '../reducers'
import { rootSaga } from '../sagas'

let store:
  | EnhancedStore<RootState, AnyAction, Middleware<RootState>[]>
  | undefined

const createConfiguredStore = (
  locale?: string,
  preloadedState: DeepPartial<RootState> = {}
) => {
  const reduxSagaMonitorOptions = {
    context: {
      locale
    }
  }
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const middlewares = [sagaMiddleware, createReduxWaitForMiddleware()]

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({ thunk: false }).concat(middlewares)
  })

  sagaMiddleware.run(rootSaga)

  return store
}

export const createReduxStore = (
  locale?: string,
  preloadedState?: DeepPartial<RootState>
) => {
  const _store = store ?? createConfiguredStore(locale, preloadedState)

  if (preloadedState && store) {
    store = undefined
  }

  if (typeof window === 'undefined') {
    if (preloadedState) {
      _store.dispatch(hydrate(preloadedState.server))
    }

    return _store
  }

  if (!store) {
    store = _store
  }

  /* hot-reloading of reducers when in development */
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { rootReducer } = require('../reducers')
      store?.replaceReducer(rootReducer)
    })
  }
  return _store
}

export const useCreateReduxStore = (
  preloadedState: DeepPartial<RootState> = {},
  locale: string
) => {
  const firstRender = useRef(true)
  const store = useMemo(() => createReduxStore(locale, preloadedState), [
    locale,
    preloadedState
  ])

  useDeepCompareEffect(() => {
    if (!firstRender.current) {
      store.dispatch(hydrate(preloadedState.server))
    }

    firstRender.current = false
  }, [preloadedState])

  return store
}
