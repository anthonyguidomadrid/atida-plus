module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion
    .createField('teaserType')
    .name('Teaser Type')
    .type('Boolean')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  promotion.changeFieldControl('teaserType', 'builtin', 'boolean', {
    helpText:
      'A teaser comes in two types: Content on the left with image on the right and Full-width image',
    trueLabel: 'Content with image',
    falseLabel: 'Full-width image'
  })

  promotion.moveField('teaserType').beforeField('teaserDescription')
}
