module.exports = function (migration) {
  const page = migration.editContentType('page')

  page.changeFieldControl('pageType', 'builtin', 'dropdown', {
    helpText:
      'The type to be selected has to be the same type of the Referenced Content (Brand, Category or Promotion)'
  })

  page.changeFieldControl('referencedContent', 'builtin', 'entryLinkEditor', {
    helpText:
      'A Referenced Content to the page. This and the Page Type should be in sync'
  })
}
