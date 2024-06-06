module.exports = async function (migration, context) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')

  const defaultLocaleKey = fn.getDefaultLocale() // this will return 'en-GB'

  const expertSignature = migration.createContentType('expertSignature', {
    name: 'Expert Signature',
    description: 'Block used to create expert signatures for PDP',
    displayField: 'name'
  })

  expertSignature
    .createField('categories')
    .name('categories')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['category']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  expertSignature
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  expertSignature
    .createField('name')
    .name('Name')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  expertSignature
    .createField('jobTitle')
    .name('Job Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  expertSignature
    .createField('jobDescription')
    .name('Job Description')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

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
          'staticRecommendationBlock',
          'expertSignature'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
