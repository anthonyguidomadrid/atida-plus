module.exports = function (migration, context) {
  migration.deleteContentType('promotionTeaser')

  migration.editContentType('promotion', {
    name: 'Promotion',
    description:
      'Promotion data containing Spryker Promo ID, promo page display and promo label'
  })
}
