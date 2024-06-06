module.exports = function (migration, context) {
  migration.transformEntries({
    contentType: 'page',
    from: ['promotion', 'brand', 'category'],
    to: ['pageType', 'referencedContent'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      let newPageType = undefined
      let newReferencedContent = undefined

      if (
        fromFields['promotion'] !== undefined &&
        fromFields['promotion'][currentLocale] !== undefined &&
        fromFields['promotion'][currentLocale].sys !== undefined &&
        fromFields['promotion'][currentLocale].sys.id !== undefined
      ) {
        newPageType = 'Promotion'
        newReferencedContent = {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: fromFields['promotion'][currentLocale].sys.id
          }
        }
      }

      if (
        fromFields['brand'] !== undefined &&
        fromFields['brand'][currentLocale] !== undefined &&
        fromFields['brand'][currentLocale].sys !== undefined &&
        fromFields['brand'][currentLocale].sys.id !== undefined
      ) {
        newPageType = 'Brand'
        newReferencedContent = {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: fromFields['brand'][currentLocale].sys.id
          }
        }
      }

      if (
        fromFields['category'] !== undefined &&
        fromFields['category'][currentLocale] !== undefined &&
        fromFields['category'][currentLocale].sys !== undefined &&
        fromFields['category'][currentLocale].sys.id !== undefined
      ) {
        newPageType = 'Category'
        newReferencedContent = {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: fromFields['category'][currentLocale].sys.id
          }
        }
      }

      return {
        pageType: newPageType,
        referencedContent: newReferencedContent
      }
    }
  })
}
