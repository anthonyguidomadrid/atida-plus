module.exports = function (migration, context) {
  const organization = migration.createContentType('organization', {
    name: 'Organization',
    description:
      'Models the Atida organization for a country, for example Atida PT, Atida ES. Populates Organization structured data on all pages (https://schema.org/Organization).',
    displayField: 'name'
  })

  organization
    .createField('name')
    .name('Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  organization
    .createField('description')
    .name('Description')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  organization.changeFieldControl('description', 'builtin', 'multipleLine', {
    helpText:
      'With the exception of en-GB, you only need to enter values for the locales relevant to that country. For example, pt-PT only requires values for en-GB and pt-PT.'
  })

  organization
    .createField('telephone')
    .name('Telephone')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  organization
    .createField('email')
    .name('Email')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  organization
    .createField('sameAs')
    .name('Same as')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({ type: 'Symbol', validations: [] })

  organization
    .createField('imageUrl')
    .name('Image URL')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  organization
    .createField('id')
    .name('ID')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([{ unique: true }])
    .disabled(false)
    .omitted(false)

  organization.changeFieldControl('id', 'builtin', 'slugEditor', {
    trackingFieldId: 'name',
    helpText:
      'This will be automatically generated from the organization name, you can enter a custom value if you need to override it.'
  })
}
