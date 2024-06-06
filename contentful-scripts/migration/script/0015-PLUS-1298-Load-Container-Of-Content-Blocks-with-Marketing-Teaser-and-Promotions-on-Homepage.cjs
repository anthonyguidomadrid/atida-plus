module.exports = function (migration, context) {
  const marketingTeaser = migration.createContentType('marketingTeaser', {
    name: 'Marketing teaser',
    description:
      'This content type can be used to highlight: a specific USP, campaigns, discount, launch of feature X, etc.',
    displayField: 'title'
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
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false)

  marketingTeaser.changeFieldControl('teaserSlug', 'builtin', 'slugEditor', {
    trackingFieldId: 'title'
  })

  const containerOfContentBlocks = migration.createContentType(
    'containerOfContentBlocks',
    {
      name: 'Container of content blocks',
      description:
        'It allows to include several content blocks under the same container.',
      displayField: 'title'
    }
  )

  containerOfContentBlocks
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  containerOfContentBlocks
    .createField('contentBlocks')
    .name('Content blocks')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 2,
          max: null
        }
      }
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['marketingTeaser', 'promotion']
        }
      ],
      linkType: 'Entry'
    })

  const page = migration.editContentType('page')

  page.editField('contentBlocks').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'category',
          'categoryGrid',
          'containerOfContentBlocks',
          'contentBlockWithImage',
          'exponeaRecommendation',
          'heroBanner',
          'promotion',
          'staticContentBlock',
          'staticHeaderBlock',
          'uspsCard'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
