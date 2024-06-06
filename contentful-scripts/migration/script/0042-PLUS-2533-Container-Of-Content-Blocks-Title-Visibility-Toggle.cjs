module.exports = function (migration, context) {
  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )

  containerOfContentBlocks
    .createField('displayTitleOnFrontEnd')
    .name('Display title on front-end?')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  containerOfContentBlocks
    .moveField('displayTitleOnFrontEnd')
    .afterField('title')
}
