module.exports = function (migration) {
  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )

  exponeaRecommendation
    .createField('altTitle')
    .name('Alternative Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  exponeaRecommendation.changeFieldControl(
    'altTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title will be displayed for non-personalised exponea recommendations.'
    }
  )
}
