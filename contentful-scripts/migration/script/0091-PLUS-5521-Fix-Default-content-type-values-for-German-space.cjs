module.exports = async function (migration, context) {
  const fnUsedLocales = await import(
    '../../helpers/locales/getListOfUsedLocales.mjs'
  )
  const fnDefaultValues = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )

  const fnDefaultLocale = await import(
    '../../helpers/locales/getDefaultLocale.mjs'
  )

  const usedLocaleGermany = fnUsedLocales.getListOfUsedLocales()[0]

  // Migration: 0044
  if (usedLocaleGermany === 'de-DE') {
    const contentBlockWithImage = migration.createContentType(
      'contentBlockWithImage',
      {
        name: 'Content Block With Image',
        displayField: 'title',
        description:
          'Generic content block that can have an image, title, text, CTA and text link.'
      }
    )

    contentBlockWithImage
      .createField('title')
      .name('Title')
      .type('Symbol')
      .localized(true)
      .required(true)
      .validations([])
      .disabled(false)
      .omitted(false)

    contentBlockWithImage
      .createField('content')
      .name('Content')
      .type('RichText')
      .localized(true)
      .required(false)
      .validations([
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
      ])
      .disabled(false)
      .omitted(false)

    contentBlockWithImage
      .createField('image')
      .name('Image')
      .type('Link')
      .localized(true)
      .required(false)
      .validations([
        {
          linkMimetypeGroup: ['image']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Asset')

    contentBlockWithImage
      .createField('cta')
      .name('CTA')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['link']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    contentBlockWithImage
      .createField('textLink')
      .name('Text link')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['link']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    contentBlockWithImage
      .createField('backgroundColor')
      .name('Background color')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['color']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    contentBlockWithImage
      .createField('textColor')
      .name('Text color')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['color']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    contentBlockWithImage
      .createField('header')
      .name('Header')
      .type('Symbol')
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    contentBlockWithImage
      .createField('imageOnTheLeft')
      .name('Image on the left')
      .type('Boolean')
      .localized(true)
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    contentBlockWithImage
      .createField('isSponsoredContent')
      .name('Is Sponsored Content')
      .type('Boolean')
      .localized(false)
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    contentBlockWithImage.moveField('isSponsoredContent').beforeField('image')
  } else {
    const contentBlockWithImage = migration.editContentType(
      'contentBlockWithImage'
    )

    contentBlockWithImage
      .editField('imageOnTheLeft')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))

    contentBlockWithImage
      .editField('isSponsoredContent')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
  }

  // Migration: 0059
  if (usedLocaleGermany === 'de-DE') {
    const marketingTeaser = migration.createContentType('marketingTeaser', {
      name: 'Marketing teaser',
      displayField: 'title',
      description:
        'This content type can be used to highlight: a specific USP, campaigns, discount, launch of feature X, etc.'
    })

    marketingTeaser
      .createField('title')
      .name('Title')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    marketingTeaser
      .createField('teaserDescription')
      .name('Teaser Description')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    marketingTeaser
      .createField('logo')
      .name('Brand Logo')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)
      .linkType('Asset')

    marketingTeaser
      .createField('isSponsoredContent')
      .name('Is Sponsored Content')
      .type('Boolean')
      .localized(false)
      .required(false)
      .validations([])
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .disabled(false)
      .omitted(false)

    marketingTeaser
      .createField('labelText')
      .name('Label text')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    marketingTeaser
      .createField('labelColor')
      .name('Label color')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['color']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    marketingTeaser
      .createField('isFullWidthImage')
      .name('Is Full-Width Image')
      .type('Boolean')
      .localized(false)
      .required(false)
      .validations([])
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .disabled(false)
      .omitted(false)

    marketingTeaser
      .createField('image')
      .name('Image')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)
      .linkType('Asset')

    marketingTeaser
      .createField('backgroundColor')
      .name('Background color')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['color']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    marketingTeaser
      .createField('hasButton')
      .name('Has button')
      .type('Boolean')
      .localized(false)
      .required(true)
      .validations([])
      .disabled(false)
      .omitted(false)

    marketingTeaser
      .createField('teaserSlug')
      .name('Teaser Slug')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([
        {
          unique: true
        }
      ])
      .disabled(false)
      .omitted(false)
  } else {
    const marketingTeaser = migration.editContentType('marketingTeaser')

    marketingTeaser
      .editField('isFullWidthImage')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))

    marketingTeaser
      .editField('isSponsoredContent')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
  }

  // Migration: 0073
  if (usedLocaleGermany === 'de-DE') {
    const promotion = migration.createContentType('promotion', {
      name: 'Promotion',
      displayField: 'id',
      description:
        'Promotion data containing Spryker Promo ID, promo page display and promo label'
    })

    promotion
      .createField('title')
      .name('Title')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('id')
      .name('ID')
      .type('Symbol')
      .localized(false)
      .required(true)
      .validations([
        {
          unique: true
        },
        {
          regexp: {
            pattern: '^[a-z0-9\\.\\-]*$',
            flags: 'g'
          },
          message:
            'The ID only allows: lowercase letters, numbers, dashes and dots'
        }
      ])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('description')
      .name('Description (For Promotion Detail Page)')
      .type('RichText')
      .localized(true)
      .required(false)
      .validations([
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
      ])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('isSponsoredContent')
      .name('Is Sponsored Content')
      .type('Boolean')
      .localized(false)
      .required(false)
      .validations([])
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .disabled(false)
      .omitted(false)

    promotion
      .createField('teaserType')
      .name('Teaser Type')
      .type('Boolean')
      .localized(false)
      .required(true)
      .validations([])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('teaserImage')
      .name('Teaser Image')
      .type('Link')
      .localized(false)
      .required(true)
      .validations([
        {
          linkMimetypeGroup: ['image']
        },
        {
          assetFileSize: {
            min: null,
            max: 1048576
          },
          message:
            'The image you are trying to upload is more than 1MB - please minify it'
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Asset')

    promotion
      .createField('teaserDescription')
      .name('Teaser Description')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('color')
      .name('Color')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['color']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    promotion
      .createField('image')
      .name('Header Image')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)
      .linkType('Asset')

    promotion
      .createField('promoInformation')
      .name('Promo information (For Product Detail Page)')
      .type('RichText')
      .localized(true)
      .required(false)
      .validations([
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
      ])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('validFrom')
      .name('Valid from')
      .type('Date')
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('validTo')
      .name('Valid to')
      .type('Date')
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('weight')
      .name('Priority')
      .type('Integer')
      .localized(false)
      .required(false)
      .validations([
        {
          unique: true
        },
        {
          range: {
            min: 1,
            max: 1000
          }
        }
      ])
      .disabled(false)
      .omitted(false)

    promotion
      .createField('categories')
      .name('Categories')
      .type('Array')
      .localized(false)
      .required(false)
      .validations([
        {
          size: {
            min: 1,
            max: 5
          }
        }
      ])
      .disabled(false)
      .omitted(false)
      .items({
        type: 'Link',
        validations: [
          {
            linkContentType: ['category']
          }
        ],
        linkType: 'Entry'
      })

    promotion
      .createField('label')
      .name('Label')
      .type('Link')
      .localized(false)
      .required(false) // this is 'true' in the current Promotion CT
      .validations([
        {
          linkContentType: ['translation']
        }
      ])
      .disabled(true)
      .omitted(true)
      .linkType('Entry')

    promotion
      .createField('itemsToFilterBy')
      .name('Items to Filter By')
      .type('Array')
      .localized(false)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)
      .items({
        type: 'Symbol',
        validations: []
      })

    promotion
      .createField('labels')
      .name('Labels')
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
      .disabled(false)
      .omitted(false)
      .items({
        type: 'Link',
        validations: [
          {
            linkContentType: ['translation', 'translationInfoLabel']
          }
        ],
        linkType: 'Entry'
      })
  } else {
    const promotion = migration.editContentType('promotion')

    promotion.editField('label').required(false)

    promotion
      .editField('isSponsoredContent')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
  }

  if (usedLocaleGermany === 'de-DE') {
    const heroBanner = migration.createContentType('heroBanner', {
      name: 'Hero Banner',
      displayField: 'title',
      description: 'This is used to manage the homepage hero banner.'
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

    heroBanner
      .createField('title')
      .name('Rich Text Title')
      .type('RichText')
      .localized(true)
      .required(false)
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
      .disabled(false)
      .omitted(false)

    heroBanner
      .createField('searchPlaceholder')
      .name('Search placeholder')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    heroBanner
      .createField('isSponsoredContent')
      .name('Is Sponsored Content')
      .type('Boolean')
      .localized(false)
      .required(false)
      .validations([])
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .disabled(false)
      .omitted(false)

    heroBanner
      .createField('image')
      .name('Image')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['media']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    heroBanner
      .createField('link')
      .name('Link')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['link']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    heroBanner
      .createField('text')
      .name('Text')
      .type('RichText')
      .localized(true)
      .required(false)
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
      .disabled(false)
      .omitted(false)
  } else {
    const heroBanner = migration.editContentType('heroBanner')

    heroBanner
      .editField('isSponsoredContent')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
  }

  if (usedLocaleGermany === 'de-DE') {
    const campaignHeroBanner = migration.createContentType(
      'campaignHeroBanner',
      {
        name: 'Campaign Hero Banner',
        displayField: 'title',
        description:
          'A banner for those campaigns like Black Friday or Christmas'
      }
    )

    campaignHeroBanner
      .createField('title')
      .name('Title')
      .type('Symbol')
      .localized(true)
      .required(true)
      .validations([])
      .disabled(false)
      .omitted(false)

    campaignHeroBanner
      .createField('altTitle')
      .name('Alternative title')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    campaignHeroBanner
      .createField('description')
      .name('Description')
      .type('RichText')
      .localized(true)
      .required(false)
      .validations([
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
      ])
      .disabled(false)
      .omitted(false)

    campaignHeroBanner
      .createField('isSponsoredContent')
      .name('Is Sponsored Content')
      .type('Boolean')
      .localized(false)
      .required(false)
      .validations([])
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .disabled(false)
      .omitted(false)

    campaignHeroBanner
      .createField('finishingDate')
      .name('Finishing date and time')
      .type('Date')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    campaignHeroBanner
      .createField('image')
      .name('Image')
      .type('Link')
      .localized(true)
      .required(true)
      .validations([])
      .disabled(false)
      .omitted(false)
      .linkType('Asset')

    campaignHeroBanner
      .createField('url')
      .name('URL')
      .type('Symbol')
      .localized(true)
      .required(true)
      .validations([])
      .disabled(false)
      .omitted(false)

    campaignHeroBanner
      .createField('backgroundColor')
      .name('Background color')
      .type('Link')
      .localized(true)
      .required(false)
      .validations([
        {
          linkContentType: ['color']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')
  } else {
    const campaignHeroBanner = migration.editContentType('campaignHeroBanner')

    campaignHeroBanner
      .editField('isSponsoredContent')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
  }

  // // Migration: 0077
  if (usedLocaleGermany === 'de-DE') {
    const exponeaRecommendation = migration.createContentType(
      'exponeaRecommendation',
      {
        name: 'Exponea recommendation',
        displayField: 'title',
        description: "Includes the Id of the Exponea's recommendation"
      }
    )

    exponeaRecommendation
      .createField('title')
      .name('Title')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    exponeaRecommendation
      .createField('altTitle')
      .name('Alternative Title')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    exponeaRecommendation
      .createField('recommendationId')
      .name('Recommendation Id')
      .type('Symbol')
      .localized(true)
      .required(true)
      .validations([])
      .disabled(false)
      .omitted(false)

    exponeaRecommendation
      .createField('type')
      .name('Type')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([
        {
          in: [
            'Homepage',
            'PDP1',
            'PDP2',
            'COP',
            'Frequently Bought Together',
            'Similar Products'
          ]
        }
      ])
      .disabled(false)
      .omitted(false)

    exponeaRecommendation
      .createField('isProductSlider')
      .name('Is Product Slider')
      .type('Boolean')
      .localized(true)
      .required(false)
      .validations([])
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .disabled(false)
      .omitted(false)

    exponeaRecommendation
      .createField('itemsQuantity')
      .name('Items Quantity')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([
        {
          in: ['4', '6', '8', '12']
        }
      ])
      .disabled(false)
      .omitted(false)
  } else {
    const exponeaRecommendation = migration.editContentType(
      'exponeaRecommendation'
    )

    exponeaRecommendation
      .editField('isProductSlider')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
  }

  // // Migration: 0079
  if (usedLocaleGermany === 'de-DE') {
    const page = migration.createContentType('page', {
      name: 'Page',
      displayField: 'title',
      description: 'All content-based pages on the site.'
    })

    page
      .createField('title')
      .name('Title')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([])
      .disabled(false)
      .omitted(false)

    page
      .createField('slug')
      .name('Slug')
      .type('Symbol')
      .localized(true)
      .required(false)
      .validations([
        {
          unique: true
        },
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

    page
      .createField('isCampaignPage')
      .name('Is this a Campaign Page?')
      .type('Boolean')
      .localized(true)
      .required(false)
      .validations([])
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
      .disabled(false)
      .omitted(false)

    page
      .createField('pageType')
      .name('Page Type')
      .type('Symbol')
      .localized(false)
      .required(false)
      .validations([
        {
          in: ['Category', 'CategoryCop', 'Promotion', 'Brand']
        }
      ])
      .disabled(false)
      .omitted(false)

    page
      .createField('referencedContent')
      .name('Referenced Content')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['brand', 'category', 'categoryCop', 'promotion']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    page
      .createField('heroHeader')
      .name('Hero Header')
      .type('Link')
      .localized(true)
      .required(false)
      .validations([
        {
          linkContentType: ['heroBanner', 'campaignHeroBanner']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')

    page
      .createField('contentBlocks')
      .name('Content blocks')
      .type('Array')
      .localized(true)
      .required(false)
      .validations([
        {
          size: {
            min: 1,
            max: 20
          },
          message:
            'Due to current technical limitations, you cannot add more than 20 content blocks to a single page.'
        }
      ])
      .disabled(false)
      .omitted(false)
      .items({
        type: 'Link',
        validations: [
          {
            linkContentType: [
              'campaignHeroBanner',
              'category',
              'categoryGrid',
              'containerOfContentBlocks',
              'contentBlockWithImage',
              'exponeaRecommendation',
              'groupOfStaticContentBlocks',
              'heroBanner',
              'linkBlock',
              'promotion',
              'slider',
              'staticContentBlock',
              'staticHeaderBlock',
              'topBrands',
              'uspsCard',
              'voucherCodes'
            ]
          }
        ],
        linkType: 'Entry'
      })

    page
      .createField('seo')
      .name('SEO')
      .type('Link')
      .localized(false)
      .required(false)
      .validations([
        {
          linkContentType: ['seo']
        }
      ])
      .disabled(false)
      .omitted(false)
      .linkType('Entry')
  } else {
    const page = migration.editContentType('page')

    page
      .editField('isCampaignPage')
      .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))

    page.editField('contentBlocks').items({
      type: 'Link',
      validations: [
        {
          linkContentType: [
            'campaignHeroBanner',
            'category',
            'categoryGrid',
            'containerOfContentBlocks',
            'contentBlockWithImage',
            'exponeaRecommendation',
            'groupOfStaticContentBlocks',
            'heroBanner',
            'linkBlock',
            'promotion',
            'slider',
            'staticContentBlock',
            'staticHeaderBlock',
            'topBrands',
            'uspsCard',
            'voucherCodes'
          ]
        }
      ],
      linkType: 'Entry'
    })
  }

  // Migration: 0057
  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )

  containerOfContentBlocks.editField('displayTitleOnFrontEnd').defaultValue({
    [fnDefaultLocale.getDefaultLocale()]: false
  })

  containerOfContentBlocks.editField('hasSmallMargin').defaultValue({
    [fnDefaultLocale.getDefaultLocale()]: true
  })

  containerOfContentBlocks
    .editField('contentBlocks')
    .validations([
      {
        size: {
          min: 2,
          max: 2
        },
        message:
          'You should add 2 items. If you need 1 item, you should link it in the page content blocks'
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['marketingTeaser', 'promotion']
        }
      ],
      linkType: 'Entry'
    })

  // Migration: 0089
  const seo = migration.editContentType('seo')

  seo
    .editField('noIndex')
    .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))

  seo
    .editField('noFollow')
    .defaultValue(fnDefaultValues.getDefaultValuesForLocales(false))
}
