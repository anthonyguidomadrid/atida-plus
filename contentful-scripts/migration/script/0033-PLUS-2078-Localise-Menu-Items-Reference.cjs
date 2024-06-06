module.exports = function (migration, context) {
  const menu = migration.editContentType('menu')

  menu.editField('items').localized(true)
}
