import { getDefaultLocale, getListOfUsedLocales } from '../helpers/index.mjs'

/**
 * @return {Promise<{slider: {mode: number, unique: string, locale: *}, filterItem: {mode: number, unique: string, locale: *}, color: {mode: number, unique: null, locale: null}, categoryGrid: {mode: number, unique: string, locale: string}, icon: {mode: number, unique: string, locale: *}, link: {mode: number, unique: null, locale: null}, pageRedirect: {mode: number, unique: null, locale: null}, pageFooter: {mode: number, unique: string, locale: *}, media: {mode: number, unique: null, locale: null}, richTextTranslation: {mode: number, unique: string, locale: *}, contentfulAsset: {mode: number, unique: null, locale: null}, categoryCop: {mode: number, unique: string, locale: *}, containerOfContentBlocks: {mode: number, unique: null, locale: null}, marketingTeaser: {mode: number, unique: null, locale: null}, usp: {mode: number, unique: null, locale: null}, exponeaRecommendation: {mode: number, unique: null, locale: null}, voucherCodes: {mode: number, unique: string, locale: *}, deliverySteps: {mode: number, unique: string, locale: *}, seo: {mode: number, unique: string, locale: string}, brand: {mode: number, unique: string, locale: *}, voucherCode: {mode: number, unique: string, locale: *}, heroBanner: {mode: number, unique: string, locale: *}, linkBlock: {mode: number, unique: null, locale: null}, translationInfoLabel: {mode: number, unique: null, locale: null}, address: {mode: number, unique: string, locale: *}, campaignHeroBanner: {mode: number, unique: null, locale: null}, staticTextPage: {mode: number, unique: null, locale: null}, categoryTile: {mode: number, unique: string, locale: string}, menu: {mode: number, unique: string, locale: *}, menuItem: {mode: number, unique: string, locale: *}, staticHeaderBlock: {mode: number, unique: null, locale: null}, topBrands: {mode: number, unique: null, locale: null}, staticRecommendationBlock: {mode: number, unique: null, locale: null}, filterCollection: {mode: number, unique: null, locale: null}, organization: {mode: number, unique: string, locale: *}, uspsCard: {mode: number, unique: null, locale: null}, translation: {mode: number, unique: null, locale: null}, page: {mode: number, unique: string, locale: string}, staticContentBlock: {mode: number, unique: string, locale: string}, category: {mode: number, unique: string, locale: *}, footerProvidersBlock: {mode: number, unique: string, locale: string}, contentBlockWithImage: {mode: number, unique: null, locale: null}, groupOfStaticContentBlocks: {mode: number, unique: string, locale: string}, promotion: {mode: number, unique: null, locale: null}}>}
 */
export async function syncEnvConf() {
  return {
    // -------------------------------
    // --- UPDATE IF 'FROM' UPDATED
    // -------------------------------
    page: {
      mode: 3, // update only if different
      unique: 'slug',
      locale: getListOfUsedLocales().join(',')
    },
    brand: {
      mode: 3, // update only if different
      unique: 'id',
      locale: getDefaultLocale()
    },
    seo: {
      mode: 3, // update only if different
      unique: 'title',
      locale: getListOfUsedLocales().join(',')
    },
    // -------------------------------------
    // --- UPDATE EXISTING NO MATTER WHAT
    // -------------------------------------
    address: {
      mode: 2, // update existing
      unique: 'id',
      locale: getDefaultLocale()
    },
    category: {
      mode: 2, // update existing
      unique: 'id',
      locale: getDefaultLocale()
    },
    categoryCop: {
      mode: 2, // update existing
      unique: 'title',
      locale: getDefaultLocale()
    },
    categoryGrid: {
      mode: 2, // update existing
      unique: 'title',
      locale: getListOfUsedLocales().join(',')
    },
    categoryTile: {
      mode: 2, // update existing
      unique: 'title',
      locale: getListOfUsedLocales().join(',')
    },
    icon: {
      mode: 2, // update existing
      unique: 'iconReference',
      locale: getDefaultLocale()
    },
    pageFooter: {
      mode: 2, // update existing
      unique: 'id',
      locale: getDefaultLocale()
    },
    richTextTranslation: {
      mode: 2, // update existing
      unique: 'key',
      locale: getDefaultLocale()
    },
    deliverySteps: {
      mode: 2, // update existing
      unique: 'title',
      locale: getDefaultLocale()
    },
    filterItem: {
      mode: 2,
      unique: 'filterItemName',
      locale: getDefaultLocale()
    },
    footerProvidersBlock: {
      mode: 2, // update existing
      unique: 'title',
      locale: getListOfUsedLocales().join(',')
    },
    groupOfStaticContentBlocks: {
      mode: 2, // update existing
      unique: 'title',
      locale: getListOfUsedLocales().join(',')
    },
    heroBanner: {
      mode: 2, // update existing
      unique: 'id',
      locale: getDefaultLocale()
    },
    menu: {
      mode: 2, // updated existing
      unique: 'title',
      locale: getDefaultLocale()
    },
    menuItem: {
      mode: 2, // update existing
      unique: 'id',
      locale: getDefaultLocale()
    },
    organization: {
      mode: 2, // update existing
      unique: 'id',
      locale: getDefaultLocale()
    },
    slider: {
      mode: 2, // update existing
      unique: 'name',
      locale: getDefaultLocale()
    },
    staticContentBlock: {
      mode: 2, // update existing
      unique: 'title',
      locale: getListOfUsedLocales().join(',')
    },
    voucherCodes: {
      mode: 2, // update existing
      unique: 'title',
      locale: getDefaultLocale()
    },
    voucherCode: {
      mode: 2, // update existing
      unique: 'code',
      locale: getDefaultLocale()
    },
    // ------------------------
    // --- ALWAYS INSERT NEW
    // ------------------------
    // contentfulAsset is not a real content-type, but
    // it's needed to sync the assets between environment
    contentfulAsset: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    campaignHeroBanner: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    color: {
      mode: 1, // insert only new
      unique: null, //'colorReference',
      locale: null
    },
    contentBlockWithImage: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    link: {
      mode: 1, //insert only new
      unique: null,
      locale: null
    },
    linkBlock: {
      mode: 1, //insert only new
      unique: null,
      locale: null
    },
    staticTextPage: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    usp: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    uspsCard: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    staticHeaderBlock: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    translation: {
      mode: 1, // insert only new
      unique: null, //'key',
      locale: null
    },
    marketingTeaser: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    containerOfContentBlocks: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    filterCollection: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    topBrands: {
      mode: 1, // insert only new
      unique: null,
      locale: null
    },
    // ---------------------
    // --- ALWAYS NO-SYNC
    // ---------------------
    promotion: {
      mode: 0,
      unique: null,
      locale: null
    },
    translationInfoLabel: {
      mode: 0,
      unique: null,
      locale: null
    },
    media: {
      mode: 0,
      unique: null,
      locale: null
    },
    exponeaRecommendation: {
      mode: 0,
      unique: null,
      locale: null
    },
    staticRecommendationBlock: {
      mode: 0,
      unique: null,
      locale: null
    },
    pageRedirect: {
      mode: 0,
      unique: null,
      locale: null
    }
  }
}
