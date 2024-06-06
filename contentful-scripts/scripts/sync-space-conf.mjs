import { getDefaultLocale } from '../helpers/index.mjs'

export async function syncSpaceConf() {
  const defaultLocale = getDefaultLocale()

  return {
    address: {
      unique: 'id',
      mode: 2, // update existing
      locale: defaultLocale
    },
    color: {
      unique: 'ref',
      mode: 2, // update existing
      locale: defaultLocale
    },
    deliverySteps: {
      unique: 'title',
      mode: 2, // update existing
      locale: defaultLocale
    },
    icon: {
      unique: 'ref',
      mode: 2, // update existing
      locale: defaultLocale
    },
    linkBlock: {
      unique: 'title',
      mode: 2, // update existing
      locale: defaultLocale
    },
    link: {
      unique: 'label',
      mode: 2, // update existing
      locale: defaultLocale
    },
    organization: {
      unique: 'id',
      mode: 2, // update existing
      locale: defaultLocale
    },
    richTextTranslation: {
      unique: 'key',
      mode: 2, // update existing
      locale: defaultLocale
    },
    translation: {
      unique: 'key',
      mode: 2, // update existing
      locale: defaultLocale
    },
    translationInfoLabel: {
      unique: 'key',
      mode: 2, // update existing
      locale: defaultLocale
    },
    uspsCard: {
      unique: 'title',
      mode: 2, // update existing
      locale: defaultLocale
    },
    usp: {
      unique: 'text',
      mode: 2, // update existing
      locale: defaultLocale
    },
    footerProvidersBlock: {
      unique: 'title',
      mode: 2, // update existing
      locale: defaultLocale
    }
  }
}
