const { convert } = require('url-slug')
const {
  fallbackLocale,
  fallbackEnabledLocales,
  fallbackAvailableLocales,
  fallbackForeignRedirectionLocales,
  fallbackAllEnabledLocales,
  fallbackAllAvailableLocales,
  fallbackDomainPerLocale
} = require('./constants')
const getEnvObject = require('../../../../getEnvObject')

const getBrandsNameFromLocale = locale => {
  switch (locale) {
    case 'pt-pt':
      return 'marcas'
    case 'es-es':
      return 'marcas'
    case 'de-de':
      return 'marken'
    case 'de-at':
      return 'marken'
    case 'it-it':
      return 'marche'
    case 'fr-fr':
      return 'marques'
    default:
      return 'brands'
  }
}

const getPromotionsNameFromLocale = locale => {
  switch (locale) {
    case 'pt-pt':
      return 'promoções'
    case 'es-es':
      return 'promociones'
    case 'de-de':
      return 'werbeaktionen'
    case 'de-at':
      return 'werbeaktionen'
    case 'it-it':
      return 'promozioni'
    case 'fr-fr':
      return 'promotions'
    default:
      return 'promotions'
  }
}

const getCategoriesNameFromLocale = locale => {
  switch (locale) {
    case 'pt-pt':
      return 'categorias'
    case 'es-es':
      return 'categorias'
    case 'de-de':
      return 'kategorien'
    case 'de-at':
      return 'kategorien'
    case 'it-it':
      return 'categorie'
    case 'fr-fr':
      return 'catégories'
    default:
      return 'categories'
  }
}

const getLoyaltyNameFromLocale = locale => {
  switch (locale) {
    case 'pt-pt':
      return 'beneficios'
    case 'es-es':
      return 'ventajas'
    case 'de-de':
      return 'loyalität' // TODO
    case 'de-at':
      return 'loyalität' // TODO
    default:
      return 'loyalty'
  }
}

const getPrescriptionNameFromLocale = locale => {
  switch (locale) {
    case 'de-de':
      return 'verschreibung'
    case 'de-at':
      return 'verschreibung'
    default:
      return 'prescription'
  }
}

const defaultLocale =
  process.env.CMS_LOCALE_DEFAULT?.toLowerCase() ?? fallbackLocale

const enabledLocales =
  process.env.CMS_LOCALE_USED_LIST?.toLowerCase()?.split(',') ??
  fallbackEnabledLocales
const allEnabledLocales =
  process.env.FULL_ENABLED_LOCALES_LIST?.toLowerCase()?.split(',') ??
  fallbackAllEnabledLocales

const availableLocales =
  process.env.CMS_LOCALE_USED_LIST?.toLowerCase()?.split(',') ??
  fallbackAvailableLocales
const allAvailableLocales =
  process.env.FULL_ENABLED_LOCALES_LIST?.toLowerCase()?.split(',') ??
  fallbackAllAvailableLocales

!availableLocales.includes(defaultLocale) &&
  availableLocales?.unshift(defaultLocale)
!allAvailableLocales.includes(defaultLocale) &&
  allAvailableLocales?.unshift(defaultLocale)

const foreignRedirectionLocales =
  process.env.CMS_LOCALE_FOREIGN_REDIRECTION_LIST?.toLowerCase()?.split(',') ??
  fallbackForeignRedirectionLocales

const domainPerLocale = process.env.CMS_DOMAIN_PER_LOCALE
  ? getEnvObject('CMS_DOMAIN_PER_LOCALE')
  : fallbackDomainPerLocale

const sitemaps = enabledLocales?.map(function (locale) {
  const usePrefix = locale !== 'pt-pt'
  const prefix = usePrefix ? `-${locale.split('-')[0]}` : ''
  const folder = usePrefix ? `sitemaps-${locale.split('-')[0]}/` : ''

  return {
    locale: locale,
    items: [
      `sitemap-index${prefix}.xml`,
      `${folder}sitemap-products.xml`,
      `${folder}sitemap-${getCategoriesNameFromLocale(locale)}.xml`,
      `${folder}sitemap-${getBrandsNameFromLocale(locale)}.xml`
    ]
  }
})

const brandsObject = {}
const promotionsObject = {}
const loyaltyObject = {}
const prescriptionObject = {}
const aliases = {}
allEnabledLocales?.forEach(function (locale) {
  brandsObject[`${locale}`] = `/${locale}/${convert(
    getBrandsNameFromLocale(locale)
  )}`
  promotionsObject[`${locale}`] = `/${locale}/${convert(
    getPromotionsNameFromLocale(locale)
  )}`
  loyaltyObject[`${locale}`] = `/${locale}/${convert(
    getLoyaltyNameFromLocale(locale)
  )}`
  prescriptionObject[`${locale}`] = `/${locale}/${convert(
    getPrescriptionNameFromLocale(locale)
  )}`
  aliases[`/${locale}`] = [`/${defaultLocale}/${locale.substring(3, 5)}`]
})

module.exports = {
  defaultLocale,
  availableLocales,
  allAvailableLocales,
  enabledLocales,
  allEnabledLocales,
  foreignRedirectionLocales,
  domainPerLocale,
  getPromotionsNameFromLocale,
  sitemaps,
  aliases,
  routes: [
    {
      route: 'brands',
      translations: brandsObject
    },
    {
      route: 'promotions',
      translations: promotionsObject
    },
    {
      route: 'loyalty',
      translations: loyaltyObject
    },
    {
      route: 'prescription',
      translations: prescriptionObject
    }
    // EXAMPLE:
    // {
    //   route: 'product/:sku',
    //   translations: {
    //     'pt-pt': '/pt-pt/produtos/:sku',
    //     'en-gb': '/product/:sku'
    //   }
    // }
  ]
}
