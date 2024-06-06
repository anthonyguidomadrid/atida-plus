module.exports = function (migration, context) {
  const menuItem = migration.editContentType('menuItem')

  menuItem.description(
    'A Menu Item is living as part of a Menu. It contains an ID, a Link (which is a reference to a Page or a Link content type) and an optional Submenu and title. The Submenu is a reference to a Menu, for modelling nested Menus. The title is an alternative to the linked pages title (for SEO purposes).'
  )

  menuItem
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
}
