module.exports = function (migration) {
  const page = migration.editContentType('page')

  page.deleteField('brand')
  page.deleteField('category')
  page.deleteField('promotion')
}
