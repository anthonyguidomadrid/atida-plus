module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion
    .createField('promoInformation')
    .name('Promo information (For Product Detail Page)')
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
}
