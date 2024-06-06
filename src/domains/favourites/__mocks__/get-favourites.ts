export const SprykerFavouritesResponseMock = {
  data: [
    {
      type: 'wishlist-items',
      id: 'list-id',
      attributes: {
        name: 'name',
        numberOfItems: 2,
        createdAt: 'string',
        updatedAt: 'string'
      },
      links: {
        self: 'string'
      },
      relationships: {
        'wishlist-items': {
          data: [
            {
              type: 'string',
              id: 'string'
            }
          ]
        }
      }
    }
  ],
  links: { self: 'string' },
  included: [
    {
      type: 'string',
      id: 'some-id-1',
      attributes: { sku: 'string' },
      links: { self: 'string' }
    },
    {
      type: 'string',
      id: 'some-id-2',
      attributes: { sku: 'string' },
      links: { self: 'string' }
    }
  ]
}

export const GetFavouritesResponseMock = {
  id: 'list-id',
  items: ['some-id-1', 'some-id-2']
}
