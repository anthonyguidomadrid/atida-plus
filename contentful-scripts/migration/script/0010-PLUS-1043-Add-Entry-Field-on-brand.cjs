module.exports = function (migration, context) {
  migration.editContentType('brand', {
    displayField: 'title'
  })
}
