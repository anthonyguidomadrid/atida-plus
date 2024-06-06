module.exports = function (migration, context) {
  const filterItem = migration.editContentType('filterItem')

  filterItem.editField('itemToFilterBy').validations([
    {
      linkContentType: ['category', 'translation', 'translationInfoLabel']
    }
  ])
}
