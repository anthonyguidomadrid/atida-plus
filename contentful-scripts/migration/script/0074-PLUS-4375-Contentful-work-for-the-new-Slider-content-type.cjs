module.exports = function (migration) {
  const slider = migration.createContentType('slider', {
    name: 'Slider',
    description:
      'This is for showing a slider/carrousel with more than one Hero Banner',
    displayField: 'name'
  })

  slider
    .createField('name')
    .name('Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  slider
    .createField('contentBlocks')
    .name('Content blocks')
    .type('Array')
    .localized(true)
    .required(true)
    .validations([
      {
        size: {
          min: 2,
          max: 5
        },
        message: 'You can only add from 2 to 5 Hero Banners'
      }
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['heroBanner']
        }
      ],
      linkType: 'Entry'
    })

  slider.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText:
      "This is only for identifying the entry. It won't be shown in the site"
  })

  slider.changeFieldControl('contentBlocks', 'builtin', 'entryLinksEditor', {
    helpText: 'These are the slides (Hero Banners) of the slider'
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
          'slider',
          'heroBanner',
          'campaignHeroBanner',
          'promotion',
          'staticContentBlock',
          'staticHeaderBlock',
          'topBrands',
          'uspsCard',
          'linkBlock'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
