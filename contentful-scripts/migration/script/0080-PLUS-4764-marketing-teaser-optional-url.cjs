module.exports = function (migration, context) {
  const promotion = migration.editContentType('marketingTeaser')

  promotion.editField('teaserSlug').required(false)
}
