module.exports = async function (migration) {
  const page = migration.editContentType('page')

  page.editField('contentBlocks').items({
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
          'staticRecommendationBlock'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
