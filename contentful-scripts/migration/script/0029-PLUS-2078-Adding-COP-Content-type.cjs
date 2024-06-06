module.exports = function (migration, context) {
  const categoryCop = migration.createContentType('categoryCop', {
    name: 'Category COP',
    description: 'This content type is used to create a Category COP page',
    displayField: 'title'
  })

  categoryCop
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  categoryCop
    .createField('linkedCategory')
    .name('Linked Category')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['category']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')
}
