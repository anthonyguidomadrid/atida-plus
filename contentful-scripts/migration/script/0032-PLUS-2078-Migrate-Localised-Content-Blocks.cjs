module.exports = async function (migration, context) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')
  migration.transformEntries({
    contentType: 'page',
    from: ['contentBlocks'],
    to: ['contentBlocks'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      let newReferencedContentBlocks = []

      if (currentLocale === fn.getDefaultLocale()) {
        return
      }

      let referencedContentBlocks = fromFields['contentBlocks']
      if (referencedContentBlocks !== undefined) {
        let arrayOfEnReference = referencedContentBlocks[fn.getDefaultLocale()]
        let arrayOfEnReferenceLength = arrayOfEnReference?.length ?? 0

        for (let i = 0; i < arrayOfEnReferenceLength; i++) {
          if (arrayOfEnReference[i]?.sys?.id !== undefined) {
            newReferencedContentBlocks.push({
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
        contentBlocks: newReferencedContentBlocks
      }
    }
  })
}
