module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion
    .createField('teaserImage')
    .name('Teaser Image')
    .type('Link')
    .linkType('Asset')
    .required(true)
    .localized(false)
    .disabled(false)
    .omitted(false)
    .validations([
      {
        linkMimetypeGroup: ['image']
      },
      {
        assetImageDimensions: {
          width: {
            min: 200,
            max: null
          },
          height: {
            min: 232,
            max: null
          }
        },
        message: 'The image dimension should be 200x232 or 435x232'
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
      'A teaser comes in two types: Content on the left with image on the right (200x232) and Full-width image (435x232)',
    trueLabel: 'Content with image',
    falseLabel: 'Full-width image'
  })

  promotion.editField('image').name('Header Image')

  const brand = migration.editContentType('brand')

  brand
    .createField('logoImage')
    .name('Logo Image')
    .type('Link')
    .linkType('Asset')
    .required(false)
    .localized(false)
    .disabled(false)
    .omitted(false)
    .validations([
      {
        linkMimetypeGroup: ['image']
      },
      {
        assetImageDimensions: {
          width: {
            min: 75,
            max: null
          },
          height: {
            min: 75,
            max: null
          }
        },
        message:
          'The image should be square with a minimum size of 75x75 (100x100 recommended)'
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
}
