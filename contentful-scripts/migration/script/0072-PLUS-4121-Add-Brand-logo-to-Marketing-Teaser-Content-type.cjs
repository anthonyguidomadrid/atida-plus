module.exports = function (migration) {
  const marketingTeaser = migration.editContentType('marketingTeaser')

  marketingTeaser
    .createField('logo')
    .name('Brand Logo')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  marketingTeaser.moveField('logo').beforeField('labelText')
}
