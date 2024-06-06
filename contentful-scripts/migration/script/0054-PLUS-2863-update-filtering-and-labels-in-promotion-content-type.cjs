module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.changeFieldId('categoriesForFiltering', 'itemsToFilterBy')
  promotion.changeFieldControl('itemsToFilterBy', 'builtin', 'tagEditor', {
    helpText:
      "Please provide a list of the id's of the Categories or keys of the Labels referenced to the promotion, e.g.: 'beauty' or 'campaign-promo.black-friday'"
  })
  promotion
    .editField('itemsToFilterBy')
    .name('Items to Filter By')
    .localized(false)
  promotion.changeFieldId('translations', 'labels')
  promotion.editField('labels').name('Labels')
  promotion.editField('label').omitted(true)
}
