module.exports = async function (migration, context) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')
  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )

  containerOfContentBlocks
    .editField('displayTitleOnFrontEnd')
    .required(true)
    .defaultValue({
      [fn.getDefaultLocale()]: false
    })

  containerOfContentBlocks
    .createField('hasSmallMargin')
    .name('Has small margin on top?')
    .type('Boolean')
    .required(true)
    .localized(false)
    .disabled(false)
    .omitted(false)
    .validations([])
    .defaultValue({
      [fn.getDefaultLocale()]: true
    })

  containerOfContentBlocks
    .moveField('hasSmallMargin')
    .afterField('displayTitleOnFrontEnd')
}
