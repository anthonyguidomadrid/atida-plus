import { CmsContentTypes } from '~config/content-types'

export const mockedProducts = [
  {
    name: 'Test pt_PT Product Name 983615796546',
    sku: '983615796546',
    brand: { code: 'atida', label: 'Atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
    thumbnailImage:
      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/3CEF7521-6902-4179-B1D8A525021A42EF/Product Tile Thumbnail-1EF4E390-0AF6-462B-B3AB955536336AAF.png',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 5999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test PT Product Name 997296201082',
    sku: '997296201082',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    description: 'Portugeese',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 992852073547',
    sku: '992852073547',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 985457884132',
    sku: '985457884132',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 9827109133',
    sku: '9827109133',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 981595870141',
    sku: '981595870141',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test PT Product Name 972748638507',
    sku: '972748638507',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Portugeese',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 969729705635',
    sku: '969729705635',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test PT Product Name 96827834661',
    sku: '96827834661',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Portugeese',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 963688024086',
    sku: '963688024086',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 960397982385',
    sku: '960397982385',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 95632846870',
    sku: '95632846870',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 955541795631',
    sku: '955541795631',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test PT Product Name 953329133358',
    sku: '953329133358',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Portugeese',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  },
  {
    name: 'Test pt_PT Product Name 943127957627',
    sku: '943127957627',
    brand: { code: 'atida', label: 'atida' },
    format: { code: 'shampoocode', label: 'shampoo' },
    productDatImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    thumbnailImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_52.jpg',
    mediumImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_53.jpg',
    largeImage:
      'https://www.mifarma.es/media/catalog/product/cache/1/thumbnail/75x/9df78eab33525d08d6e5fb8d27136e95/1/8/182903_5.jpg',
    productTileImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
    productTileRetinaImage:
      'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
    description: 'Description pt_PT',
    unitVolume: { amount: 100, unit: 'MILLILITER', unitLabel: 'ml' },
    price: { value: 9999, currency: 'eur' },
    pricePerUnit: { value: 9999, currency: 'EUR', unit: '100ml' },
    rrp: { value: 9999, currency: 'eur' },
    basketQuantity: 0
  }
]

export const mockedContentBlocks = [
  {
    contentType: CmsContentTypes.USPS_CARD,
    title: 'Your trusted personal pharmacy expert',
    items: [
      {
        icon: 'Scan24',
        text: 'Free delivery above €49'
      },
      {
        icon: 'Return24',
        text: 'Free returns'
      },
      {
        icon: 'NavAdvice24',
        text: 'Personal help from our pharmacy team'
      }
    ]
  },
  {
    contentType: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE.toString(),
    title: 'Any questions? test!',
    image: {
      title: 'Contact image',
      description: 'Person looking at a tablet',
      url:
        'https://images.ctfassets.net/7g2w796onies/1mIjmBbjPPsFpIAAc4kYnE/82cedd8ac9f3c4008f45483563a0e2af/adam-winger-iirbrh939yc-unsplash_1.jpg',
      type: 'image/jpeg'
    },
    content:
      '<p>We&#39;re here to help. Ask about our products or get expert medical advice.</p><p>Just test</p>',
    cta: {
      label: 'Contact us',
      url: '/contact',
      icon: 'NavAdvice24',
      content: ''
    },
    textLink: { label: 'Read our FAQ test', url: '/faq', content: '' },
    backgroundColor: 'secondary-dark-sky-blue',
    textColor: 'primary-white'
  },
  {
    contentType: CmsContentTypes.HERO_BANNER,
    title: '<p>Your personal</p><p>online pharmacy</p>',
    searchPlaceholder: 'What are you looking for?',
    link: { label: 'view more', url: '/view-more', content: '' },
    text: '<p>Atida private label</p>',
    image: {
      title: 'Hero Image',
      alt: 'Hero image',
      url:
        'https://images.ctfassets.net/7g2w796onies/15Vp4EwS0FtPyW6T1F3I2q/42d999e88586f87d7d1a94ca736475a4/Atida_Private_label_wide_STV_1__1_.png'
    }
  }
]
