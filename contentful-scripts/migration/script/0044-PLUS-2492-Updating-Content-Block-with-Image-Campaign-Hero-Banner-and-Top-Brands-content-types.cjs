module.exports = async function (migration, context) {
  const fn = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )
  const contentBlockWithImage = migration.editContentType(
    'contentBlockWithImage'
  )

  contentBlockWithImage
    .createField('header')
    .name('Header')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  contentBlockWithImage
    .createField('imageOnTheLeft')
    .name('Image on the left')
    .type('Boolean')
    .localized(true)
    .defaultValue(fn.getDefaultValuesForLocales(false))
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  const campaignHeroBanner = migration.editContentType('campaignHeroBanner')
  campaignHeroBanner.displayField('title')
  campaignHeroBanner.editField('finishingDate').required(false)

  const topBrands = migration.editContentType('topBrands')
  topBrands.displayField('title')
}
