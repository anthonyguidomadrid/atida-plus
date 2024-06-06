module.exports = function (migration, context) {
  migration.transformEntries({
    contentType: 'brand',
    from: ['id'],
    to: ['id'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      if (
        fromFields !== undefined &&
        fromFields['id'] !== undefined &&
        fromFields['id'][currentLocale] !== undefined
      ) {
        let originalId = fromFields['id'][currentLocale]
        let cleanedId = ''

        cleanedId = originalId.toLowerCase().replace(/[^a-z0-9._-]+/, '')
        return {
          id: cleanedId
        }
      }
    }
  })

  const brand = migration.editContentType('brand')

  brand.editField('id').validations([
    {
      unique: true
    },
    {
      regexp: {
        pattern: '^[a-z0-9\\.\\-\\_]*$',
        flags: 'g'
      },
      message:
        'The ID only allows: lowercase letters, numbers, dashes, underscore and dots'
    }
  ])
}
