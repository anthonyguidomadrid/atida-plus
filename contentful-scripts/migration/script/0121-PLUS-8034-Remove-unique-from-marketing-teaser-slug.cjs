module.exports = async function (migration, context) {
  const marketingTeaser = migration.editContentType('marketingTeaser')

  marketingTeaser.editField('slug').validations([])
}
