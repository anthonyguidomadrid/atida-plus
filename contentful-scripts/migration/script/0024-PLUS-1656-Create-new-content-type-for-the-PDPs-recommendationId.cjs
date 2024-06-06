module.exports = function (migration, context) {
  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )

  exponeaRecommendation
    .createField('type')
    .name('Type')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        in: ['Homepage', 'PDP']
      }
    ])
    .disabled(false)
    .omitted(false)

  exponeaRecommendation.editField('recommendationId').localized(true)

  exponeaRecommendation.changeFieldControl('type', 'builtin', 'dropdown', {
    helpText: 'There should only be one recommendation for each type.'
  })
}
