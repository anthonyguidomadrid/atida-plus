module.exports = function (migration, context) {
  const seo = migration.editContentType('seo')

  seo
    .createField('slug')
    .name('Page slug')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false)
}
