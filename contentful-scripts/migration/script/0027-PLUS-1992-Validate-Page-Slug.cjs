module.exports = function (migration, context) {
  const page = migration.editContentType('page')

  page.editField('slug').validations([
    {
      unique: true
    },
    {
      regexp: {
        // tests: https://regexr.com/660ir
        pattern: '^[a-z0-9-/_]+$',
        flags: 'g'
      },
      message:
        'The slug only allows: lowercase letters, numbers, hyphens, underscores and forward slashes'
    }
  ])
}
