module.exports = function (migration, context) {
  const brand = migration.createContentType('brand', {
    name: 'Brand'
  })

  const page = migration.editContentType('page')

  brand
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  brand
    .createField('id')
    .name('ID')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false)

  brand
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  page
    .createField('brand')
    .name('Brand')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['brand']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')
}
