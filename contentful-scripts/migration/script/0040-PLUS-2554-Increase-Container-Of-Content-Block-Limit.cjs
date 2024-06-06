module.exports = function (migration, context) {
  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )

  containerOfContentBlocks.editField('contentBlocks').validations([
    {
      size: {
        min: 2,
        max: 6
      },
      message:
        'You should add at least 2 items. Due to current technical limitations, you cannot add more than 6 items.'
    }
  ])
}
