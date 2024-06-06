module.exports = async function (migration) {
  const categoryTile = migration.editContentType('categoryTile')

  categoryTile
    .createField('titleColor')
    .name('Title color')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkContentType: ['color']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  categoryTile.changeFieldControl('titleColor', 'builtin', 'entryLinkEditor', {
    helpText:
      "Optional. This will set a color for the title. Also the title weight will be 'bold' if you assign a color"
  })
}
