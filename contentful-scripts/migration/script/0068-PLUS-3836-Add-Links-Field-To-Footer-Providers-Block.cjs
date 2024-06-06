module.exports = function (migration, context) {
  const footerProvidersBlock = migration.editContentType('footerProvidersBlock')

  footerProvidersBlock
    .createField('links')
    .name('Links')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 1,
          max: 10
        }
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['link']
        }
      ],
      linkType: 'Entry'
    })
    .disabled(false)
    .omitted(false)
}
