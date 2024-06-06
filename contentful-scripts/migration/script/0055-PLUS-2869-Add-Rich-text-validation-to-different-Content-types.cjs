module.exports = function (migration, context) {
  const validationWithNoLinkedEntries = [
    {
      enabledMarks: ['bold', 'italic', 'underline', 'code'],
      message: 'Only bold, italic, underline, and code marks are allowed'
    },
    {
      enabledNodeTypes: [
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'heading-6',
        'ordered-list',
        'unordered-list',
        'hr',
        'blockquote',
        'hyperlink',
        'entry-hyperlink'
      ],
      message:
        'Only heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, link to Url, and link to entry nodes are allowed'
    },
    {
      nodes: {}
    }
  ]

  const campaignHeroBanner = migration.editContentType('campaignHeroBanner')
  campaignHeroBanner
    .editField('description')
    .validations(validationWithNoLinkedEntries)

  const contentBlockWithImage = migration.editContentType(
    'contentBlockWithImage'
  )
  contentBlockWithImage
    .editField('content')
    .validations(validationWithNoLinkedEntries)

  const deliverySteps = migration.editContentType('deliverySteps')
  deliverySteps.editField('text').validations(validationWithNoLinkedEntries)
  deliverySteps.editField('subtext').validations(validationWithNoLinkedEntries)

  const footerProvidersBlock = migration.editContentType('footerProvidersBlock')
  footerProvidersBlock
    .editField('content')
    .validations(validationWithNoLinkedEntries)

  const heroBanner = migration.editContentType('heroBanner')
  heroBanner.editField('text').validations(validationWithNoLinkedEntries)

  const link = migration.editContentType('link')
  link.editField('content').validations(validationWithNoLinkedEntries)

  const pageFooter = migration.editContentType('pageFooter')
  pageFooter.editField('copyright').validations(validationWithNoLinkedEntries)

  const promotion = migration.editContentType('promotion')
  promotion.editField('description').validations(validationWithNoLinkedEntries)
  promotion
    .editField('promoInformation')
    .validations(validationWithNoLinkedEntries)

  const richTextTranslation = migration.editContentType('richTextTranslation')
  richTextTranslation
    .editField('value')
    .validations(validationWithNoLinkedEntries)

  const seo = migration.editContentType('seo')
  seo.editField('copy').validations(validationWithNoLinkedEntries)
  seo.editField('copyExpandable').validations(validationWithNoLinkedEntries)

  const staticContentBlock = migration.editContentType('staticContentBlock')
  staticContentBlock
    .editField('content')
    .validations(validationWithNoLinkedEntries)
}
