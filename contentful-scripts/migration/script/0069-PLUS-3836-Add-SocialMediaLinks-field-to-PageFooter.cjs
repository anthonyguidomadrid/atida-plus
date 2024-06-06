module.exports = function (migration, context) {
  const pageFooter = migration.editContentType('pageFooter')

  pageFooter
    .createField('socialMediaLinks')
    .name('Social Media Links')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['footerProvidersBlock']
      }
    ])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)

  pageFooter.moveField('socialMediaLinks').afterField('newsletterSellingPoints')
}
