import { InfoLabelEnum } from '~domains/product'

export const product = {
  name:
    'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas Kraftfahrzeug-Haftpflichtversicherung 2+1',
  basketQuantity: 0,
  brand: { code: 'atida', label: 'Atida' },
  sku: '100000000',
  gtin: '1234567890123',
  format: {
    code: 'shampooCode',
    label: 'Shampoo'
  },
  pzn: '888888888',
  availability: 'In stock',
  maxQuantity: 50,
  url: '/product-url',
  productDatImage: 'https://source.unsplash.com/random/448x228?sig=0',
  thumbnailImage: 'https://source.unsplash.com/random/448x228?sig=0',
  mediumImage: 'https://source.unsplash.com/random/448x228?sig=0',
  largeImage: 'https://source.unsplash.com/random/448x228?sig=0',
  productTileImage: 'https://source.unsplash.com/random/448x228?sig=0',
  productTileRetinaImage: 'https://source.unsplash.com/random/448x228?sig=0',
  unitVolume: {
    amount: 100,
    unit: 'MILLILITER',
    unitLabel: 'ml'
  },
  price: {
    value: 9999,
    currency: 'EUR'
  },
  pricePerUnit: {
    value: 9999,
    currency: 'EUR',
    unit: '100 ml'
  },
  rrp: {
    value: 15498,
    currency: 'EUR'
  },
  labels: [{ type: InfoLabelEnum.Promotion, label: 'Free sponge' }]
}

export const getItemsFound = { items: ['100000000'] }

export const getItemsNotFound = { items: ['100000001'] }

export const itemLoading = {
  isLoading: true,
  wasSuccess: false,
  wasError: false,
  error: '',
  items: [
    {
      sku: '100000000',
      isLoading: true,
      isSaved: false,
      wasSuccess: false,
      wasError: false
    }
  ]
}

export const itemSuccess = {
  isLoading: false,
  wasSuccess: true,
  wasError: false,
  error: '',
  items: [
    {
      sku: '100000000',
      isLoading: false,
      isSaved: true,
      wasSuccess: true,
      wasError: false
    }
  ]
}

export const otherItemsBeingRemoved = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  error: '',
  items: [
    {
      sku: '100000000',
      isLoading: false,
      isSaved: false,
      wasSuccess: false,
      wasError: false
    },
    {
      sku: '100000010',
      isLoading: true,
      isSaved: false,
      wasSuccess: true,
      wasError: false
    }
  ]
}
