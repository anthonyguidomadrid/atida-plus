module.exports = async function (migration, context) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')

  const defaultLocaleKey = fn.getDefaultLocale() // this will return 'en-GB'

  const staticRecommendationBlock = migration.createContentType(
    'staticRecommendationBlock',
    {
      name: 'Static Recommendation Block',
      description: 'Add skus that will be rendered as a block of products',
      displayField: 'title'
    }
  )
  staticRecommendationBlock
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
  staticRecommendationBlock
    .createField('shouldDisplayTitle')
    .name('Should display title?')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      [defaultLocaleKey]: false
    })
    .disabled(false)
    .omitted(false)
  staticRecommendationBlock
    .createField('listOfSkus')
    .name('List of SKUS')
    .type('Array')
    .localized(false)
    .required(true)
    .items({
      type: 'Symbol',
      validations: [
        {
          regexp: {
            pattern: '^[0-9]{12}$',
            flags: null
          },
          message: 'Please enter a correct sku (12 digits)'
        }
      ]
    })
    .disabled(false)
    .omitted(false)
  staticRecommendationBlock
    .createField('viewType')
    .name('View Type')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Slider', 'Grid']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Slider'
    })
    .disabled(false)
    .omitted(false)
}
