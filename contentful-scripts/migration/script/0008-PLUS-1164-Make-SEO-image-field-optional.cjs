module.exports = function (migration) {
  const SEOImage = migration.editContentType('seo')

  SEOImage.editField('image').required(false)
}
