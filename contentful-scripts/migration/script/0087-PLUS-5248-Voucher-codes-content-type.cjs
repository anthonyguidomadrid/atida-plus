module.exports = function (migration, context) {
  const voucherCodes = migration.createContentType('voucherCodes', {
    name: 'Voucher Codes',
    displayField: 'title',
    description: 'List of Single Voucher Codes'
  })

  voucherCodes
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  voucherCodes
    .createField('voucherCodes')
    .name('Voucher codes')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 1,
          max: 3
        }
      }
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['voucherCode']
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
          'slider',
          'heroBanner',
          'campaignHeroBanner',
          'promotion',
          'staticContentBlock',
          'staticHeaderBlock',
          'topBrands',
          'uspsCard',
          'linkBlock',
          'voucherCodes'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
