module.exports = async function (migration) {
  const { getDefaultValuesForLocales } = await import(
    '../../helpers/locales/getDefaultValuesForLocales.mjs'
  )
  const { getDefaultLocale } = await import(
    '../../helpers/locales/getDefaultLocale.mjs'
  )
  const defaultLocaleKey = getDefaultLocale()

  const contentBlockWithImage = migration.editContentType(
    'contentBlockWithImage'
  )

  contentBlockWithImage
    .createField('titleTypography')
    .name('Title typography')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Heading', 'Body']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Heading'
    })
    .disabled(false)
    .omitted(false)

  contentBlockWithImage.changeFieldControl(
    'titleTypography',
    'builtin',
    'dropdown',
    {
      helpText:
        'By default this will be a the heading font. The heading one is Moranga and the body one is Sohne'
    }
  )

  contentBlockWithImage
    .createField('imageSize')
    .name('Image size')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Large', 'Small']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Large'
    })
    .disabled(false)
    .omitted(false)

  contentBlockWithImage
    .createField('textAlignmentForMobile')
    .name('Text alignment for mobile')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Left', 'Center']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Left'
    })
    .disabled(false)
    .omitted(false)

  contentBlockWithImage.changeFieldControl(
    'textAlignmentForMobile',
    'builtin',
    'dropdown',
    {
      helpText:
        'This is for changing the text alignment only for the mobile version. By default it will be aligned to the left'
    }
  )

  contentBlockWithImage
    .createField('showDescription')
    .name('Show description?')
    .type('Boolean')
    .localized(false)
    .defaultValue(getDefaultValuesForLocales(true))
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  contentBlockWithImage
    .createField('buttonVariant')
    .name('Button style')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Primary', 'Tertiary']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Primary'
    })
    .disabled(false)
    .omitted(false)

  contentBlockWithImage
    .createField('buttonWidthForMobile')
    .name('Button width for mobile')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Auto', 'Full width']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Auto'
    })
    .disabled(false)
    .omitted(false)

  contentBlockWithImage.changeFieldControl(
    'buttonWidthForMobile',
    'builtin',
    'dropdown',
    {
      helpText:
        "This is for setting the button width only for the mobile version. 'Auto' will adapt the width according to the content. By default this one will be set"
    }
  )

  contentBlockWithImage
    .createField('buttonPositionForTablet')
    .name('Button position for tablet')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Right', 'Bottom']
      }
    ])
    .defaultValue({
      [defaultLocaleKey]: 'Right'
    })
    .disabled(false)
    .omitted(false)

  contentBlockWithImage.changeFieldControl(
    'buttonPositionForTablet',
    'builtin',
    'dropdown',
    {
      helpText:
        "Note: This will be only applied when the image size is 'Small'. This is for setting the button position only for the tablet version (SM). 'Right' will position the button on the right of the copy, and 'Bottom' underneath it. By default it will be on the right"
    }
  )

  const color = migration.editContentType('color')

  color.editField('colorReference').validations([
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
}
