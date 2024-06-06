import { render, screen } from '@testing-library/react'
import { TranslationsProvider } from '../TranslationsProvider'
import { createI18nInstance } from '../i18n'
import { ReduxProvider } from '~domains/redux'

describe('TranslationsProvider', () => {
  it('passes the store, redux store and language to the createI18nInstance function', () => {
    const store = { cimode: { test: 'translation' } }
    render(
      <ReduxProvider locale="en-gb" preloadedState={{}}>
        <TranslationsProvider store={store}>
          <div>Some content</div>
        </TranslationsProvider>
      </ReduxProvider>
    )
    expect(createI18nInstance).toHaveBeenCalledWith({
      resources: store,
      lng: 'en-gb',
      backend: {
        reduxStore: expect.objectContaining({
          dispatch: expect.any(Function)
        })
      }
    })
  })

  it('returns the original children wrapped in the i18n provider component', () => {
    render(
      <ReduxProvider locale="en-gb" preloadedState={{}}>
        <TranslationsProvider store={{}}>
          <div>Some content</div>
        </TranslationsProvider>
      </ReduxProvider>
    )
    expect(screen.getByText('Some content').parentNode).toHaveAttribute(
      'data-mock-i18next-provider'
    )
  })
})
