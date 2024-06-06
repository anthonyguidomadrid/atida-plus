import { mapIconReferenceToIconComponent } from '../icon'

const ICONS = [
  'Checkmark',
  'Blog',
  'DeliveryCorreos',
  'DeliveryCorreosExpress',
  'DeliveryDhl',
  'DeliveryEnvialia',
  'DeliveryGls',
  'DeliveryHermes',
  'DeliverySeur',
  'Faq',
  'Label',
  'Mail24',
  'NavAdvice24',
  'Parcel24',
  'Pin24',
  'PaymentAmazon',
  'PaymentIDeal',
  'PaymentMastercard',
  'PaymentPaypal',
  'PaymentSepa',
  'PaymentSofort',
  'PaymentVisa',
  'PaymentMultibanco',
  'PaymentMaestro',
  'PaymentMBWay',
  'PaymentBizum',
  'Percentage',
  'QualityEhi',
  'QualityETrustedShops',
  'QualityGetestetDe',
  'QualitySsl',
  'Return24',
  'Scan24',
  'Shop',
  'Telephone24',
  'GridView',
  'ListView',
  'PlusLarge',
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
  'WalletGreen',
  'ClaimedRewardGreen',
  'TagsGreen',
  'CoinsBalanceGreen'
]

describe(mapIconReferenceToIconComponent, () => {
  ICONS.forEach(icon => {
    it(`maps a ${icon} icon reference to a component`, () => {
      expect(mapIconReferenceToIconComponent(icon).name).toEqual(
        'DynamicComponent'
      )
    })
  })

  it('maps an unknown icon reference to an empty svg', () => {
    expect(mapIconReferenceToIconComponent('UNKNOWN').name).toEqual(
      'UnknownIcon'
    )
  })
})
