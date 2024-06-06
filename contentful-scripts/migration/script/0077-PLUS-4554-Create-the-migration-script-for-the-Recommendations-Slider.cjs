module.exports = async function (migration) {
  const fn = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )
  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )

  exponeaRecommendation
    .createField('isProductSlider')
    .name('Is Product Slider')
    .type('Boolean')
    .localized(true)
    .defaultValue(fn.getDefaultValuesForLocales(false))
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  exponeaRecommendation.changeFieldControl(
    'isProductSlider',
    'builtin',
    'boolean',
    {
      helpText:
        'If true this will be rendered as a product slider instead of a product grid'
    }
  )
}
