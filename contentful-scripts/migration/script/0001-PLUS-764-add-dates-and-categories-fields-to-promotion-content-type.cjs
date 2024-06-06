module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion
    .createField('validFrom')
    .type('Date')
    .name('Valid from')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  promotion
    .createField('validTo')
    .type('Date')
    .name('Valid to')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  promotion
    .createField('categories')
    .type('Array')
    .name('Categories')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['category']
        }
      ],
      linkType: 'Entry'
    })
}
