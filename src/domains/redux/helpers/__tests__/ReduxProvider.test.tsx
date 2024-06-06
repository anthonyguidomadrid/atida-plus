import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ReduxProvider } from '~domains/redux'

jest.mock('react-redux', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react')
  return {
    __esModule: true,
    Provider: jest.fn().mockImplementation(({ store, children }) =>
      React.createElement(
        'div',
        {
          'data-mock-redux-provider': true,
          'data-preloaded-state': JSON.stringify(store.getState())
        },
        children
      )
    )
  }
})

describe('ReduxProvider', () => {
  const preloadedState = {
    server: {
      translations: {
        namespaces: { en: { common: { isLoading: true } } }
      }
    }
  }

  it('passes the store to the provider', () => {
    render(
      <ReduxProvider locale="en-gb" preloadedState={preloadedState}>
        <div>Some content</div>
      </ReduxProvider>
    )
    expect(Provider).toHaveBeenCalledWith(
      expect.objectContaining({
        store: expect.objectContaining({
          dispatch: expect.any(Function)
        })
      }),
      {}
    )
  })

  it('returns the original children wrapped in the redux provider component', () => {
    render(
      <ReduxProvider locale="en-gb" preloadedState={preloadedState}>
        <div>Some content</div>
      </ReduxProvider>
    )
    expect(screen.getByText('Some content').parentNode).toHaveAttribute(
      'data-mock-redux-provider'
    )
    expect(screen.getByText('Some content').parentNode).toHaveAttribute(
      'data-preloaded-state',
      expect.stringContaining(
        JSON.stringify(preloadedState.server.translations)
      )
    )
  })
})
