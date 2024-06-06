module.exports = async function (migration, context) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')

  migration.transformEntries({
    contentType: 'promotion',
    from: ['label'],
    to: ['translations'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      let newReferencedTranslations = []

      let referencedLabel = fromFields['label']
      if (referencedLabel !== undefined) {
        let referencedLabelElement = referencedLabel[fn.getDefaultLocale()]

        newReferencedTranslations.push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: referencedLabelElement.sys.id
          }
        })
      }

      return {
        translations: newReferencedTranslations
      }
    }
  })
}
