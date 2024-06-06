module.exports = function (migration) {
  const groupOfStaticContentBlocks = migration.editContentType(
    'groupOfStaticContentBlocks'
  )

  groupOfStaticContentBlocks
    .createField('type')
    .name('Type')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Accordion', 'Bullet points', 'Slider']
      }
    ])
    .disabled(false)
    .omitted(false)

  groupOfStaticContentBlocks
    .editField('staticContentBlocks')
    .name('Static Content blocks')
    .type('Array')
    .localized(true)
    .required(true)
    .validations([
      {
        size: {
          max: 20
        },
        message: 'Maximum 20 blocks'
      }
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['staticContentBlock', 'contentBlockWithImage']
        }
      ],
      linkType: 'Entry'
    })

  const staticContentBlock = migration.editContentType('staticContentBlock')

  staticContentBlock
    .createField('icon')
    .name('Icon')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['icon']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

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
        'PlusLarge',
        'PaymentBizum',
        'Box',
        'Lock',
        'FastDelivery',
        'Gift',
        'Facebook',
        'Instagram',
        'Linkedin',
        'Pinterest',
        'TikTok',
        'Twitter',
        'YouTube',
        'TagsGreen',
        'WalletGreen',
        'ClaimedRewardGreen'
      ]
    }
  ])

  groupOfStaticContentBlocks.changeFieldControl('type', 'builtin', 'dropdown', {
    helpText:
      'For Accordion, use 0-20 Static Content Blocks; For Slider and Bullet points, use 0-3 Content Blocks With Image'
  })
}
