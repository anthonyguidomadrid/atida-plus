module.exports = function (migration, context) {
  const categoryCop = migration.editContentType('categoryCop')

  categoryCop
    .createField('linkedPromotions')
    .name('Linked Promotions')
    .type('Array')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 4
        }
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['promotion']
        }
      ],
      linkType: 'Entry'
    })
    .disabled(false)
    .omitted(false)
}
