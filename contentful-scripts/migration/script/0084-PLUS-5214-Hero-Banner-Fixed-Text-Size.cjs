module.exports = function (migration) {
  const heroBanner = migration.editContentType('heroBanner')

  heroBanner.editField('title').name('Rich Text Title')

  heroBanner.editField('title').validations([
    {
      enabledMarks: ['bold', 'italic', 'underline', 'code'],
      message: 'Only bold, italic, underline, and code marks are allowed'
    },
    {
      enabledNodeTypes: [
        'ordered-list',
        'unordered-list',
        'hr',
        'blockquote',
        'hyperlink',
        'entry-hyperlink',
        'asset-hyperlink'
      ],
      message:
        'Only ordered list, unordered list, horizontal rule, quote, link to URL, link to entry and link to asset nodes are allowed'
    },
    {
      nodes: {}
    }
  ])

  heroBanner.editField('text').validations([
    {
      enabledMarks: ['bold', 'italic', 'underline', 'code'],
      message: 'Only bold, italic, underline, and code marks are allowed'
    },
    {
      enabledNodeTypes: [
        'ordered-list',
        'unordered-list',
        'hr',
        'blockquote',
        'hyperlink',
        'entry-hyperlink',
        'asset-hyperlink'
      ],
      message:
        'Only ordered list, unordered list, horizontal rule, quote, link to URL, link to entry and link to asset nodes are allowed'
    },
    {
      nodes: {}
    }
  ])

  heroBanner.changeFieldControl('title', 'builtin', 'richTextEditor', {
    helpText: `Important: please do not use this field. For the Hero Banner title use the 'Title' field since this field doesn't allow headings and its use is deprecated`
  })

  heroBanner
    .createField('newTitle')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  heroBanner.changeFieldControl('newTitle', 'builtin', 'singleLine', {
    helpText: `This is the title that will be shown in the Hero Banner. Important: please use this one instead of the 'Rich Text Title' since that one doesn't allow headings and its use is deprecated`
  })

  heroBanner.moveField('newTitle').beforeField('title')
}
