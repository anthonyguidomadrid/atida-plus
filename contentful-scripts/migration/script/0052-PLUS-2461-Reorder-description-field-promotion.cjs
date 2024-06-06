module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion.moveField('promoInformation').afterField('image')
}
