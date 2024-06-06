module.exports = function (migration, context) {
  const color = migration.editContentType('color')

  color.editField('colorReference').validations([
    {
      unique: true
    },
    {
      in: [
        'primary-caribbean-green',
        'primary-caribbean-green-light',
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
        'ui-black'
      ]
    }
  ])
}
