module.exports = function (migration, context) {
  const address = migration.createContentType('address', {
    name: 'Address',
    description: 'Address to be used in the Organization Structured data',
    displayField: 'streetAddress'
  })

  address
    .createField('streetAddress')
    .name('Street Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  address
    .createField('addressLocality')
    .name('Locality')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  address
    .createField('addressRegion')
    .name('Region')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  address
    .createField('postalCode')
    .name('Postal Code')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  address
    .createField('addressCountry')
    .name('Country')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  const organization = migration.editContentType('organization')

  organization
    .createField('address')
    .name('Address')
    .type('Link')
    .linkType('Entry')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['address']
      }
    ])
    .disabled(false)
    .omitted(false)
}
