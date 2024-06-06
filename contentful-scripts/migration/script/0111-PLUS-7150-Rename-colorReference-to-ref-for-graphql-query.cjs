module.exports = async function (migration) {
  const color = migration.editContentType('color')

  // Crete the new field
  color
    .createField('ref')
    .name('Color reference')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      },
      {
        in: [
          'primary-caribbean-green',
          'primary-caribbean-green-light',
          'primary-caribbean-green-lightest',
          'primary-oxford-blue',
          'primary-prime',
          'primary-white',
          'secondary-air-superiority-blue',
          'secondary-atomic-tangerine',
          'secondary-champagne-pink',
          'secondary-dark-sky-blue',
          'secondary-portland-orange',
          'category-personal-care',
          'category-medicines',
          'category-private-label',
          'category-pets',
          'category-homeopathy-and-natural-products',
          'category-vitamins-and-supplements',
          'category-beauty',
          'category-baby-and-kids',
          'category-medical-supply-and-orthopedics',
          'category-nutrition-exercise-and-weight-loss',
          'ui-black',
          'ui-campaign-base',
          'labels-campaign-green',
          'labels-coral-red-base',
          'labels-coral-red-light',
          'labels-tangerine-light',
          'labels-tangerine-base'
        ]
      }
    ])
    .disabled(false)
    .omitted(false)

  // Migrate content
  migration.transformEntries({
    contentType: 'color',
    from: ['colorReference'],
    to: ['ref'],
    transformEntryForLocale: function (fromFields, currentLocale) {
      if (
        fromFields !== undefined &&
        fromFields['colorReference'] !== undefined &&
        fromFields['colorReference'][currentLocale] !== undefined
      ) {
        return {
          ref: fromFields['colorReference'][currentLocale]
        }
      }
    }
  })

  // Disable previous Color Reference
  color.editField('colorReference').disabled(true).omitted(true)

  // Change 'ref' as dropdown
  color.changeFieldControl('ref', 'builtin', 'dropdown', {
    helpText: 'It defines the color scheme that represents the entry'
  })

  // Change 'ref' as title
  migration.editContentType('color', {
    name: 'Color',
    description:
      'Colors based on the design system, designed for use with tailwind classes.',
    displayField: 'ref'
  })
}
