module.exports = async function (migration) {
  const pageRedirect = migration.editContentType('pageRedirect', {
    name: 'Page Redirect',
    description:
      'It stores 301 Page Redirect to either a Page or External Link',
    displayField: 'slug'
  })

  pageRedirect.editField('redirectTo').validations([
    {
      linkContentType: ['link']
    }
  ])
}
