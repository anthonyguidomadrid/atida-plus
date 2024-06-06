module.exports = function (migration, context) {
  const page = migration.editContentType('page')

  page.editField('contentBlocks').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'categoryGrid',
          'contentBlockWithImage',
          'heroBanner',
          'promotion',
          'uspsCard'
        ]
      }
    ],
    linkType: 'Entry'
  })
}
