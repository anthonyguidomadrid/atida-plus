import type { DeepPartial } from '@reduxjs/toolkit'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { CategoryLink } from '~domains/contentful'
import { InfoLabelEnum } from '~domains/product'
import { ProductViews } from '~domains/product/slices/view-toggle'
import { RootState } from '~domains/redux'

export const reportedProductListFiltered = {
  list_id: 'filtered',
  products: [
    {
      brand: '100% Natural',
      brand_code: '100_natural',
      name: 'Test pt_PT Product Name 985457884132',
      objectID: '985457884132',
      position: 1,
      price: 200,
      product_id: '985457884132',
      rrp_price: 8.88
    },
    {
      product_id: '904770952170',
      objectID: '904770952170',
      name: 'Serozinc (Pieles Grasas) La Roche Posay 150ml',
      brand: 'Acorelle',
      brand_code: 'acorelle',
      price: 107,
      rrp_price: 115.2,
      position: 2
    }
  ],
  index: undefined,
  filters: [
    { type: 'brand', value: 'Aptiva' },
    { type: 'categoryLvl0', value: 'Beleza' }
  ],
  nonInteraction: 1
}

export const reportedProductList = {
  list_id: 'pop/medicines/Medicines > Digestion',
  category: 'vitamins_supplements_minerals',
  list_view: 'grid',
  products: [
    {
      product_id: '985457884132',
      objectID: '985457884132',
      sku: '985457884132',
      category: 'medicines/Test_new_category',
      name: 'Test pt_PT Product Name 985457884132',
      brand: '100% Natural',
      brand_code: '100_natural',
      format: 'Cápsula',
      format_code: 'capsule',
      price: 200,
      rrp_price: 8.88,
      quantity: 1,
      position: 1
    },
    {
      product_id: '904770952170',
      objectID: '904770952170',
      name: 'Serozinc (Pieles Grasas) La Roche Posay 150ml',
      brand: 'Acorelle',
      brand_code: 'acorelle',
      price: 107,
      rrp_price: 115.2,
      position: 2,
      category: 'baby_kids/baby_kids_diapers_changing/diapers_changing_bio',
      format: 'Jarra',
      format_code: 'jar',
      quantity: 1,
      sku: '904770952170'
    }
  ],
  nonInteraction: 1
}

export const reportedPromotionClicked = {
  name: 'Make the most of your money',
  promotion_id: '1',
  creative:
    '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
}

export const reportedPromotionList = {
  promotions: [
    {
      name: 'Make the most of your money',
      promotion_id: '1',
      position: 1,
      creative:
        '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
    },
    {
      name: 'Make the most of your money',
      promotion_id: '1',
      position: 2,
      creative:
        '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
    }
  ],
  nonInteraction: 1
}

export const productViewedPayload = {
  product: {
    name: 'Nuxe Huile Prodigieuse OU 50 ml',
    sku: '531143449295',
    gtin: '1234567890123',
    id: '531143449295',
    url: '/nuxe-huile-prodigieuse-ou-50-ml',
    brand: { code: 'nuxe', label: 'Nuxe' },
    categories: {
      lvl0: ['medicines', 'medicines', 'vitamins_supplements'],
      lvl1: [
        'Test_new_category',
        'medicines_diabetes',
        'vitamins_supplements_minerals'
      ]
    },
    format: { code: 'capsule', label: 'Cápsula' },
    productDatImage: 'https://cloudfront.net/test.png',
    largeImage: 'https://cloudfront.net/test.png',
    thumbnailImage: '',
    mediumImage: '',
    productTileImage: '',
    productTileRetinaImage: '',
    maxQuantity: 50,
    description: '<p>Nuxe Huile Prodigieuse OU 50 ml</p>',
    shortDescription:
      '<p><b>Óleo seco de efeito de luz</b></p><p> Rosto, corpo e cabelo</p>',
    metaTitle: 'Nuxe Huile Prodigieuse OU 50 ml - Atida',
    metaDescription:
      'Nuxe Huile Prodigieuse OU 50 ml ÓLEO SECO MULTIFUNÇÕES COM EFEITO DE BRILHO Óleo seco de efeito radiante - rosto, corpo e cabelo EFICAZ POR NATUREZA',
    unitVolume: { unit: 'MILLILITER', amount: 50, unitLabel: 'ml' },
    usageNotes:
      'Aplicar este óleo seco no rosto, corpo e cabelo durante todo o ano, verão e no inverno.',
    price: { currency: 'EUR', value: 1748 },
    pricePerUnit: { value: 3496, currency: 'EUR', unit: '100 ml' },
    rrp: { value: 2075, currency: 'EUR' },
    labels: [{ type: 'discount' as InfoLabelEnum.Discount, label: '-15%' }]
  },
  basketQuantity: 1,
  positionInBasket: 12
}

export const reportedProductViewed = (couponCode = 'CouponCode01') => ({
  product_id: '531143449295',
  objectID: '531143449295',
  sku: '531143449295',
  category: 'medicines/Test_new_category',
  coupon: couponCode,
  name: 'Nuxe Huile Prodigieuse OU 50 ml',
  brand: 'Nuxe',
  brand_code: 'nuxe',
  format: 'Cápsula',
  format_code: 'capsule',
  price: 17.48,
  rrp_price: 20.75,
  currency: 'EUR',
  quantity: 1,
  position: 12,
  value: 17.48,
  url: 'http://localhost/nuxe-huile-prodigieuse-ou-50-ml',
  image_url: 'https://cloudfront.net/test.png',
  nonInteraction: 1
})

export const productListFilteredPayload = {
  products: [
    {
      name: 'Test pt_PT Product Name 985457884132',
      sku: '985457884132',
      id: '985457884132',
      url: '/test-pt-pt-product-name-985457884132',
      brand: { code: '100_natural', label: '100% Natural' },
      format: { code: 'capsule', label: 'Cápsula' },
      productDatImage:
        'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
      thumbnailImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      mediumImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      largeImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileRetinaImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      description: 'Description pt_PT',
      categories: {
        lvl0: ['medicines', 'medicines', 'vitamins_supplements'],
        lvl1: [
          'Test_new_category',
          'medicines_diabetes',
          'vitamins_supplements_minerals'
        ]
      },
      unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' },
      price: { currency: 'EUR', value: 20000 },
      pricePerUnit: { value: 20000, currency: 'EUR', unit: '100ml' },
      rrp: { value: 888, currency: 'EUR' },
      basketQuantity: 1,
      position: 1
    },
    {
      name: 'Serozinc (Pieles Grasas) La Roche Posay 150ml',
      sku: '904770952170',
      id: '904770952170',
      brand: { code: 'acorelle', label: 'Acorelle' },
      format: { code: 'jar', label: 'Jarra' },
      productDatImage:
        'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
      thumbnailImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      mediumImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      largeImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileRetinaImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      description:
        '<p><strong>NaturGreen Chocolate a la Taza BIO 225gr</strong>\n  </p><p>Disfruta de una agradable y deliciosa taza de chocolate caliente, elaborada con cacao ecol√≥gico.\n  </p><p>Ideal para desayunos y meriendas.\n  </p><p>Perfecto para preparar con leche o una bebida vegetal: de soja, almendras,...\n  </p><p><strong>No contiene gluten. Apto para cel√≠acos</strong>.\n  </p>',
      categories: {
        lvl0: ['baby_kids', 'vitamins_supplements'],
        lvl1: ['baby_kids_diapers_changing', 'vitamins_supplements_minerals'],
        lvl2: ['diapers_changing_bio']
      },
      metaTitle: 'meta title PT test 10',
      metaDescription: 'meta description PT test 10',
      unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' },
      price: { currency: 'EUR', value: 10700 },
      pricePerUnit: { value: 10700, currency: 'EUR', unit: '100ml' },
      rrp: { value: 11520, currency: 'EUR' },
      basketQuantity: 1,
      position: 2
    }
  ],
  filters: [
    { type: 'brand', value: 'Aptiva' },
    { type: 'categoryLvl0', value: 'Beleza' }
  ],
  type: 'pop'
}

export const productListViewedPayload = {
  products: [
    {
      name: 'Test pt_PT Product Name 985457884132',
      sku: '985457884132',
      id: '985457884132',
      url: '/test-pt-pt-product-name-985457884132',
      brand: { code: '100_natural', label: '100% Natural' },
      format: { code: 'capsule', label: 'Cápsula' },
      productDatImage:
        'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
      thumbnailImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      mediumImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      largeImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileRetinaImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      description: 'Description pt_PT',
      categories: {
        lvl0: ['medicines', 'medicines', 'vitamins_supplements'],
        lvl1: [
          'Test_new_category',
          'medicines_diabetes',
          'vitamins_supplements_minerals'
        ]
      },
      unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' },
      price: { currency: 'EUR', value: 20000 },
      pricePerUnit: { value: 20000, currency: 'EUR', unit: '100ml' },
      rrp: { value: 888, currency: 'EUR' },
      basketQuantity: 1,
      position: 1
    },
    {
      name: 'Serozinc (Pieles Grasas) La Roche Posay 150ml',
      sku: '904770952170',
      id: '904770952170',
      brand: { code: 'acorelle', label: 'Acorelle' },
      format: { code: 'jar', label: 'Jarra' },
      productDatImage:
        'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
      thumbnailImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      mediumImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      largeImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      productTileRetinaImage:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
      description:
        '<p><strong>NaturGreen Chocolate a la Taza BIO 225gr</strong>\n  </p><p>Disfruta de una agradable y deliciosa taza de chocolate caliente, elaborada con cacao ecol√≥gico.\n  </p><p>Ideal para desayunos y meriendas.\n  </p><p>Perfecto para preparar con leche o una bebida vegetal: de soja, almendras,...\n  </p><p><strong>No contiene gluten. Apto para cel√≠acos</strong>.\n  </p>',
      categories: {
        lvl0: ['baby_kids', 'vitamins_supplements'],
        lvl1: ['baby_kids_diapers_changing', 'vitamins_supplements_minerals'],
        lvl2: ['diapers_changing_bio']
      },
      metaTitle: 'meta title PT test 10',
      metaDescription: 'meta description PT test 10',
      unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' },
      price: { currency: 'EUR', value: 10700 },
      pricePerUnit: { value: 10700, currency: 'EUR', unit: '100ml' },
      rrp: { value: 11520, currency: 'EUR' },
      basketQuantity: 1,
      position: 2
    }
  ],
  index: undefined,
  category: 'vitamins_supplements_minerals',
  list_view: ProductViews.GRID,
  type: 'pop'
}

export const promotionClickedPayload = {
  name: 'Make the most of your money',
  promotion_id: '1',
  position: 2,
  creative:
    '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
}

export const promotionListViewedPayload = {
  promotions: [
    {
      title: 'Make the most of your money',
      id: '1',
      description: 'Free product with every purchase',
      color: 'category-medicine',
      teaserDescription: 'Free product with every purchase',
      isContentWithImage: false,
      url: 'promotions/avene',
      image: {
        description: '',
        title: 'Beauty Category Image',
        url:
          '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',

        type: 'image/png'
      },
      name: 'Make the most of your money',
      promotion_id: '1',
      position: 2,
      creative:
        '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
    },
    {
      title: 'Make the most of your money',
      id: '1',
      description: 'Free product with every purchase',
      color: 'category-medicine',
      teaserDescription: 'Free product with every purchase',
      isContentWithImage: false,
      url: 'promotions/avene',
      image: {
        description: '',
        title: 'Beauty Category Image',
        url:
          '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',
        type: 'image/png'
      },
      name: 'Make the most of your money',
      promotion_id: '1',
      position: 2,
      creative:
        '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
    }
  ]
}

export const reportedProductRemoved = () => {
  return {
    cart_id: 'f0849e9c-6712-54b9-8db5-440438d03387',
    product_id: '100000001',
    sku: '100000001',
    category: 'main',
    name: 'Test Product 1',
    brand: 'Atida',
    brand_code: 'atida',
    variant: '',
    price: 98.49,
    currency: 'EUR',
    isPromo: false,
    quantity: 1,
    position: 0,
    url:
      'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
    image_url:
      'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
    remaining_products: [
      {
        brand: 'Atida',
        brand_code: 'atida',
        category: 'main',
        image_url:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        name: 'Test Product 2',
        position: 1,
        price: 98.49,
        currency: 'EUR',
        isPromo: false,
        product_id: '100000002',
        quantity: 7,
        sku: '100000002',
        url:
          'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      },
      {
        brand: 'Atida',
        brand_code: 'atida',
        category: 'main',
        image_url:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        name: 'Test Product 3',
        position: 2,
        price: 98.49,
        isPromo: false,
        currency: 'EUR',
        product_id: '100000003',
        quantity: 3,
        sku: '100000003',
        url:
          'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      }
    ]
  }
}

export const reportedProductAdded = (
  couponCode = 'CouponCode01',
  unitPrice = 98.49
) => {
  return {
    cart_id: 'f0849e9c-6712-54b9-8db5-440438d03387',
    product_id: '100000001',
    objectID: '100000001',
    index: 'index-pt-pt',
    sku: '100000001',
    category: 'main',
    currency: 'EUR',
    coupon: couponCode,
    name: 'Test Product 1',
    brand: 'Atida',
    brand_code: 'atida',
    variant: '',
    isPromo: false,
    price: unitPrice,
    quantity: 1,
    position: 0,
    url:
      'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
    image_url:
      'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
    remaining_products: [
      {
        brand: 'Atida',
        brand_code: 'atida',
        category: 'main',
        currency: 'EUR',
        gift: {},
        image_url:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        name: 'Test Product 1',
        position: 0,
        price: unitPrice,
        product_id: '100000001',
        quantity: 1,
        isPromo: false,
        rrp_price: 99.99,
        sku: '100000001',
        url:
          'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      },
      {
        brand: 'Atida',
        brand_code: 'atida',
        category: 'main',
        currency: 'EUR',
        gift: {},
        image_url:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        name: 'Test Product 2',
        position: 1,
        price: unitPrice,
        isPromo: false,
        product_id: '100000002',
        quantity: 7,
        rrp_price: 99.99,
        sku: '100000002',
        url:
          'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      },
      {
        brand: 'Atida',
        brand_code: 'atida',
        category: 'main',
        currency: 'EUR',
        gift: {},
        image_url:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        name: 'Test Product 3',
        position: 2,
        price: unitPrice,
        product_id: '100000003',
        isPromo: false,
        quantity: 3,
        rrp_price: 99.99,
        sku: '100000003',
        url:
          'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      }
    ]
  }
}

export const reportedProductFavourites = () => {
  return {
    product_id: '100000001',
    sku: '100000001',
    category: 'main',
    currency: 'EUR',
    name: 'Test Product 1',
    brand: {
      code: 'atida',
      label: 'Atida'
    },
    price: {
      value: 138,
      currency: 'EUR'
    },
    quantity: 1,
    position: 0,
    url:
      'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
    image_url:
      'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
  }
}

export const reportedEmailSubscription = {
  email: 'testemail@atida.com',
  subscribed_from: 'account_update',
  email_list: '',
  email_hash: 'ef3898b03fad009a029804a3d2e2fef7e6ed270a0d5b3ea1d91614bbef727cd9'
}

export const reportedAccountUpdated = {
  information_updated: ['first_name']
}

export const reportedCheckoutStepCompleted = {
  payment_method: 'multibanco',
  cart_id: '24c2f9c7-0905-55e6-970a-e1f196b343e8',
  shipping_method: 'Correo Express',
  step: 3,
  step_name: 'confirmation',
  is_social: false
}

export const reportedCheckoutStepDelivery = {
  cart_id: '24c2f9c7-0905-55e6-970a-e1f196b343e8',
  shipping_method: 'Correo Express',
  step: 2,
  step_name: 'delivery',
  is_social: false
}

export const reportedAddPaymentInfo = {
  payment_method: 'multibanco',
  cart_id: '24c2f9c7-0905-55e6-970a-e1f196b343e9',
  success: true,
  is_social: false
}

export const reportedSocialLoginUserInteraction = {
  is_social: true,
  social_platform: 'google'
}

export const reportedEmailUnsubscription = {
  email: 'testemail@atida.com',
  unsubscribed_from: 'account_update',
  email_list: '',
  email_hash: 'ef3898b03fad009a029804a3d2e2fef7e6ed270a0d5b3ea1d91614bbef727cd9'
}

export const reportedLoginFailed = {
  email_hash:
    'ef3898b03fad009a029804a3d2e2fef7e6ed270a0d5b3ea1d91614bbef727cd9',
  error_message: 'login.error.content',
  error_key: 'login.error.content',
  is_social: false,
  social_platform: ''
}

export const reportedSocialLoginFailed = {
  email_hash:
    'ef3898b03fad009a029804a3d2e2fef7e6ed270a0d5b3ea1d91614bbef727cd9',
  error_message: 'login.error.content',
  error_key: 'login.error.content',
  is_social: true,
  social_platform: 'google'
}

export const reportedAccountBlocked = {
  error_message: 'login.lockout-error.content',
  error_key: 'login.lockout-error.content',
  is_social: false,
  social_platform: ''
}

export const reportedAccountCreatedFailed = {
  error_message: 'create-account.unexpected-error',
  error_key: 'create-account.unexpected-error',
  is_social: false,
  social_platform: ''
}

export const reportedAccountCreationStepCompleted = {
  step: 1,
  step_name: 'name_and_email'
}

export const reportedPasswordResetFailed = {
  error_message: 'account.password-reset.unexpected-error',
  error_key: 'account.password-reset.unexpected-error'
}

export const reportedShippingMethodSelected = {
  cart_id: '24c2f9c7-0905-55e6-970a-e1f196b343e9',
  shipping_method: 'Correo Express',
  step: 1,
  is_first_order: true
}

export const reportedOrder = (
  couponCode = 'CouponCode01',
  totalPrice = 99.99,
  taxTotal = 15.96
) => ({
  order_id: 'PT--2888',
  affiliation: 'PT',
  coupon: couponCode,
  index: 'product-ecommerce-pt-pt_pt',
  is_first_order: true,
  total: totalPrice,
  revenue: totalPrice - taxTotal,
  shipping: 3.99,
  tax: taxTotal,
  discount: 0,
  currency: 'EUR',
  status: 'success',
  payment_method: 'braintree_card',
  products: [
    {
      product_id: '100000001',
      objectID: '100000001',
      sku: '100000001',
      category: 'main',
      name: 'Test Product 1',
      brand: 'Atida',
      variant: '',
      coupon: 'CouponCode01',
      price: 98.49,
      quantity: 1,
      position: 1,
      isPromo: false,
      url:
        'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
      image_url:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
    },
    {
      product_id: '100000002',
      objectID: '100000002',
      sku: '100000002',
      category: 'main',
      name: 'Test Product 2',
      brand: 'Atida',
      isPromo: false,
      variant: '',
      coupon: 'CouponCode01',
      price: 98.49,
      quantity: 7,
      position: 2,
      url:
        'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
      image_url:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
    },
    {
      product_id: '100000003',
      objectID: '100000003',
      sku: '100000003',
      category: 'main',
      isPromo: false,
      name: 'Test Product 3',
      brand: 'Atida',
      variant: '',
      coupon: 'CouponCode01',
      price: 98.49,
      quantity: 3,
      position: 3,
      url:
        'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
      image_url:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
    }
  ],
  nonInteraction: 1,
  is_social: false
})

export const orderedProduct = () => ({
  sku: '100000001',
  order_id: 'PT--2888',
  brand: 'Atida',
  category: 'main',
  image_url:
    'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
  index: 'product-ecommerce-pt-pt_pt',
  name: 'Test Product 1',
  objectID: '100000001',
  position: 1,
  price: 98.49,
  private_label: '',
  product_id: '100000001',
  isPromo: false,
  quantity: 1,
  is_first_order: true,
  url:
    'https://atida.com/pt-pt/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
  revenue: 96.99,
  tax: 1.5,
  discount: 9.99,
  payment_method: 'braintree_card',
  currency: 'EUR',
  variant: ''
})

export const pageCategoryPayload = {
  page: 'page',
  pageType: 'pageType',
  category: {
    id: 'diet_exercise_weight_loss_nutrition',
    color: 'category-nutrition-exercise-and-weight-loss',
    image: {
      url: 'https://images.net/sample.png',
      title: 'Test title',
      description: 'Test description',
      type: 'Test type'
    },
    level: 1,
    subcategories: [] as CategoryLink[]
  }
}

export const reportedCheckoutStepViewed = {
  cart_id: '24c2f9c7-0905-55e6-970a-e1f196b343e8',
  shipping_method: 'Correo Express',
  step: 3,
  step_name: 'confirmation',
  nonInteraction: 1,
  is_social: false
}

export const reportedCheckoutStepViewedGuest = {
  cart_id: '24c2f9c7-0905-55e6-970a-e1f196b343e8',
  shipping_method: 'Correo Express',
  step: 2,
  step_name: 'payment',
  nonInteraction: 1,
  is_social: false
}

export const reportedCheckoutStarted = {
  cart_id: 'a0a8f22c-d18d-58ed-90f9-48157ee8deb9',
  currency: 'EUR',
  discount: 1.22,
  revenue: 26.12,
  tax: 15.96,
  total: 26.12,
  is_social: false,
  products: [
    {
      brand: 'Arkopharma',
      brand_code: 'arkopharma',
      category: 'vitamins_supplements/vitamins_supplements_multivitamins',
      format: 'Arkopharma',
      format_code: 'aceite',
      product_id: '996604986894',
      name: 'Óleo de Argan Arko essencial 30 ml',
      tax: 3.4,
      price: 8.74,
      labels: [{ type: 'discount', label: '-43%' }],
      quantity: 2,
      rrp_price: 21.66,
      sku: '996604986894',
      isPromo: false,
      image_url:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/8902623F-C424-420D-90C6F1F4DC39D6F8/Product%20High-EF7C917B-9E9C-4F87-ABBAA0AD4BAFEA02.jpg'
    },
    {
      brand: 'Solgar',
      brand_code: 'solgar',
      category: 'vitamins_supplements/vitamins_supplements_multivitamins',
      format: 'Solgar',
      tax: 3.4,
      format_code: 'jar',
      product_id: '999945808996',
      name: 'Solgar líquido complexo de vitamina B B 2000 mcg 59 ml',
      price: 14.4,
      labels: [
        { type: 'promotion', label: 'test promo label' },
        {
          label: '-20%',
          type: 'discount'
        }
      ],
      quantity: 1,
      rrp_price: 22.35,
      sku: '999945808996',
      isPromo: false,
      image_url:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/72D1A0C5-310C-4C1C-81E8500F78455CD5/Product%20High-FF810AEA-CBB9-46C9-92C203126C50B603.jpg'
    }
  ]
}

export const reportedCart = {
  cart_id: 'a0a8f22c-d18d-58ed-90f9-48157ee8deb9',
  products: [
    {
      product_id: '996604986894',
      sku: '996604986894',
      name: 'Óleo de Argan Arko essencial 30 ml',
      brand: 'Arkopharma',
      brand_code: 'arkopharma',
      isPromo: false,
      category: 'vitamins_supplements/vitamins_supplements_multivitamins',
      format: 'Óleo',
      format_code: 'aceite',
      labels: [{ type: 'discount', label: '-43%' }],
      price: 8.74,
      rrp_price: 21.66,
      quantity: 2,
      position: 1,
      url: 'http://localhost/oleo-de-argan-arko-essencial-30-ml',
      image_url:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/8902623F-C424-420D-90C6F1F4DC39D6F8/Product%20High-EF7C917B-9E9C-4F87-ABBAA0AD4BAFEA02.jpg'
    },
    {
      product_id: '999945808996',
      sku: '999945808996',
      name: 'Solgar líquido complexo de vitamina B B 2000 mcg 59 ml',
      brand: 'Solgar',
      isPromo: false,
      brand_code: 'solgar',
      category: 'vitamins_supplements/vitamins_supplements_multivitamins',
      format: 'Jarra',
      format_code: 'jar',
      availability: 'AVAILABLE',
      labels: [
        { type: 'promotion', label: 'test promo label' },
        { type: 'discount', label: '-20%' }
      ],
      price: 14.4,
      rrp_price: 22.35,
      currency: 'EUR',
      quantity: 1,
      position: 2,
      url:
        'http://localhost/solgar-liquido-complexo-de-vitamina-b-b-2000-mcg-59-ml',
      image_url:
        'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/72D1A0C5-310C-4C1C-81E8500F78455CD5/Product%20High-FF810AEA-CBB9-46C9-92C203126C50B603.jpg'
    }
  ],
  nonInteraction: 1
}

export const cartState: DeepPartial<RootState> = {
  client: {
    basket: {
      content: {
        data: {
          id: 'a0a8f22c-d18d-58ed-90f9-48157ee8deb9',
          currency: 'EUR',
          discounts: [],
          discountTotal: 122,
          coupons: [],
          items: [
            {
              sku: '996604986894',
              id: '996604986894',
              quantity: 2,
              unitPrice: 1214,
              subtotal: 2428,
              tax: 340,
              isPromo: false,
              product: {
                name: 'Óleo de Argan Arko essencial 30 ml',
                url: '/oleo-de-argan-arko-essencial-30-ml',
                brand: { code: 'arkopharma', label: 'Arkopharma' },
                categories: {
                  lvl0: ['vitamins_supplements', 'vitamins_supplements'],
                  lvl1: [
                    'vitamins_supplements_multivitamins',
                    'vitamins_supplements_vitamins_baby_children'
                  ]
                },
                format: { code: 'aceite', label: 'Óleo' },
                productDatImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/8902623F-C424-420D-90C6F1F4DC39D6F8/Product%20Tile%20Thumbnail-EF7C917B-9E9C-4F87-ABBAA0AD4BAFEA02.jpg',
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/8902623F-C424-420D-90C6F1F4DC39D6F8/Product%20Tile%20Thumbnail-EF7C917B-9E9C-4F87-ABBAA0AD4BAFEA02.jpg',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/8902623F-C424-420D-90C6F1F4DC39D6F8/Product%20Medium-EF7C917B-9E9C-4F87-ABBAA0AD4BAFEA02.jpg',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/8902623F-C424-420D-90C6F1F4DC39D6F8/Product%20High-EF7C917B-9E9C-4F87-ABBAA0AD4BAFEA02.jpg',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                description: '<p><b>Óleo de Argan Arko essencial 30 ml</b></p>',
                shortDescription:
                  '<p>0% óleo vegetal puro e natural para nutrir e hidratar o nosso líquido ouro da Pelé Marrocos</p>',
                metaTitle:
                  'Comprar: Aceite de Argan Arko Esencial 30 ml | MiFarma.pt',
                metaKeywords: 'Óleo de Argan Arko essencial 30 ml',
                metaDescription: 'Óleo de Argan Arko essencial',
                usageNotes: 'Aplicar sobre a área a ser tratada',
                rrp: { value: 2166, currency: 'EUR' },
                labels: [{ type: InfoLabelEnum.Discount, label: '-43%' }]
              }
            },
            {
              sku: '999945808996',
              id: '999945808996',
              quantity: 1,
              tax: 340,
              unitPrice: 1780,
              subtotal: 1780,
              isPromo: false,
              product: {
                name: 'Solgar líquido complexo de vitamina B B 2000 mcg 59 ml',
                url: '/solgar-liquido-complexo-de-vitamina-b-b-2000-mcg-59-ml',
                brand: { code: 'solgar', label: 'Solgar' },
                categories: {
                  lvl0: ['vitamins_supplements', 'vitamins_supplements'],
                  lvl1: [
                    'vitamins_supplements_multivitamins',
                    'vitamins_supplements_vitamins_baby_children'
                  ]
                },
                format: { code: 'jar', label: 'Jarra' },
                productDatImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/72D1A0C5-310C-4C1C-81E8500F78455CD5/Product%20Tile%20Thumbnail-FF810AEA-CBB9-46C9-92C203126C50B603.jpg',
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/72D1A0C5-310C-4C1C-81E8500F78455CD5/Product%20Tile%20Thumbnail-FF810AEA-CBB9-46C9-92C203126C50B603.jpg',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/72D1A0C5-310C-4C1C-81E8500F78455CD5/Product%20Medium-FF810AEA-CBB9-46C9-92C203126C50B603.jpg',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/72D1A0C5-310C-4C1C-81E8500F78455CD5/Product%20High-FF810AEA-CBB9-46C9-92C203126C50B603.jpg',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                description:
                  '<p><strong>Solgar Vitamin BB Complex Liquid 2000 mcg 59 ml</strong></p>',
                shortDescription:
                  '<p>Suplemento nutricional rico em vitaminas do grupo B</p>',
                metaTitle:
                  'Solgar líquido complexo de vitamina B B 2000 mcg 59 ml - Vitaminas e minerais - Nutrição | MiFarma.pt',
                metaKeywords:
                  'Solgar líquido complexo de vitamina B B 2000 mcg 59 ml',
                metaDescription:
                  'Solgar Vitamin BB Complex Liquid 2000 mcg 59 ml Suplemento nutricional',
                unitVolume: {
                  unit: 'MILLILITER',
                  amount: 59.0,
                  unitLabel: 'ml'
                },
                usageNotes:
                  'Tome 1-2 ml (um conta-gotas cheio) ao dobro do dia. Coloque o líquido debaixo da língua e mantê-lo 10 segundos antes de engolir.',
                pricePerUnit: {
                  value: 3016,
                  currency: 'EUR',
                  unit: '100 ml'
                },
                rrp: { value: 2235, currency: 'EUR' },
                availability: 'AVAILABLE',
                labels: [
                  { type: InfoLabelEnum.Promotion, label: 'test promo label' },
                  { type: InfoLabelEnum.Discount, label: '-20%' }
                ]
              }
            }
          ],
          subTotal: 4208,
          shippingTotal: 0,
          grandTotal: 4208,
          rrpTotal: 4208,
          taxTotal: 1596
        }
      }
    }
  }
}
export const coupon = {
  cart_id: 'a0a8f22c-d18d-58ed-90f9-48157ee8deb9',
  coupon_id: 'test_coupon',
  coupon_name: 'test coupon',
  discount: 6.3,
  discount_percent: 0.15
}

//@ts-ignore
export const getOrderInitialState = {
  details: basketWithProducts
}

export const productClickedPayload = {
  product: {
    url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
    name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
    brand: { code: 'atida', label: 'Atida' },
    id: '100000000',
    sku: '100000000',
    categories: { lvl0: ['main'] },
    format: { code: 'shampooCode', label: 'Shampoo' },
    largeImage:
      'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
    unitVolume: {
      amount: 100,
      unit: 'MILLILITER',
      unitLabel: 'ml'
    },
    price: {
      value: 8888,
      currency: 'EUR'
    },
    pricePerUnit: {
      value: 8888,
      currency: 'EUR',
      unit: '100 ml'
    },
    rrp: {
      value: 9999,
      currency: 'EUR'
    },
    labels: [
      {
        type: InfoLabelEnum.Promotion,
        label: 'Free sponge'
      },
      {
        type: InfoLabelEnum.Discount,
        label: '-11%'
      }
    ]
  },
  positionInTheList: 1
}

export const reportedProductClicked = {
  brand: 'Atida',
  brand_code: 'atida',
  category: 'main',
  currency: 'EUR',
  format: 'Shampoo',
  format_code: 'shampooCode',
  image_url:
    'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
  name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
  objectID: '100000000',
  price: 88.88,
  product_id: '100000000',
  quantity: 1,
  position: 1,
  rrp_price: 99.99,
  sku: '100000000',
  url:
    'http://localhost/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
}

export const reportedNavigationItemButtonClicked = {
  button_name: 'Custom button name',
  button_clicked_from: 'account_menu_list'
}

export const reportBasketIconClicked = {
  icon_clicked_from: 'basket_header'
}
