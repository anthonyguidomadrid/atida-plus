module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.editField('label').disabled(true).omitted(false)
}
