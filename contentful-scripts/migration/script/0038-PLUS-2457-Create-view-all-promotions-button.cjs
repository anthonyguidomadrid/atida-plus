module.exports = function (migration, context) {
  const linkBlock = migration.createContentType('linkBlock', {
    name: 'Link Block',
    description: 'A content block for displaying a button'
  })

  linkBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  linkBlock
    .createField('link')
    .name('Link')
    .type('Link')
    .localized(true)
    .required(true)
    .validations([
      {
        linkContentType: ['link']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  linkBlock
    .createField('isCTA')
    .name('Is CTA')
    .type('Boolean')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

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
          'uspsCard',
          'linkBlock'
        ]
      }
    ],
    linkType: 'Entry'
  })

  const icon = migration.editContentType('icon')

  icon.editField('iconReference').validations([
    {
      unique: true
    },
    {
      in: [
        'DeliveryCorreosExpress',
        'DeliveryCorreos',
        'DeliveryDhl',
        'DeliveryEnvialia',
        'DeliveryGls',
        'DeliveryHermes',
        'DeliverySeur',
        'Mail24',
        'NavAdvice24',
        'Parcel24',
        'PaymentAmazon',
        'PaymentIDeal',
        'PaymentMastercard',
        'PaymentPaypal',
        'PaymentSepa',
        'PaymentSofort',
        'PaymentVisa',
        'PaymentMBWay',
        'PaymentMultibanco',
        'PaymentMaestro',
        'QualityEcommerceDelAno',
        'QualityEhi',
        'QualityETrustedShops',
        'QualityGetestetDe',
        'QualitySsl',
        'Return24',
        'Telephone24',
        'Pin24',
        'Checkmark',
        'Percentage',
        'Shop',
        'Faq',
        'Blog',
        'Label',
        'PlusLarge'
      ]
    }
  ])
}
