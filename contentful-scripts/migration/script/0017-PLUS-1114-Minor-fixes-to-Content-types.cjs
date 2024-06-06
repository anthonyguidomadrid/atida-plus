module.exports = function (migration, context) {
  migration.editContentType('brand', {
    name: 'Brand',
    description: 'Brand data, included brand-id, teaser image and logo'
  })

  migration.editContentType('deliverySteps', {
    name: 'Delivery Steps',
    description: 'Editorial content for Delivery Steps'
  })
}
