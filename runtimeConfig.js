const getEnvObject = require('./getEnvObject')

module.exports = {
  algolia: {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    productIndexes: getEnvObject('ELASTICSEARCH_INDEXES_PRODUCT'),
    suggestionIndexes: getEnvObject('ELASTICSEARCH_INDEXES_SUGGESTION'),
    categoryIndexes: getEnvObject('ELASTICSEARCH_INDEXES_CATEGORIES')
  },
  host: process.env.HOST,
  segmentStore: process.env.SEGMENT_STORE,
  logLevel: process.env.LOG_LEVEL,
  segmentWriteKey: process.env.SEGMENT_WRITE_KEY,
  analyticsFileName: process.env.SEGMENT_ANALYTICS_FILE_NAME,
  luxId: process.env.LUX_ID,
  cookieProScriptIds: getEnvObject('COOKIEPRO_SCRIPT_ID_LIST'),
  yotpoAppIds: getEnvObject('YOTPO_APP_ID_LIST'),
  trustedShopsIds: getEnvObject('TRUSTED_SHOPS_ID_LIST'),
  exponeaProjectToken: getEnvObject('EXPONEA_PROJECT_TOKEN_LIST'),
  optimizelyProjectId: process.env.OPTIMIZELY_PROJECT_ID,
  rtbHouseProjectId: process.env.RTB_HOUSE_PROJECT_ID,
  IPAddressLookupUrl: process.env.IP_ADDRESS_LOOKUP_URL,
  socialAuthenticate: {
    apple: {
      oAuthUrl: process.env.SOCIAL_APPLE_OAUTH_URL,
      clientId: process.env.SOCIAL_APPLE_CLIENT_ID
    },
    facebook: {
      oAuthUrl: process.env.SOCIAL_FACEBOOK_OAUTH_URL,
      clientId: process.env.SOCIAL_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.SOCIAL_FACEBOOK_CLIENT_SECRET
    },
    google: {
      oAuthUrl: process.env.SOCIAL_GOOGLE_OAUTH_URL,
      clientId: process.env.SOCIAL_GOOGLE_CLIENT_ID,
      clientSecret: process.env.SOCIAL_GOOGLE_CLIENT_SECRET
    },
    redirectUri: process.env.SOCIAL_REDIRECT_URI
  },
  newRelicAgentId: process.env.NEW_RELIC_AGENT_ID,
  newRelicAppId: process.env.NEW_RELIC_APPLICATION_ID,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  FEATURE_FAVOURITES: process.env.FEATURE_FAVOURITES,
  FEATURE_INTERESTING_FOR_YOU_PROMO_DETAIL_PAGE:
    process.env.FEATURE_INTERESTING_FOR_YOU_PROMO_DETAIL_PAGE,
  FEATURE_BRAND_LINKS_PROMOTION_DETAIL_PAGE:
    process.env.FEATURE_BRAND_LINKS_PROMOTION_DETAIL_PAGE,
  FEATURE_LOAD_MORE_BUTTON_ON_CHECKOUT:
    process.env.FEATURE_LOAD_MORE_BUTTON_ON_CHECKOUT,
  FEATURE_MULTIPLE_VOUCHERS: process.env.FEATURE_MULTIPLE_VOUCHERS,
  IP_ADDRESS_LOOKUP_URL: process.env.IP_ADDRESS_LOOKUP_URL,
  adyen: {
    clientKey: process.env.ADYEN_CLIENT_KEY,
    gatewayMerchantId: getEnvObject('GATEWAY_MERCHANT_ID_LIST'),
    environment: process.env.ADYEN_ENVIRONMENT,
    googlePayEnvironment: process.env.ADYEN_GOOGLE_PAY_ENVIRONMENT,
    googlePayMerchantId: process.env.ADYEN_GOOGLE_PAY_MERCHANT_ID
  },
  ledgerBaseUrl: process.env.LEDGER_BASE_URL,
  mondialRelay: {
    brand: process.env.MONDIAL_RELAY_BRAND
  },
  brand: process.env.BRAND
}
