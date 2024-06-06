module.exports = function (migration, context) {
  migration.editContentType('staticContentBlock', {
    name: 'Static content block',
    description: 'Create static content block with rich text editor',
    displayField: 'title'
  })
  migration.editContentType('staticHeaderBlock', {
    name: 'Static header block',
    description: 'Create static header with a title',
    displayField: 'title'
  })
}
