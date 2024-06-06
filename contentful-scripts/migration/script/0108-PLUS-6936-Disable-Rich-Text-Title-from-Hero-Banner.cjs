module.exports = async function (migration) {
  const heroBanner = migration.editContentType('heroBanner')
  heroBanner.editField('title').disabled(true).omitted(true)
}
