module.exports = async function (migration, context) {
  const page = migration.editContentType('page', {
    name: 'Page',
    description: 'All content-based pages on the site.',
    displayField: 'title'
  })
  page
    .editField('contentBlocks')
    .name('Content blocks')
    .type('Array')
    .localized(true)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([
      {
        size: { min: 1, max: 26 },
        message:
          'Due to current technical limitations, you cannot add more than 26 content blocks to a single page.'
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: [
            'campaignHeroBanner',
            'category',
            'categoryGrid',
            'containerOfContentBlocks',
            'contentBlockWithImage',
            'exponeaRecommendation',
            'groupOfStaticContentBlocks',
            'heroBanner',
            'linkBlock',
            'promotion',
            'slider',
            'staticContentBlock',
            'staticHeaderBlock',
            'topBrands',
            'uspsCard',
            'voucherCodes',
            'staticRecommendationBlock',
            'expertSignature'
          ]
        }
      ],
      linkType: 'Entry'
    })
}
