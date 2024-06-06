module.exports = function (migration, context) {
  const pageFooter = migration.editContentType('pageFooter')

  pageFooter.editField('id').validations([])
}
