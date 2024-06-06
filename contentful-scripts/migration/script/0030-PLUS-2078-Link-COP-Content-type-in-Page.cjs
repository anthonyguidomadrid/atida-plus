module.exports = function (migration, context) {
  const page = migration.editContentType('page')

  page.editField('pageType').validations([
    {
      in: ['Category', 'CategoryCop', 'Promotion', 'Brand']
    }
  ])

  page.editField('referencedContent').validations([
    {
      linkContentType: ['brand', 'category', 'categoryCop', 'promotion']
    }
  ])
}
