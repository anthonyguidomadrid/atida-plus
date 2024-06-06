module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.editField('id').validations([
    {
      unique: true
    },
    {
      regexp: {
        pattern: '^[a-z0-9\\.\\-]*$',
        flags: 'g'
      },
      message: 'The ID only allows: lowercase letters, numbers, dashes and dots'
    }
  ])
}
