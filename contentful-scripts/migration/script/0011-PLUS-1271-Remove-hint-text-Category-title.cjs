module.exports = function (migration, context) {
  const category = migration.editContentType('category')

  category.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: ''
  })
}
