module.exports = function (migration, context) {
  const exponeaRecommendation = migration.createContentType(
    'exponeaRecommendation',
    {
      name: 'Exponea recommendation',
      displayField: 'title',
      description: "Includes the Id of the Exponea's recommendation"
    }
  )

  const page = migration.editContentType('page')

  exponeaRecommendation
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  exponeaRecommendation
    .createField('recommendationId')
    .name('Recommendation Id')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  page.editField('contentBlocks').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'category',
          'categoryGrid',
          'contentBlockWithImage',
          'exponeaRecommendation',
          'heroBanner',
          'promotion',
          'staticContentBlock',
          'staticHeaderBlock',
          'uspsCard'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
