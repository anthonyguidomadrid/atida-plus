module.exports = async function (migration) {
  const categoryTile = migration.editContentType('pageFooter')
  categoryTile.editField('id').validations([
    {
      unique: false
    }
  ])
}
