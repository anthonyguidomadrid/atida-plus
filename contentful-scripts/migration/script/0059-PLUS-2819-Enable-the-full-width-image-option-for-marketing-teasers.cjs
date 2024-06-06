module.exports = async function (migration, context) {
  const fn = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )
  const marketingTeaser = migration.editContentType('marketingTeaser')

  marketingTeaser
    .createField('isFullWidthImage')
    .name('Is Full-Width Image')
    .type('Boolean')
    .localized(false)
    .defaultValue(fn.getDefaultValuesForLocales(false))
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  marketingTeaser.moveField('isFullWidthImage').beforeField('image')
}
