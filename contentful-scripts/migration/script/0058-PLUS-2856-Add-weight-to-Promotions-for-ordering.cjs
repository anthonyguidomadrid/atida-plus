module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion
    .createField('weight')
    .name('Weight')
    .type('Integer')
    .required(false)
    .localized(false)
    .disabled(false)
    .omitted(false)
    .validations([
      {
        unique: true
      },
      {
        range: {
          min: 1,
          max: 1000
        }
      }
    ])

  promotion.moveField('weight').afterField('validTo')

  promotion.changeFieldControl('weight', 'builtin', 'numberEditor', {
    helpText: 'Higher weight brings the promotion on top of the list'
  })
}
