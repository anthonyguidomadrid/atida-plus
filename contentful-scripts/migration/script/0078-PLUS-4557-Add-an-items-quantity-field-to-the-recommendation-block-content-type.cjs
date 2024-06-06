module.exports = function (migration) {
  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )

  exponeaRecommendation
    .createField('itemsQuantity')
    .name('Items Quantity')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        in: ['4', '6', '8', '12']
      }
    ])
    .disabled(false)
    .omitted(false)

  exponeaRecommendation.changeFieldControl(
    'itemsQuantity',
    'builtin',
    'dropdown',
    {
      helpText: 'This indicates how many products will be shown'
    }
  )
}
