module.exports = function (migration, context) {
  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )

  exponeaRecommendation.editField('type').validations([
    {
      in: ['Homepage', 'PDP1', 'PDP2', 'COP', 'SearchWithNoResultsPage']
    }
  ])
}
