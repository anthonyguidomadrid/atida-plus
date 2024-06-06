module.exports = async function (migration) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')
  const defaultLocaleKey = fn.getDefaultLocale() // this will return 'en-GB'

  const address = migration.editContentType('address')
  address
    .createField('id')
    .name('ID')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false)
  address.changeFieldControl('id', 'builtin', 'slugEditor', {
    helpText:
      "This is only for identifying the entry. It won't be shown in the site",
    trackingFieldId: 'streetAddress'
  })

  migration.transformEntries({
    contentType: 'address',
    from: ['streetAddress'],
    to: ['id'],
    transformEntryForLocale: (fromFields, currentLocale) => {
      if (
        fromFields !== undefined &&
        fromFields['streetAddress'] !== undefined &&
        fromFields['streetAddress'][currentLocale] !== undefined
      )
        return {
          id: fromFields['streetAddress'][currentLocale]
            .toLowerCase()
            .replace(/[^a-z0-9._-]+/, '')
        }
    }
  })

  const brand = migration.editContentType('brand')
  brand.editField('id').localized(false)

  const category = migration.editContentType('category')
  category.editField('id').localized(false)

  const categoryCop = migration.editContentType('categoryCop')
  categoryCop
    .editField('title')
    .required(true)
    .validations([
      {
        unique: true
      }
    ])

  const categoryGrid = migration.editContentType('categoryGrid')
  categoryGrid
    .editField('title')
    .required(true)
    .validations([
      {
        unique: true
      }
    ])

  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )
  containerOfContentBlocks.editField('title').required(true)

  const deliverySteps = migration.editContentType('deliverySteps')
  deliverySteps
    .editField('title')
    .required(true)
    .validations([
      {
        unique: true
      }
    ])

  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )
  exponeaRecommendation.editField('title').required(true)

  exponeaRecommendation
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

  exponeaRecommendation.moveField('shouldDisplayTitle').afterField('title')

  const filterItem = migration.editContentType('filterItem')
  filterItem.editField('filterItemName').validations([
    {
      unique: true
    }
  ])

  const filterPageType = migration.editContentType('filterPageType')
  filterPageType.editField('pageTypeName').validations([
    {
      unique: true
    }
  ])

  const footerProvidersBlock = migration.editContentType('footerProvidersBlock')
  footerProvidersBlock.editField('title').validations([
    {
      unique: true
    }
  ])

  const groupOfStaticContentBlocks = migration.editContentType(
    'groupOfStaticContentBlocks'
  )
  groupOfStaticContentBlocks
    .editField('title')
    .required(true)
    .validations([
      {
        unique: true
      }
    ])

  const heroBanner = migration.editContentType('heroBanner')
  heroBanner
    .createField('id')
    .name('ID')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false)
  heroBanner.changeFieldControl('id', 'builtin', 'slugEditor', {
    helpText:
      "This is only for identifying the entry. It won't be shown in the site",
    trackingFieldId: 'newTitle'
  })

  migration.transformEntries({
    contentType: 'heroBanner',
    from: ['newTitle'],
    to: ['id'],
    transformEntryForLocale: (fromFields, currentLocale) => {
      if (
        fromFields !== undefined &&
        fromFields['newTitle'] !== undefined &&
        fromFields['newTitle'][currentLocale] !== undefined
      )
        return {
          id:
            fromFields['newTitle'][currentLocale]
              .toLowerCase()
              .replace(/[^a-z0-9._-]+/, '') + Math.floor(Math.random() * 9)
        }
    }
  })

  const linkBlock = migration.editContentType('linkBlock', {
    name: 'Link Block',
    description: 'A content block for displaying a button',
    displayField: 'title'
  })

  linkBlock.editField('title').required(true)

  const menu = migration.editContentType('menu')
  menu.editField('title').validations([
    {
      unique: true
    }
  ])

  const menuItem = migration.editContentType('menuItem')
  menuItem.editField('id').validations([
    {
      unique: true
    }
  ])

  const page = migration.editContentType('page')
  page.editField('slug').required(true)

  const pageFooter = migration.editContentType('pageFooter')
  pageFooter.editField('id').validations([
    {
      unique: true
    }
  ])

  const pageRedirect = migration.editContentType('pageRedirect')
  pageRedirect.editField('slug').validations([
    {
      unique: true
    }
  ])

  const slider = migration.editContentType('slider')
  slider.editField('name').validations([
    {
      unique: true
    }
  ])

  const staticContentBlock = migration.editContentType('staticContentBlock')
  staticContentBlock.editField('title').validations([
    {
      unique: true
    }
  ])

  const topBrands = migration.editContentType('topBrands', {
    name: 'Top Brands',
    description:
      'Used for rendering a group of links with brand logos linking to its corresponding brand page',
    displayField: 'title'
  })
  topBrands.editField('brands').required(true)

  const usp = migration.editContentType('usp')
  usp
    .editField('text')
    .required(true)
    .validations([
      {
        unique: true
      }
    ])

  const uspsCard = migration.editContentType('uspsCard')
  uspsCard
    .editField('title')
    .required(true)
    .validations([
      {
        unique: true
      }
    ])

  const voucherCodes = migration.editContentType('voucherCodes')
  voucherCodes.editField('title').validations([
    {
      unique: true
    }
  ])

  const voucherCode = migration.editContentType('voucherCode')
  voucherCode.editField('code').validations([
    {
      unique: true
    }
  ])
}
