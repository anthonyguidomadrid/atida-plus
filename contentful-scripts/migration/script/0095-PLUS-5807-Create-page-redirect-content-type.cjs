module.exports = function (migration, context) {
  const pageRedirect = migration.createContentType('pageRedirect', {
    name: 'Page redirect',
    description:
      'The purpose of this content type is to facilitate 301 redirects',
    displayField: 'slug'
  })

  pageRedirect
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        regexp: {
          pattern: '^[a-z0-9-/_]+$',
          flags: 'g'
        },
        message:
          'The slug only allows: lowercase letters, numbers, hyphens, underscores and forward slashes'
      }
    ])
    .disabled(false)
    .omitted(false)

  pageRedirect
    .createField('redirectTo')
    .name('Redirect to')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['link', 'page']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')
}
