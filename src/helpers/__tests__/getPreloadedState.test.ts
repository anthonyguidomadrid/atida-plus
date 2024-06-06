import { CommonState } from '~domains/page/slices/common'
import { getPreloadedState } from '~helpers/getPreloadedState'

const reduxStateMock = {
  server: {
    translations: {
      namespaces: { en: { common: { isLoading: true } } }
    },
    page: {
      common: {
        isLoading: false,
        wasSuccess: true,
        wasError: false
      }
    }
  }
}

const commonStateMock = {
  isLoading: false,
  wasSuccess: true,
  wasError: false,
  footer: {
    importantLinks: {
      title: 'Page Footer - Important Links',
      items: [
        {
          id: 'About us',
          link: {
            label: 'About us',
            url: 'https://about.atida.com',
            content: ''
          }
        }
      ]
    }
  }
} as CommonState

const preloadedStateMock = {
  server: {
    translations: {
      namespaces: { en: { common: { isLoading: true } } }
    },
    page: {
      common: {
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        footer: {
          importantLinks: {
            title: 'Page Footer - Important Links',
            items: [
              {
                id: 'About us',
                link: {
                  label: 'About us',
                  url: 'https://about.atida.com',
                  content: ''
                }
              }
            ]
          }
        }
      }
    }
  }
}

describe(getPreloadedState, () => {
  it('returns the preloaded state with the injected initial Redux Store if passed', () => {
    expect(getPreloadedState(reduxStateMock, commonStateMock)).toStrictEqual(
      preloadedStateMock
    )
  })
  it('returns the preloaded state without the injected initial Redux Store if passed an empty object', () => {
    expect(getPreloadedState(reduxStateMock, {} as CommonState)).toStrictEqual(
      reduxStateMock
    )
  })
})
