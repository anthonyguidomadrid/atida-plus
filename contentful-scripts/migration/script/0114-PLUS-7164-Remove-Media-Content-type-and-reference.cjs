module.exports = async function (migration) {
  const categoryTile = migration.editContentType('categoryTile')
  categoryTile.editField('image').deleted(true)

  const heroBanner = migration.editContentType('heroBanner')
  heroBanner.editField('image').deleted(true)
}
