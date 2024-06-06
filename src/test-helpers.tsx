import { render } from '@testing-library/react'
import { createStore } from '@reduxjs/toolkit'
import type { DeepPartial, PreloadedState, Store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { FunctionComponent, ReactNode } from 'react'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { rootReducer, RootState } from '~domains/redux/reducers'
import { setupServer, SetupServerApi } from 'msw/node'
import { rest } from 'msw'
import { resultsMultipleProducts } from '~domains/algolia/__mocks__/results'
import { FeatureFlagsProvider } from '~components/helpers/FeatureFlags'
import { FeatureFlags } from '~components/helpers/FeatureFlags/context'

export const renderWithStore = (
  ui: JSX.Element,
  {
    initialState = {},
    store = createStore(rootReducer, initialState),
    ...renderOptions
  }: {
    initialState?: PreloadedState<RootState>
    store?: Store<RootState>
  } = {}
): ReturnType<typeof render> => {
  const Wrapper: FunctionComponent<{ children?: ReactNode }> = ({
    children
  }) => <Provider store={store}>{children}</Provider>

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export const renderWithStoreAndFeatureFlags = (
  ui: JSX.Element,
  {
    initialState = {},
    store = createStore(rootReducer, initialState),
    featureFlags = {},
    ...renderOptions
  }: {
    initialState?: PreloadedState<RootState>
    featureFlags?: FeatureFlags
    store?: Store<RootState>
  } = {}
): ReturnType<typeof render> => {
  const Wrapper: FunctionComponent<{ children?: ReactNode }> = ({
    children
  }) => (
    <FeatureFlagsProvider value={featureFlags ?? {}}>
      <Provider store={store}>{children}</Provider>
    </FeatureFlagsProvider>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export const renderWithMockedStore = (
  ui: JSX.Element,
  {
    initialState = {},
    store = configureStore<DeepPartial<RootState>>([])(initialState),
    ...renderOptions
  }: {
    initialState?: PreloadedState<RootState>
    store?: MockStoreEnhanced<DeepPartial<RootState>>
  } = {}
) => {
  const Wrapper: FunctionComponent<{ children?: ReactNode }> = ({
    children
  }) => <Provider store={store}>{children}</Provider>

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }), store }
}
export const renderWithMockedStoreAndFeatureFlags = (
  ui: JSX.Element,
  {
    initialState = {},
    store = configureStore<DeepPartial<RootState>>([])(initialState),
    featureFlags = {},
    ...renderOptions
  }: {
    initialState?: PreloadedState<RootState>
    featureFlags?: FeatureFlags
    store?: MockStoreEnhanced<DeepPartial<RootState>>
  } = {}
) => {
  const Wrapper: FunctionComponent<{ children?: ReactNode }> = ({
    children
  }) => (
    <FeatureFlagsProvider value={featureFlags ?? {}}>
      <Provider store={store}>{children}</Provider>
    </FeatureFlagsProvider>
  )

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }), store }
}

export const serverSetup = (): SetupServerApi =>
  setupServer(
    rest.post(/.*algolia.*/, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(resultsMultipleProducts))
    )
  )

export const setWindowSize = ({
  height,
  width
}: {
  width?: number
  height?: number
}) => {
  if (height) {
    Object.defineProperty(window, 'innerHeight', {
      value: height
    })
  }
  if (width) {
    Object.defineProperty(window, 'innerWidth', {
      value: width
    })
  }
}
