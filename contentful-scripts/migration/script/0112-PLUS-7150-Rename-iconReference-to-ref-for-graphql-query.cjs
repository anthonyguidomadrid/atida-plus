module.exports = async function (migration) {
  const icon = migration.editContentType('icon')

  // Crete the new field
  icon
    .createField('ref')
    .name('Icon reference')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
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
          'ClaimedRewardGreen',
          'CoinsBalanceGreen',
          'Coins'
        ]
      }
    ])
    .disabled(false)
    .omitted(false)

  // Migrate content
  migration.transformEntries({
    contentType: 'icon',
    from: ['iconReference'],
    to: ['ref'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      if (
        fromFields !== undefined &&
        fromFields['iconReference'] !== undefined &&
        fromFields['iconReference'][currentLocale] !== undefined
      ) {
        return {
          ref: fromFields['iconReference'][currentLocale]
        }
      }
    }
  })

  // Disable previous Icon Reference
  icon.editField('iconReference').disabled(true).omitted(true)

  // Change 'ref' as dropdown
  icon.changeFieldControl('ref', 'builtin', 'dropdown', {
    helpText: 'It defines the icon name that represents the entry'
  })

  // Change 'ref' as title
  migration.editContentType('icon', {
    name: 'Icon',
    description: 'A reference to an SVG icon defined by the front-end theme.',
    displayField: 'ref'
  })
}
