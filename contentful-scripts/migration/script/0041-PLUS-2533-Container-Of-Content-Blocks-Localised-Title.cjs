module.exports = function (migration, context) {
  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )

  containerOfContentBlocks.editField('title').localized(true)
}
