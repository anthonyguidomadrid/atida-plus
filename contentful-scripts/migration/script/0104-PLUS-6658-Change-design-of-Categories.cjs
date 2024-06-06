module.exports = async function (migration) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')
  const defaultLocaleKey = fn.getDefaultLocale()

  const categoryGroup = migration.editContentType('categoryGrid', {
    name: 'Category Group',
    description:
      'Shows a group of Category Tiles (prev. Category Grid). Now it can be shown as a slider or a grid',
    displayField: 'title'
  })

  categoryGroup
    .createField('viewType')
    .name('View Type')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Slider', 'Grid']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Slider'
    })
    .disabled(false)
    .omitted(false)

  categoryGroup.changeFieldControl('viewType', 'builtin', 'dropdown', {
    helpText: 'By default it will be a Slider'
  })
}
