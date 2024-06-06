module.exports = function (migration) {
  const groupOfStaticContentBlocks = migration.createContentType(
    'groupOfStaticContentBlocks',
    {
      name: 'Group of Static Content Blocks',
      description:
        'Enables to group several static content blocks into one block of content. This can be used to define the content of dynamic components like accordions, where different sections of content are included on the same block.',
      displayField: 'title'
    }
  )

  groupOfStaticContentBlocks
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  groupOfStaticContentBlocks
    .createField('staticContentBlocks')
    .name('Static Content blocks')
    .type('Array')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['staticContentBlock']
        }
      ],
      linkType: 'Entry'
    })
}
