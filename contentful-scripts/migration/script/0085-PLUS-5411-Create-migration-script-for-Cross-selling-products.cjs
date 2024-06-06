module.exports = function (migration) {
  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )

  exponeaRecommendation.editField('type').validations([
    {
      in: ['Homepage', 'PDP1', 'PDP2', 'COP', 'Frequently Bought Together']
    }
  ])

  exponeaRecommendation.moveField('altTitle').afterField('title')
}
