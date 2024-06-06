module.exports = function (migration, context) {
  const page = migration.editContentType('page')

  page.editField('contentBlocks').localized(true)
}
