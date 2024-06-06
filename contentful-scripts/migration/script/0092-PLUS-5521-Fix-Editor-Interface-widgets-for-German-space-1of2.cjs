module.exports = async function (migration, context) {
  // 0084
  const heroBanner = migration.editContentType('heroBanner')

  heroBanner.changeFieldControl('title', 'builtin', 'richTextEditor', {
    helpText: `Important: please do not use this field. For the Hero Banner title use the 'Title' field since this field doesn't allow headings and its use is deprecated`
  })
  heroBanner.changeFieldControl('newTitle', 'builtin', 'singleLine', {
    helpText: `This is the title that will be shown in the Hero Banner. Important: please use this one instead of the 'Rich Text Title' since that one doesn't allow headings and its use is deprecated`
  })

  // 0083
  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )
  exponeaRecommendation.changeFieldControl(
    'altTitle',
    'builtin',
    'singleLine',
    {
      helpText:
        'This title will be displayed for non-personalised exponea recommendations.'
    }
  )

  // 0078
  exponeaRecommendation.changeFieldControl(
    'itemsQuantity',
    'builtin',
    'dropdown',
    {
      helpText: 'This indicates how many products will be shown'
    }
  )

  // 0077
  exponeaRecommendation.changeFieldControl(
    'isProductSlider',
    'builtin',
    'boolean',
    {
      helpText:
        'If true this will be rendered as a product slider instead of a product grid'
    }
  )

  // 0024
  exponeaRecommendation.changeFieldControl('type', 'builtin', 'dropdown', {
    helpText: 'There should only be one recommendation for each type.'
  })

  // 0079
  const page = migration.editContentType('page')

  page.changeFieldControl('isCampaignPage', 'builtin', 'boolean', {
    helpText: 'Check this box for campaign landing pages'
  })

  // 0076
  page.changeFieldControl('heroHeader', 'builtin', 'entryLinkEditor', {
    helpText:
      'Makes it possible to display a HeroBanner or CampaignHeroBanner on brand pages, COP and POP. If not provided, the current, simple header is displayed.'
  })

  // 0021
  page.changeFieldControl('pageType', 'builtin', 'dropdown', {
    helpText:
      'The type to be selected has to be the same type of the Referenced Content (Brand, Category or Promotion)'
  })

  page.changeFieldControl('referencedContent', 'builtin', 'entryLinkEditor', {
    helpText:
      'A Referenced Content to the page. This and the Page Type should be in sync'
  })

  // NEW
  page.changeFieldControl('slug', 'builtin', 'slugEditor', {
    trackingFieldId: 'title'
  })

  // 0075
  const promotion = migration.editContentType('promotion')

  promotion.changeFieldControl('weight', 'builtin', 'numberEditor', {
    helpText:
      'Higher priority brings the promotion on top of the list - 1 is the highest'
  })

  // 0054
  promotion.changeFieldControl('itemsToFilterBy', 'builtin', 'tagEditor', {
    helpText:
      "Please provide a list of the id's of the Categories or keys of the Labels referenced to the promotion, e.g.: 'beauty' or 'campaign-promo.black-friday'"
  })

  // 0014
  promotion.changeFieldControl('teaserType', 'builtin', 'boolean', {
    helpText:
      'A teaser comes in two types: Content on the left with image on the right (portrait) and Full-width image (landscape)',
    trueLabel: 'Content with image',
    falseLabel: 'Full-width image'
  })

  // 0074
  const slider = migration.editContentType('slider')

  slider.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText:
      "This is only for identifying the entry. It won't be shown in the site"
  })

  slider.changeFieldControl('contentBlocks', 'builtin', 'entryLinksEditor', {
    helpText: 'These are the slides (Hero Banners) of the slider'
  })

  // 0063
  const organization = migration.editContentType('organization')

  organization.changeFieldControl('description', 'builtin', 'multipleLine', {
    helpText:
      'With the exception of en-GB, you only need to enter values for the locales relevant to that country. For example, pt-PT only requires values for en-GB and pt-PT.'
  })

  organization.changeFieldControl('id', 'builtin', 'slugEditor', {
    trackingFieldId: 'name',
    helpText:
      'This will be automatically generated from the organization name, you can enter a custom value if you need to override it.'
  })

  // 0060
  const filterPageType = migration.editContentType('filterPageType')

  filterPageType.changeFieldControl('pageSlug', 'builtin', 'singleLine', {
    helpText:
      "It should be the slug un-localised and without slash. Ie: for the page '/pt-pt/promocoes' the slug here should be 'promocoes'"
  })

  // 0015
  const marketingTeaser = migration.editContentType('marketingTeaser')

  marketingTeaser.changeFieldControl('teaserSlug', 'builtin', 'slugEditor', {
    trackingFieldId: 'title'
  })

  // 0011
  const category = migration.editContentType('category')

  category.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: ''
  })
}
