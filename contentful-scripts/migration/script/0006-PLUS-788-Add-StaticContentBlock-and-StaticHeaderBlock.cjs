module.exports = function (migration, context) {
  const staticContentBlock = migration.createContentType('staticContentBlock', {
    name: 'Static content block',
    description: 'Create static content block with rich text editor'
  })
  const staticHeaderBlock = migration.createContentType('staticHeaderBlock', {
    name: 'Static header block',
    description: 'Create static header with a title'
  })
  const page = migration.editContentType('page')

  staticContentBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  staticContentBlock
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(true)
    .required(true)
    .validations([
      {
        nodes: {}
      }
    ])
    .disabled(false)
    .omitted(false)

  staticHeaderBlock
    .createField('title')
    .name('Title')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  page.editField('contentBlocks').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'categoryGrid',
          'contentBlockWithImage',
          'heroBanner',
          'promotion',
          'uspsCard',
          'staticContentBlock',
          'staticHeaderBlock'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
