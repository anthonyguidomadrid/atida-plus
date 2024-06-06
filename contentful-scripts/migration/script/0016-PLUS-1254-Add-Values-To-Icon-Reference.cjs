module.exports = function (migration, context) {
  const icon = migration.editContentType('icon')

  icon.editField('iconReference').validations([
    {
      unique: true
    },
    {
      in: [
        'DeliveryCorreos',
        'DeliveryDhl',
        'DeliveryEvialia',
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
        'Label'
      ]
    }
  ])
}
