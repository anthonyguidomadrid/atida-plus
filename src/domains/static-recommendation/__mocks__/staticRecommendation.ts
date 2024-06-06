import { InfoLabelEnum } from '~domains/product'

export const labelsMock = [
  {
    type: InfoLabelEnum.Promotion,
    label: 'Free sponge'
  },
  {
    type: InfoLabelEnum.PricingTagOutlet,
    label: 'Outlet'
  },
  {
    type: InfoLabelEnum.Discount,
    label: '-11%'
  }
]

export const staticRecommendationPayload = {
  list: [
    {
      key: '100000001100000002100000003',
      products: ['100000001', '100000002', '100000003']
    }
  ],
  sessionChannel: { sku: '100000001', channel: 'amazon' }
}

export const staticRecommendationNormalizedDataResponse = [
  {
    key: '100000001100000002100000003',
    products: [
      {
        name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
        enabled: true,
        sku: '100000001',
        url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
        alternativeUrls: {
          'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
          'es-es': ''
        },
        format: { code: 'shampooCode', label: 'Shampoo' },
        thumbnailImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        largeImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        mediumImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        productDatImage:
          'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
        productTileImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        productTileRetinaImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' },
        price: { currency: 'EUR', value: 8888 },
        pricePerUnit: { currency: 'EUR', unit: '100 ml', value: 8888 },
        rrp: { value: 9999, currency: 'EUR' },
        availability: 'AVAILABLE',
        labels: [
          { type: 'pricing-tag-outlet', label: 'Outlet' },
          { type: 'discount', label: '-11%' }
        ]
      },
      {
        name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
        enabled: true,
        sku: '100000002',
        url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
        alternativeUrls: {
          'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
          'es-es': ''
        },
        format: { code: 'shampooCode', label: 'Shampoo' },
        thumbnailImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        largeImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        mediumImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        productDatImage:
          'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
        productTileImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        productTileRetinaImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' },
        price: { currency: 'EUR', value: 8888 },
        pricePerUnit: { currency: 'EUR', unit: '100 ml', value: 8888 },
        rrp: { value: 9999, currency: 'EUR' },
        availability: 'AVAILABLE',
        labels: [
          { type: 'pricing-tag-outlet', label: 'Outlet' },
          { type: 'discount', label: '-11%' }
        ]
      },
      {
        name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
        enabled: true,
        sku: '100000003',
        url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
        alternativeUrls: {
          'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
          'es-es': ''
        },
        format: { code: 'shampooCode', label: 'Shampoo' },
        thumbnailImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        largeImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        mediumImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        productDatImage:
          'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
        productTileImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        productTileRetinaImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
        unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' },
        price: { currency: 'EUR', value: 8888 },
        pricePerUnit: { currency: 'EUR', unit: '100 ml', value: 8888 },
        rrp: { value: 9999, currency: 'EUR' },
        availability: 'AVAILABLE',
        labels: [
          { type: 'pricing-tag-outlet', label: 'Outlet' },
          { type: 'discount', label: '-11%' }
        ]
      }
    ]
  }
]

export const elasticSearchResponseMock = {
  body: {
    docs: [
      {
        _index: 'product-ecommerce-pt-pt_pt',
        _type: '_doc',
        _id: '100000001',
        _score: 1.0,
        found: true,
        _source: {
          name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
          enabled: true,
          attributes: {
            // @ts-ignore
            url_slug_pt_pt:
              'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
            // @ts-ignore
            url_slug_es_es: '',
            ean: '3578830114626',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'shampooCode', label: 'Shampoo' },
            content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
            content_size_factor: 1,
            description_long:
              '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
            tag: { code: 'outlet', label: 'Outlet' },
            categories: { lvl0: ['main'] },
            id_tax_set: 1,
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Landscape-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Portrait-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
              }
            ],
            national_code: '2'
          },
          price: { currency: 'EUR', sale: 8888, rrp: 9999, cost: 9999 },
          availability_state: 'AVAILABLE',
          created: '2021-02-24T10:07:27+00:00',
          updated: '2021-02-24T10:07:27+00:00',
          pharmaceutical_advice: 'Some advice'
        }
      },
      {
        _index: 'product-ecommerce-pt-pt_pt',
        _type: '_doc',
        _id: '100000002',
        _score: 1.0,
        found: true,
        _source: {
          name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
          enabled: true,
          attributes: {
            // @ts-ignore
            url_slug_pt_pt:
              'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
            // @ts-ignore
            url_slug_es_es: '',
            ean: '3578830114626',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'shampooCode', label: 'Shampoo' },
            content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
            content_size_factor: 1,
            description_long:
              '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
            tag: { code: 'outlet', label: 'Outlet' },
            categories: { lvl0: ['main'] },
            id_tax_set: 1,
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Landscape-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Portrait-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
              }
            ],
            national_code: '2'
          },
          price: { currency: 'EUR', sale: 8888, rrp: 9999, cost: 9999 },
          availability_state: 'AVAILABLE',
          created: '2021-02-24T10:07:27+00:00',
          updated: '2021-02-24T10:07:27+00:00',
          pharmaceutical_advice: 'Some advice'
        }
      },
      {
        _index: 'product-ecommerce-pt-pt_pt',
        _type: '_doc',
        _id: '100000003',
        _score: 1.0,
        found: true,
        _source: {
          name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
          enabled: true,
          attributes: {
            // @ts-ignore
            url_slug_pt_pt:
              'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
            // @ts-ignore
            url_slug_es_es: '',
            ean: '3578830114626',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'shampooCode', label: 'Shampoo' },
            content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
            content_size_factor: 1,
            description_long:
              '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
            tag: { code: 'outlet', label: 'Outlet' },
            categories: { lvl0: ['main'] },
            id_tax_set: 1,
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Landscape-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Portrait-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
              }
            ],
            national_code: '2'
          },
          price: { currency: 'EUR', sale: 8888, rrp: 9999, cost: 9999 },
          availability_state: 'AVAILABLE',
          created: '2021-02-24T10:07:27+00:00',
          updated: '2021-02-24T10:07:27+00:00',
          pharmaceutical_advice: 'Some advice'
        }
      }
    ]
  }
}

export const minimalElasticSearchResponseMock = {
  body: {
    docs: [
      {
        _index: 'product-ecommerce-pt-pt_pt',
        _type: '_doc',
        _id: '100000001',
        _score: 1.0,
        found: true,
        _source: {
          name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
          enabled: true,
          attributes: {
            // @ts-ignore
            url_slug_pt_pt:
              'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
            // @ts-ignore
            url_slug_es_es: '',
            ean: '3578830114626',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'shampooCode', label: 'Shampoo' },
            content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
            content_size_factor: 1,
            description_long:
              '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
            tag: { code: 'outlet', label: 'Outlet' },
            categories: { lvl0: ['main'] },
            id_tax_set: 1,
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Landscape-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Portrait-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
              }
            ],
            national_code: '2'
          },
          price: { currency: 'EUR', sale: 8888, rrp: 9999, cost: 9999 },
          availability_state: 'AVAILABLE',
          created: '2021-02-24T10:07:27+00:00',
          updated: '2021-02-24T10:07:27+00:00',
          pharmaceutical_advice: 'Some advice'
        }
      },
      {
        _index: 'product-ecommerce-pt-pt_pt',
        _type: '_doc',
        _id: '100000002',
        _score: 1.0,
        found: true,
        _source: {
          name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
          enabled: true,
          attributes: {
            // @ts-ignore
            url_slug_pt_pt:
              'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
            // @ts-ignore
            url_slug_es_es: '',
            ean: '3578830114626',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'shampooCode', label: 'Shampoo' },
            content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
            content_size_factor: 1,
            description_long:
              '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
            tag: { code: 'outlet', label: 'Outlet' },
            categories: { lvl0: ['main'] },
            id_tax_set: 1,
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Landscape-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Portrait-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
              }
            ],
            national_code: '2'
          },
          price: { currency: 'EUR', sale: 8888, rrp: 9999, cost: 9999 },
          availability_state: 'AVAILABLE',
          created: '2021-02-24T10:07:27+00:00',
          updated: '2021-02-24T10:07:27+00:00',
          pharmaceutical_advice: 'Some advice'
        }
      },
      {
        _index: 'product-ecommerce-pt-pt_pt',
        _type: '_doc',
        _id: '100000003',
        _score: 1.0,
        found: true,
        _source: {
          name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
          enabled: true,
          attributes: {
            // @ts-ignore
            url_slug_pt_pt:
              'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
            // @ts-ignore
            url_slug_es_es: '',
            ean: '3578830114626',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'shampooCode', label: 'Shampoo' },
            content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
            content_size_factor: 1,
            description_long:
              '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
            tag: { code: 'outlet', label: 'Outlet' },
            categories: { lvl0: ['main'] },
            id_tax_set: 1,
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Medium-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Retina-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Landscape-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Portrait-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
              }
            ],
            national_code: '2'
          },
          price: { currency: 'EUR', sale: 8888, rrp: 9999, cost: 9999 },
          availability_state: 'AVAILABLE',
          created: '2021-02-24T10:07:27+00:00',
          updated: '2021-02-24T10:07:27+00:00',
          pharmaceutical_advice: 'Some advice'
        }
      }
    ]
  }
}
