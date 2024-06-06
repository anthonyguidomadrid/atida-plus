module.exports = function (migration, context) {
  const translationInfoLabel = migration.createContentType(
    'translationInfoLabel',
    {
      name: 'Translation Info Label',
      description:
        'Configurable translations for Info Labels with icon and colors',
      displayField: 'title'
    }
  )

  translationInfoLabel
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  translationInfoLabel
    .createField('labelKey')
    .name('Key')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false)

  translationInfoLabel
    .createField('translation')
    .name('Translation')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  translationInfoLabel
    .createField('textColor')
    .name('Text Color')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['color']
      }
    ])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)

  translationInfoLabel
    .createField('backgroundColor')
    .name('Background Color')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['color']
      }
    ])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)

  translationInfoLabel
    .createField('icon')
    .name('Icon')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['icon']
      }
    ])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)
}
