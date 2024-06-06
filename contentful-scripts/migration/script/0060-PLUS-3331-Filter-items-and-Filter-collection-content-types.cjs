module.exports = function (migration, context) {
  const filterItem = migration.createContentType('filterItem', {
    name: 'Filter Item',
    description:
      'These items live within the Filter content type and they provide name to be displayed next to the checkbox of the filter and the item to be filtered by, so far (Category or Translation)',
    displayField: 'filterItemName'
  })

  filterItem
    .createField('filterItemName')
    .name('Filter Item Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  filterItem
    .createField('itemToFilterBy')
    .name('Item to Filter By')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['category', 'translation']
      }
    ])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)

  const filterCollection = migration.createContentType('filterCollection', {
    name: 'Filter Collection',
    description:
      "Collection of items to filter by. It's meant to be used in the Promotion Overview page, although it could be used on the COPs. It aims to be an equivalent for those filters we do with Algolia/ES but for Contentful entries.",
    displayField: 'filterCollectionName'
  })

  filterCollection
    .createField('filterCollectionName')
    .name('Filter Collection Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  filterCollection
    .createField('filterItems')
    .name('Filter Items')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 15
        }
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['filterItem']
        }
      ],
      linkType: 'Entry'
    })
    .disabled(false)
    .omitted(false)

  const filterPageType = migration.createContentType('filterPageType', {
    name: 'Filter Page Type',
    description:
      'It allows to set a collection of filters for a given page type, eg: Promo Overview Page, CategoryOverviewPage, etc.',
    displayField: 'pageTypeName'
  })

  filterPageType
    .createField('pageTypeName')
    .name('Page Type Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  // Slug without locale 'pt-pt' and without slash '/'
  // Example: https://www.atida.com/pt-pt/promocoes
  // Will have slug 'promocoes'
  filterPageType
    .createField('pageSlug')
    .name('Page Slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  filterPageType
    .createField('pageFilters')
    .name('Page Filters')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 3
        }
      }
    ])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['filterCollection']
        }
      ],
      linkType: 'Entry'
    })
    .disabled(false)
    .omitted(false)

  filterPageType.changeFieldControl('pageSlug', 'builtin', 'singleLine', {
    helpText:
      "It should be the slug un-localised and without slash. Ie: for the page '/pt-pt/promocoes' the slug here should be 'promocoes'"
  })
}
