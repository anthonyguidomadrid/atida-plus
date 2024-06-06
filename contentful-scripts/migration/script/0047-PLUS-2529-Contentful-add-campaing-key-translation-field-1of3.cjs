module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.editField('description').validations([
    {
      nodes: {}
    },
    {
      enabledNodeTypes: [
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'heading-6',
        'ordered-list',
        'unordered-list',
        'hr',
        'blockquote',
        'embedded-entry-block',
        'embedded-asset-block',
        'hyperlink',
        'entry-hyperlink',
        'asset-hyperlink',
        'embedded-entry-inline'
      ],
      message:
        'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, link to entry, link to asset, and inline entry nodes are allowed'
    },
    {
      enabledMarks: ['bold', 'italic', 'underline', 'code'],
      message: 'Only bold, italic, underline, and code marks are allowed'
    }
  ])

  promotion
    .createField('translations')
    .name('Translations')
    .type('Array')
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          min: 1,
          max: 2
        },
        message:
          "You need to add a 'promo' translation with the same ID and eventually a 'campaign' translation"
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['translation']
        }
      ],
      linkType: 'Entry'
    })
    .disabled(false)
    .omitted(false)
}
