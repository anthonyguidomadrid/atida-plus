module.exports = function (migration, context) {
  const category = migration.editContentType('category')
  category.editField('subcategories').validations([
    {
      size: {
        min: 1,
        max: 25
      }
    }
  ])

  const menu = migration.editContentType('menu')
  menu.editField('items').validations([
    {
      size: {
        min: 1,
        max: 25
      }
    }
  ])

  const categoryGrid = migration.editContentType('categoryGrid')
  categoryGrid.editField('items').validations([
    {
      size: {
        min: 1,
        max: 20
      }
    }
  ])

  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )
  containerOfContentBlocks.editField('contentBlocks').validations([
    {
      size: {
        min: 2,
        max: 2
      },
      message:
        'You should add 2 items. If you need 1 item, you should link it in the page content blocks'
    }
  ])

  const footerProvidersBlock = migration.editContentType('footerProvidersBlock')
  footerProvidersBlock.editField('icons').validations([
    {
      size: {
        min: 1,
        max: 10
      }
    }
  ])

  const page = migration.editContentType('page')
  page.editField('contentBlocks').validations([
    {
      size: {
        min: 1,
        max: 20
      },
      message:
        'Due to current technical limitations, you cannot add more than 20 content blocks to a single page.'
    }
  ])

  const pageFooter = migration.editContentType('pageFooter')
  pageFooter.editField('providerBlocks').validations([
    {
      size: {
        min: 1,
        max: 3
      }
    }
  ])

  const promotion = migration.editContentType('promotion')
  promotion.editField('categories').validations([
    {
      size: {
        min: 1,
        max: 5
      }
    }
  ])

  const topBrands = migration.editContentType('topBrands')
  topBrands.editField('brands').validations([
    {
      size: {
        min: 1,
        max: 10
      }
    }
  ])

  const uspsCard = migration.editContentType('uspsCard')
  uspsCard.editField('usps').validations([
    {
      size: {
        min: 1,
        max: 3
      }
    }
  ])
}
