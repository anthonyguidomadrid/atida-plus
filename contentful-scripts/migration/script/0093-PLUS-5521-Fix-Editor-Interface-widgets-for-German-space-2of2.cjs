module.exports = async function (migration, context) {
  const heroBanner = migration.editContentType('heroBanner')

  heroBanner.changeFieldControl('searchPlaceholder', 'builtin', 'singleLine')

  heroBanner.changeFieldControl('image', 'builtin', 'entryLinkEditor')

  heroBanner.changeFieldControl('link', 'builtin', 'entryLinkEditor')

  heroBanner.changeFieldControl('text', 'builtin', 'richTextEditor')

  const page = migration.editContentType('page')

  page.changeFieldControl('title', 'builtin', 'singleLine')

  page.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'This is the URL for the page that customers will use to navigate to it.',
    trackingFieldId: 'title'
  })

  page.changeFieldControl('seo', 'builtin', 'entryLinkEditor', {
    helpText:
      'Specifies SEO meta values like title, description, keywords and open graph image, as well as SEO content used on some pages like POP, COP or Brand pages ',
    showLinkEntityAction: true,
    showCreateEntityAction: true
  })

  page.changeFieldControl('contentBlocks', 'builtin', 'entryLinksEditor', {
    bulkEditing: true
  })

  const contentBlockWithImage = migration.editContentType(
    'contentBlockWithImage'
  )

  contentBlockWithImage.changeFieldControl('title', 'builtin', 'singleLine')

  contentBlockWithImage.changeFieldControl(
    'content',
    'builtin',
    'richTextEditor'
  )

  contentBlockWithImage.changeFieldControl(
    'image',
    'builtin',
    'assetLinkEditor'
  )

  contentBlockWithImage.changeFieldControl('cta', 'builtin', 'entryLinkEditor')

  contentBlockWithImage.changeFieldControl(
    'textLink',
    'builtin',
    'entryLinkEditor'
  )

  contentBlockWithImage.changeFieldControl(
    'backgroundColor',
    'builtin',
    'entryLinkEditor'
  )

  contentBlockWithImage.changeFieldControl(
    'textColor',
    'builtin',
    'entryLinkEditor'
  )

  const promotion = migration.editContentType('promotion')

  promotion.changeFieldControl('title', 'builtin', 'singleLine')

  promotion.changeFieldControl('id', 'builtin', 'singleLine')

  promotion.changeFieldControl('description', 'builtin', 'richTextEditor')

  promotion.changeFieldControl('teaserDescription', 'builtin', 'singleLine')

  promotion.changeFieldControl('color', 'builtin', 'entryLinkEditor')

  promotion.changeFieldControl('image', 'builtin', 'assetLinkEditor')
}
