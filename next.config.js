const runtimeConfig = require('./runtimeConfig')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const {
  defaultLocale,
  availableLocales,
  allAvailableLocales,
  enabledLocales,
  allEnabledLocales,
  foreignRedirectionLocales,
  domainPerLocale,
  routes,
  aliases,
  sitemaps
} = require('./src/domains/translated-routes/config')
const { svgRules } = require('./webpack.config')
const getEnvObject = require('./getEnvObject')
const path = require('path')

/**
 * It matches a domain, ignoring http(s) and www,
 * but considering the full domain with locale.
 * This has to match what is in the .env file
 * variable `ROUTE_DOMAIN_WITH_LOCALE`
 *
 * Examples:
 *  - https://uat.atida.com -> uat.atida.com
 *  - https://www.dev.atida.de -> dev.atida.de
 *  - http://sparmed.de -> sparmed.de
 *  - http://localhost:3000/ -> localhost:3000
 *
 * @param {string} currentHost
 * @param {string} routeDomain
 * @return {boolean}
 */
const isHostWithLocale = (currentHost, routeDomain) => {
  if (!routeDomain) return false

  let domainWithLocale = routeDomain.split('|')[0] ?? ''
  let locale = routeDomain.split('|')[1]

  if (domainWithLocale.length > 0 && locale !== undefined) {
    const regex = /(http)?[s]?(:\/\/)?(www\.)?(.*[^\W])(\/)?/gi
    const matches = regex.exec(currentHost)

    if (matches !== null && matches[4] === domainWithLocale) {
      return true
    }
  }

  return false
}

/**
 * In the .env file it has to have a variable `ROUTE_DOMAIN_WITH_LOCALE`
 * That contains the domain (ie: atida.com) without http(s) or www,
 * and a locale lowercase (ie: de-de). The variable looks like:
 *  - ROUTE_DOMAIN_WITH_LOCALE="atida.de|de-de"
 *
 * @param {String} currentHost
 * @param {String} routeDomain
 * @return {[{defaultLocale: string, locales: string[], domain: string, http: boolean}]|undefined}
 */
const getDomainRedirect = (currentHost, routeDomain) => {
  if (isHostWithLocale(currentHost, routeDomain)) {
    const domainWithLocale = routeDomain.split('|')[0] ?? ''
    const confDefaultLocale = routeDomain.split('|')[1] ?? 'en-gb'

    return [
      {
        domain: domainWithLocale,
        defaultLocale: confDefaultLocale,
        locales: [confDefaultLocale],
        http: true
      }
    ]
  }

  return undefined
}

const createUrl = (locale, route) =>
  `${
    !isHostWithLocale(process.env.HOST, process.env.ROUTE_DOMAIN_WITH_LOCALE) &&
    locale !== defaultLocale
      ? `/${locale}`
      : ''
  }/${route}`

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  webpack5: true,
  swcMinify: true,
  experimental: {
    esmExternals: false,
    images: { allowFutureImage: true }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  i18n: {
    locales: availableLocales,
    defaultLocale,
    localeDetection: !isHostWithLocale(
      process.env.HOST,
      process.env.ROUTE_DOMAIN_WITH_LOCALE
    ),
    domains: getDomainRedirect(
      process.env.HOST,
      process.env.ROUTE_DOMAIN_WITH_LOCALE
    )
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sandbox-atida.bynder.com'
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net'
      }
    ],
    domains: ['sandbox-atida.bynder.com', 'images.ctfassets.net'],
    formats: ['image/avif', 'image/webp']
  },
  serverRuntimeConfig: {
    host: process.env.HOST,
    segmentStore: process.env.SEGMENT_STORE,
    segmentWriteKey: process.env.SEGMENT_WRITE_KEY,
    cacheControlProfile: process.env.CACHE_CONTROL_PROFILE,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT ?? '6379',
    redisAuth: process.env.REDIS_AUTH,
    cmsHost: process.env.CMS_HOST,
    cmsPreviewHost: process.env.CMS_PREVIEW_HOST,
    cmsGraphQLHost: process.env.CMS_GRAPHQL_HOST,
    cmsSpaceId: process.env.CMS_SPACE_ID,
    cmsEnvironmentId: process.env.CMS_ENVIRONMENT_ID,
    cmsToken: process.env.CMS_TOKEN,
    cmsPreviewToken: process.env.CMS_PREVIEW_TOKEN,
    cmsWebhookStorage: process.env.CMS_WEBHOOK_STORAGE,
    ecommerceHost: getEnvObject('ECOMMERCE_HOST'),
    elasticSearch: {
      host: process.env.ELASTICSEARCH_BASE_URL,
      username: process.env.ELASTICSEARCH_BASICAUTH_USERNAME,
      password: process.env.ELASTICSEARCH_BASICAUTH_PASSWORD,
      indexes: {
        urlMap: getEnvObject('ELASTICSEARCH_INDEXES_URLMAP'),
        product: getEnvObject('ELASTICSEARCH_INDEXES_PRODUCT')
      }
    },
    paymentsBaseURL: process.env.PAYMENTS_BASE_URL,
    jwtCookieDomain: process.env.JWT_COOKIE_DOMAIN,
    exponea: {
      projectToken: getEnvObject('EXPONEA_PROJECT_TOKEN_LIST'),
      apiKey: getEnvObject('EXPONEA_API_KEY_LIST'),
      apiSecret: getEnvObject('EXPONEA_SECRET_LIST'),
      defaultRecommendation: process.env.EXPONEA_DEFAULT_RECOMMENDATION_ID,
      defaultCustomer: process.env.EXPONEA_DEFAULT_CUSTOMER,
      timeout: process.env.EXPONEA_TIMEOUT
    },
    geoCode: {
      baseUrl: process.env.GEOCODE_BASE_URL,
      apiKey: process.env.GEOCODE_API_KEY
    },
    ledgerBaseUrl: process.env.LEDGER_BASE_URL
  },
  publicRuntimeConfig: {
    ...runtimeConfig,
    defaultLocale,
    availableLocales,
    allAvailableLocales,
    enabledLocales,
    allEnabledLocales,
    foreignRedirectionLocales,
    domainPerLocale,
    routes
  },
  async rewrites() {
    /**
     * the purpose of this is to rewrite translated urls, e.g. /de-de/korb into a url next.js can understand, e.g. /de-de/basket.
     * The rewrite won't be visible to the customer, they will only be aware of the translated route: /de-de/korb
     */
    const routeRewrites = routes.flatMap(({ route, translations }) =>
      Object.keys(translations).map(locale => ({
        source: translations[locale],
        destination: createUrl(locale, route),
        locale: false
      }))
    )

    const sitemapRewrites = sitemaps.reduce((prev, curr) => {
      const rewrites = curr.items.map(item => {
        return {
          source: `${
            !isHostWithLocale(
              process.env.HOST,
              process.env.ROUTE_DOMAIN_WITH_LOCALE
            ) && curr.locale !== defaultLocale
              ? `/${curr.locale}`
              : ''
          }/${item}`,
          destination: `/${item}`,
          locale: false
        }
      })
      return [...prev, ...rewrites]
    }, [])

    return [...routeRewrites, ...sitemapRewrites]
  },
  async redirects() {
    /**
     * the purpose of this is to redirect our internal next.js routes, e.g. /de-de/basket to the customer-friendly translated
     * version, e.g. /de-de/korb. The redirect will be visible to the customer, but a customer accessing a url such as /de-de/basket
     * should be a very rare edge-case. Canonical links should be set up on all pages in addition to the permanent redirect.
     */
    const translatedRouteRedirects = routes.flatMap(({ route, translations }) =>
      Object.keys(translations).map(locale => ({
        source: createUrl(locale, route),
        destination: translations[locale],
        locale: false,
        permanent: true
      }))
    )

    const localeAliasRedirects = Object.entries(aliases).flatMap(
      ([locale, localeAliases]) =>
        localeAliases.map(alias => ({
          source: alias,
          destination: locale,
          locale: false,
          permanent: true
        }))
    )

    return [...translatedRouteRedirects, ...localeAliasRedirects]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  },
  webpack: (config, { isServer, webpack }) => {
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes(
          path.resolve(__dirname, 'src', 'polyfills.js')
        )
      ) {
        entries['main.js'].unshift(
          path.resolve(__dirname, 'src', 'polyfills.js')
        )
      }

      return entries
    }

    config.module.rules = [
      ...config.module.rules,
      // https://github.com/eemeli/yaml/issues/208#issuecomment-720504241
      { test: /\.js$/, type: 'javascript/auto' },
      ...svgRules
    ]

    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /\/services|server-only\//
        })
      )
      // https://github.com/vercel/next.js/issues/7755#issuecomment-812805708
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      }
    }

    config.externals = [
      ...config.externals,
      {
        newrelic: 'newrelic'
      }
    ]

    return config
  }
})
