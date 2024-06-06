module.exports = async function (migration) {
  const fn = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )
  const defaultLocaleValues = fn.getDefaultValuesForLocales(false)
  const seo = migration.editContentType('seo')

  seo
    .createField('noIndex')
    .name('no_index')
    .type('Boolean')
    .localized(true)
    .required(false)
    .validations([])
    .defaultValue(defaultLocaleValues)
    .disabled(false)
    .omitted(false)

  seo
    .createField('noFollow')
    .name('no_follow')
    .type('Boolean')
    .localized(true)
    .required(false)
    .validations([])
    .defaultValue(defaultLocaleValues)
    .disabled(false)
    .omitted(false)

  seo.moveField('noIndex').afterField('title')

  seo.moveField('noFollow').afterField('noIndex')
}
