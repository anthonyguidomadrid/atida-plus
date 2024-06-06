module.exports = function (migration) {
  const seo = migration.editContentType('seo')

  seo
    .createField('canonicalLink')
    .name('Canonical link')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkContentType: ['page']
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  seo.changeFieldControl('canonicalLink', 'builtin', 'entryLinkEditor', {
    helpText:
      'Use this field to redefine <link rel="canonical" href="..." /> of the page and point it to another page. This value will be used instead of the one specified in the Page slug. As a slug cannot be linked directly, only Page can be used as a link'
  })

  seo.moveField('canonicalLink').afterField('slug')
}
