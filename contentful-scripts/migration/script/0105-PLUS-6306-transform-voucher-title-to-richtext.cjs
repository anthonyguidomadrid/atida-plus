module.exports = function (migration, context) {
  const voucherCode = migration.editContentType('voucherCode', {
    name: 'Voucher Code (single)',
    description: 'Single Voucher code block content',
    displayField: 'code'
  })

  voucherCode
    .createField('newTitle')
    .name('Rich text title')
    .type('RichText')
    .localized(false)
    .required(true)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline', 'code'],
        message: 'Only bold, italic, underline, and code marks are allowed'
      },
      {
        enabledNodeTypes: [
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote'
        ],
        message:
          'Only ordered list, unordered list, horizontal rule, quote are allowed'
      },
      {
        nodes: {}
      }
    ])
    .disabled(false)
    .omitted(false)

  // Removed uniqueness temporarily
  voucherCode.editField('code').validations([])

  voucherCode.moveField('newTitle').beforeField('title')

  voucherCode.editField('title').name('Title').disabled(true)
  voucherCode.editField('icon').name('Icon').disabled(true)

  voucherCode.moveField('title').afterField('description')
  voucherCode.moveField('icon').afterField('title')

  migration.transformEntries({
    contentType: 'voucherCode',
    from: ['title'],
    to: ['newTitle'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      let referencedTitleElement

      let referencedTitle = fromFields['title']
      if (referencedTitle !== undefined) {
        if (referencedTitle[currentLocale] !== undefined) {
          referencedTitleElement = referencedTitle[currentLocale]
        }
      }

      if (referencedTitleElement !== undefined) {
        return {
          newTitle: {
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    value: referencedTitleElement,
                    nodeType: 'text',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ],
            data: {},
            nodeType: 'document'
          }
        }
      }
    }
  })
}
