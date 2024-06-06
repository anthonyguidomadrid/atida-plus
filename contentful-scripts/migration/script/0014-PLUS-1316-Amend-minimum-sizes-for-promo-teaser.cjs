module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.editField('teaserImage').validations([
    {
      linkMimetypeGroup: ['image']
    },
    {
      assetFileSize: {
        min: null,
        max: 1048576
      },
      message:
        'The image you are trying to upload is more than 1MB - please minify it'
    }
  ])

  promotion.moveField('teaserImage').afterField('teaserType')

  promotion.changeFieldControl('teaserType', 'builtin', 'boolean', {
    helpText:
      'A teaser comes in two types: Content on the left with image on the right (portrait) and Full-width image (landscape)',
    trueLabel: 'Content with image',
    falseLabel: 'Full-width image'
  })
}
