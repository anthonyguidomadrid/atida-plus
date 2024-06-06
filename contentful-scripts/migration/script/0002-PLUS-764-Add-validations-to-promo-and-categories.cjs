module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.editField('id').validations([
    {
      unique: true
    },
    {
      regexp: {
        pattern: '^[a-z0-9\\.]*$',
        flags: 'g'
      },
      message: 'The ID only allows: lowercase letters, numbers and dots'
    }
  ])

  promotion
    .createField('label')
    .name('Label')
    .type('Link')
    .linkType('Entry')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['translation']
      }
    ])
    .disabled(false)
    .omitted(false)

  const category = migration.editContentType('category')

  category.editField('id').validations([
    {
      unique: true
    },
    {
      regexp: {
        pattern: '^[a-z0-9\\_]*$',
        flags: 'g'
      },
      message: 'The ID only allows: lowercase letters, numbers and underscores'
    }
  ])
}
