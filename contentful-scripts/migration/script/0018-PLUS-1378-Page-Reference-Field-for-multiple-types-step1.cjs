module.exports = function (migration, context) {
  const page = migration.editContentType('page')

  page
    .createField('pageType')
    .name('Page Type')
    .type('Symbol')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([
      {
        in: ['Category', 'Promotion', 'Brand']
      }
    ])

  page
    .createField('referencedContent')
    .name('Referenced Content')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['brand', 'category', 'promotion']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  page.editField('category').omitted(true)

  page.editField('promotion').omitted(true)

  page.editField('brand').omitted(true)

  page.moveField('pageType').afterField('slug')
  page.moveField('referencedContent').afterField('pageType')
  page.moveField('category').afterField('seo')
  page.moveField('brand').afterField('category')
  page.moveField('promotion').afterField('brand')
}
