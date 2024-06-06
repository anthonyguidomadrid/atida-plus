module.exports = function (migration, context) {
  const promotion = migration.editContentType('promotion')

  promotion
    .editField('labels')
    .validations([
      {
        size: {
          min: 1,
          max: 2
        },
        message:
          "You need to add a 'promo' translation with the same ID and eventually a 'campaign' translation"
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['translation', 'translationInfoLabel']
        }
      ],
      linkType: 'Entry'
    })
    .disabled(false)
    .omitted(false)
}
