module.exports = function (migration, context) {
  const page = migration.editContentType('page')

  page.editField('contentBlocks').validations([
    {
      size: {
        min: 0,
        max: 20
      },
      message:
        'Due to current technical limitations, you cannot add more than 20 content blocks to a single page.'
    }
  ])
}
