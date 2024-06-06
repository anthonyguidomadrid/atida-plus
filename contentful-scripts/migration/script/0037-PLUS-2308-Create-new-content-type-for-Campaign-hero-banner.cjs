module.exports = function (migration, context) {
  const campaignHeroBanner = migration.createContentType('campaignHeroBanner', {
    name: 'Campaign Hero Banner',
    description: 'A banner for those campaigns like Black Friday or Christmas'
  })

  campaignHeroBanner
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  campaignHeroBanner
    .createField('altTitle')
    .name('Alternative title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  campaignHeroBanner
    .createField('description')
    .name('Description')
    .type('RichText')
    .localized(true)
    .required(false)
    .validations([
      {
        nodes: {}
      }
    ])
    .disabled(false)
    .omitted(false)

  campaignHeroBanner
    .createField('finishingDate')
    .name('Finishing date and time')
    .type('Date')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  campaignHeroBanner
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  campaignHeroBanner
    .createField('url')
    .name('URL')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  campaignHeroBanner
    .createField('backgroundColor')
    .name('Background color')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkContentType: ['color']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

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
          'campaignHeroBanner',
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
