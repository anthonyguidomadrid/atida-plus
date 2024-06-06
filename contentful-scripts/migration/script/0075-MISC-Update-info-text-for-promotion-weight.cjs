module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.editField('weight').name('Priority')

  promotion.changeFieldControl('weight', 'builtin', 'numberEditor', {
    helpText:
      'Higher priority brings the promotion on top of the list - 1 is the highest'
  })
}
