export const mock = {
  data: {
    filterPageTypeCollection: {
      items: [
        {
          pageTypeName: 'Promotions Overview Filters PT',
          pageSlug: 'promocoes',
          pageFiltersCollection: {
            items: [
              {
                filterCollectionName: 'Filtrar por categorias',
                filterItemsCollection: {
                  items: [
                    {
                      filterItemName: 'Filtrar por belleza',
                      itemToFilterBy: {
                        __typename: 'Category',
                        id: 'beauty',
                        title: 'Beleza'
                      }
                    }
                  ]
                }
              },
              {
                filterCollectionName: 'Ofertas especiais',
                filterItemsCollection: {
                  items: [
                    {
                      filterItemName: 'Three wise men',
                      itemToFilterBy: {
                        __typename: 'Translation',
                        key: 'campaign-promo.three-wise-men',
                        value: 'Tres reyes magos'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
}
