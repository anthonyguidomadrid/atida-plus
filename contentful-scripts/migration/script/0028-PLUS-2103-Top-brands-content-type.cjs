module.exports = function (migration, context) {
  const topBrands = migration.createContentType('topBrands', {
    name: 'Top Brands'
  })

  topBrands
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  topBrands
    .createField('brands')
    .name('Brands')
    .type('Array')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['brand']
        }
      ],
      linkType: 'Entry'
    })

  const page = migration.editContentType('page')

  page.editField('contentBlocks').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'category',
          'categoryGrid',
          'containerOfContentBlocks',
          'contentBlockWithImage',
          'exponeaRecommendation',
          'heroBanner',
          'promotion',
          'staticContentBlock',
          'staticHeaderBlock',
          'topBrands',
          'uspsCard'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
