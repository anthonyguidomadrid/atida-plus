module.exports = async function (migration) {
  const fn = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )
  const page = migration.editContentType('page')

  page
    .createField('isCampaignPage')
    .name('Is this a Campaign Page?')
    .type('Boolean')
    .localized(true)
    .defaultValue(fn.getDefaultValuesForLocales(false))
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  page.changeFieldControl('isCampaignPage', 'builtin', 'boolean', {
    helpText: 'Check this box for campaign landing pages'
  })

  page.moveField('isCampaignPage').afterField('slug')
}
