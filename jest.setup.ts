import '@testing-library/jest-dom/extend-expect'

jest.mock('axios')
jest.mock('redis')
jest.mock('axios-cache-adapter')

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return children
    }
  }
})

jest.mock('next/router', () => {
  return {
    __esModule: true,
    default: {
      push: jest.fn()
    },
    useRouter: jest.fn().mockImplementation(() => ({
      locale: 'en-gb',
      back: jest.fn(),
      asPath: '/'
    }))
  }
})

jest.mock('next/config', () => () => {
  const indexes = {
    'en-gb': 'index-en-gb',
    'pt-pt': 'index-pt-pt',
    'es-es': 'index-es-es'
  }
  return {
    publicRuntimeConfig: {
      defaultLocale: 'en-gb',
      enabledLocales: ['pt-pt', 'es-es'],
      availableLocales: ['en-gb', 'pt-pt', 'es-es', 'de-de'],
      foreignRedirectionLocales: ['fr-fr'],
      routes: [
        {
          route: 'basket', // this maps to next.js page
          translations: {
            de: '/de/korb', // this is what the customer actually sees in the address bar
            'en-gb': '/basket',
            es: '/es/cesta'
          }
        },
        {
          route: 'product/:sku',
          translations: {
            de: '/de/produkt/:sku',
            'en-gb': '/product/:sku',
            es: '/es/producto/:sku'
          }
        },
        {
          route: 'product/:sku/add',
          translations: {
            de: '/de/produkt/:sku/hinzufugen',
            'en-gb': '/product/:sku/add',
            es: '/es/producto/:sku/anadir'
          }
        },
        {
          route: ':id/:name/user',
          translations: {
            de: '/de/:id/:name/nutzer',
            'en-gb': '/:id/:name/user',
            es: '/es/:id/:name/usuario'
          }
        }
      ],
      host: 'somehost.com',
      algolia: {
        appId: 'someAppId',
        apiKey: 'someApiKey',
        productIndexes: indexes,
        suggestionIndexes: indexes,
        categoryIndexes: indexes
      },
      logLevel: 'fatal',
      FEATURE_FAVOURITES: 'true',
      IP_ADDRESS_LOOKUP_URL: 'https://api.ipify.org/?format=json',
      cookieProScriptIds: {
        'pt-pt': 'cookieProIdPT',
        'es-es': 'cookieProIdES',
        'en-gb': 'cookieProIdPT'
      },
      yotpoAppIds: {
        'pt-pt': 'yotpoPtAppId',
        'es-es': 'yotpoEsAppId',
        'en-gb': 'yotpoGbAppId'
      },
      trustedShopsIds: {
        'pt-pt': 'trustedShopsPtId',
        'es-es': 'trustedShopsEsId',
        'en-gb': 'trustedShopsGbId'
      },
      exponeaProjectToken: {
        'pt-pt': 'someProjectToken-PT',
        'es-es': 'someProjectToken-ES',
        'en-gb': 'someProjectToken-GB'
      },
      optimizelyProjectId: 'someProjectId',
      rtbHouseProjectId: 'someProjectId',
      IPAddressLookupUrl: 'SomeIPAddressLookupURL',
      socialAuthenticate: {
        facebook: {
          oAuthUrl: 'SomeFacebookOauthUrl',
          clientId: 'SomeFacebookClientId'
        },
        google: {
          oAuthUrl: 'SomeGoogleOauthUrl',
          clientId: 'SomeGoogleClientId'
        },
        apple: {
          oAuthUrl: 'SomeAppleOauthUrl',
          clientId: 'SomeAppleClientId'
        },
        redirectUri: 'SomeRedirectUri'
      }
    },
    serverRuntimeConfig: {
      host: 'somehost.com',
      cacheControlProfile: 'public',
      jwtCookieDomain: 'somejwtcookiedomain.com',
      cmsToken: 'some-access-token',
      cmsSpaceId: 'some-space',
      cmsEnvironmentId: 'some-environment',
      ecommerceHost: {
        'en-gb': 'spryker.co.uk',
        'pt-pt': 'spryker.pt',
        'es-es': 'spryker.es'
      },
      elasticSearch: {
        host: 'elasticsearch.com',
        username: 'something',
        password: 'something-else',
        indexes: {
          product: indexes,
          urlMap: {
            'en-gb': 'url-index-en-gb',
            'pt-pt': 'url-index-pt-pt',
            'es-es': 'url-index-es-es'
          }
        }
      },
      paymentsBaseURL: 'payment-plus',
      exponea: {
        projectToken: {
          'pt-pt': 'someProjectToken-PT',
          'es-es': 'someProjectToken-ES',
          'en-gb': 'someProjectToken-GB'
        },
        apiKey: 'someApiKey',
        apiSecret: 'someApiSecret',
        defaultRecommendation: {
          'pt-pt': 'someDefaultRecommendationPT',
          'es-es': 'someDefaultRecommendationES',
          'en-gb': 'someDefaultRecommendationGB'
        },
        defaultCustomer: 'someDefaultCustomer'
      },
      redisHost: 'some-redis',
      redisPort: '6379',
      redisAuth: 'some-redis-auth',
      geoCode: {
        baseUrl: 'HereGeoCodeBaseUrl',
        apiKey: 'HereGeoCodeApiKey'
      },
      ledgerBaseUrl: 'someLedgerBaseUrl'
    }
  }
})

jest.mock('next/dynamic', () => () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DynamicComponent = (props: any) => {
    const testId = props?.['data-testid'] ?? 'dynamic component'
    return React.createElement('div', { 'data-testid': testId })
  }
  DynamicComponent.displayName = 'LoadableComponent'
  DynamicComponent.preload = jest.fn()
  return DynamicComponent
})

jest.mock('react-i18next', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react')
  return {
    __esModule: true,
    useTranslation: jest.fn().mockImplementation(() => ({
      t: (text: string, values: Record<string, string | number>) =>
        `${text}${values ? ` ${Object.values(values).join(',')}` : ''}`
    })),
    Trans: jest
      .fn()
      .mockImplementation(({ i18nKey, values }) =>
        React.createElement(
          'span',
          {},
          `${i18nKey}${values ? ` ${Object.values(values).join(',')}` : ''}`
        )
      ),
    I18nextProvider: jest
      .fn()
      .mockImplementation(({ children }) =>
        React.createElement(
          'div',
          { 'data-mock-i18next-provider': true },
          children
        )
      )
  }
})

jest.mock('~domains/translated-routes/config/translated-routes')

jest.mock('~domains/translations/helpers/i18n')

jest.mock('./src/helpers/apiClient')

jest.mock('./src/helpers/storage')

jest.mock('~helpers/server-only/featureFlagClient')

jest.mock('~helpers/getHash')
