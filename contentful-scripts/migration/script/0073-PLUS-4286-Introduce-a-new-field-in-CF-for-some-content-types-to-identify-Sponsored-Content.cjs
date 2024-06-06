module.exports = async function (migration) {
  const fn = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )
  const defaultLocaleValues = fn.getDefaultValuesForLocales(false)

  const promotion = migration.editContentType('promotion')
  const marketingTeaser = migration.editContentType('marketingTeaser')
  const contentBlockWithImage = migration.editContentType(
    'contentBlockWithImage'
  )
  const heroBanner = migration.editContentType('heroBanner')
  const campaignHeroBanner = migration.editContentType('campaignHeroBanner')

  promotion
    .createField('isSponsoredContent')
    .name('Is Sponsored Content')
    .type('Boolean')
    .localized(false)
    .defaultValue(defaultLocaleValues)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  marketingTeaser
    .createField('isSponsoredContent')
    .name('Is Sponsored Content')
    .type('Boolean')
    .localized(false)
    .defaultValue(defaultLocaleValues)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  contentBlockWithImage
    .createField('isSponsoredContent')
    .name('Is Sponsored Content')
    .type('Boolean')
    .localized(false)
    .defaultValue(defaultLocaleValues)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  heroBanner
    .createField('isSponsoredContent')
    .name('Is Sponsored Content')
    .type('Boolean')
    .localized(false)
    .defaultValue(defaultLocaleValues)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  campaignHeroBanner
    .createField('isSponsoredContent')
    .name('Is Sponsored Content')
    .type('Boolean')
    .localized(false)
    .defaultValue(defaultLocaleValues)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  promotion.moveField('isSponsoredContent').beforeField('teaserType')
  marketingTeaser.moveField('isSponsoredContent').beforeField('labelText')
  contentBlockWithImage.moveField('isSponsoredContent').beforeField('image')
  heroBanner.moveField('isSponsoredContent').beforeField('image')
  campaignHeroBanner
    .moveField('isSponsoredContent')
    .beforeField('finishingDate')
}
