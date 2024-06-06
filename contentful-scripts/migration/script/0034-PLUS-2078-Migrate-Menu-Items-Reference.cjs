module.exports = async function (migration, context) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')

  migration.transformEntries({
    contentType: 'menu',
    from: ['items'],
    to: ['items'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      let newReferencedItems = []

      if (currentLocale === fn.getDefaultLocale()) {
        return
      }

      let referencedItems = fromFields['items']
      if (referencedItems !== undefined) {
        let arrayOfEnReference = referencedItems[fn.getDefaultLocale()]
        let arrayOfEnReferenceLength = arrayOfEnReference?.length ?? 0

        for (let i = 0; i < arrayOfEnReferenceLength; i++) {
          if (arrayOfEnReference[i]?.sys?.id !== undefined) {
            newReferencedItems.push({
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: arrayOfEnReference[i].sys.id
              }
            })
          }
        }
      }

      return {
        items: newReferencedItems
      }
    }
  })
}
