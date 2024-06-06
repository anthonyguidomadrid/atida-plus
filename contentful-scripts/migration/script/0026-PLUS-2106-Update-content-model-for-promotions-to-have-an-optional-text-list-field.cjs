module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion
    .createField('categoriesForFiltering')
    .name('Categories for filtering')
    .type('Array')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',
      validations: []
    })
}
