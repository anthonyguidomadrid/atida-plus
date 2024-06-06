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

export const recommendedProducts = {
  recommendationId: 'someRecommendationId',
  items: [
    {
      url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
      alternativeUrls: {
        'es-es': '',
        'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      },
      enabled: true,
      name: 'Test Product 1',
      brand: { code: 'atida', label: 'Atida' },
      sku: '100000001',
      format: { code: 'shampooCode', label: 'Shampoo' },
      gtin: '8428148462962',
      images: [
        {
          productDatImage:
            'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
          productHigh:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
          productTileThumbnail:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
        }
      ],
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
        '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
      shortDescription:
        'Preparado vegetal con harina de algarroba ecológica, ideal para desayunos y meriendas',
      metaDescription:
        'Meta description No contiene gluten. Apto para personas celíacas Meta description',
      metaKeywords: 'Meta keywords NaturGreen Algarroba Meta keywords',
      metaTitle:
        'Meta title NaturGreen Algarroba a la Taza BIO 225gr Meta title',
      unitVolume: {
        amount: 100,
        unit: 'MILLILITER',
        unitLabel: 'ml'
      },
      maxQuantity: 50,
      contentSizeFactor: 1,
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
      availability: 'AVAILABLE',
      categories: {
        lvl0: ['main']
      },
      labels: labelsMock,
      rating: {
        averageRating: 3.5,
        numberOfReviews: 100
      },
      pzn: '1234567',
      manufacturerName: 'LOreal Deutschland',
      netWeight: {
        amount: 100,
        unit: 'Grams',
        unitLabel: 'g'
      }
    },
    {
      url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
      alternativeUrls: {
        'es-es': '',
        'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      },
      enabled: true,
      name: 'Test Product 2',
      brand: { code: 'atida', label: 'Atida' },
      sku: '100000002',
      gtin: '8428148462962',
      format: { code: 'shampooCode', label: 'Shampoo' },
      images: [
        {
          productDatImage:
            'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
          productHigh:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
          productTileThumbnail:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
        }
      ],
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
        '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
      shortDescription:
        'Preparado vegetal con harina de algarroba ecológica, ideal para desayunos y meriendas',
      metaDescription:
        'Meta description No contiene gluten. Apto para personas celíacas Meta description',
      metaKeywords: 'Meta keywords NaturGreen Algarroba Meta keywords',
      metaTitle:
        'Meta title NaturGreen Algarroba a la Taza BIO 225gr Meta title',
      unitVolume: {
        amount: 100,
        unit: 'MILLILITER',
        unitLabel: 'ml'
      },
      maxQuantity: 50,
      contentSizeFactor: 1,
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
      availability: 'AVAILABLE',
      categories: {
        lvl0: ['main']
      },
      labels: labelsMock,
      rating: {
        averageRating: 3.5,
        numberOfReviews: 100
      },
      pzn: '1234567',
      manufacturerName: 'LOreal Deutschland',
      netWeight: {
        amount: 100,
        unit: 'Grams',
        unitLabel: 'g'
      }
    },
    {
      url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
      alternativeUrls: {
        'es-es': '',
        'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      },
      enabled: true,
      name: 'Test Product 3',
      brand: { code: 'atida', label: 'Atida' },
      sku: '100000003',
      gtin: '8428148462962',
      format: { code: 'shampooCode', label: 'Shampoo' },
      images: [
        {
          productDatImage:
            'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
          productHigh:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
          productTileThumbnail:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
        }
      ],
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
        '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
      shortDescription:
        'Preparado vegetal con harina de algarroba ecológica, ideal para desayunos y meriendas',
      metaDescription:
        'Meta description No contiene gluten. Apto para personas celíacas Meta description',
      metaKeywords: 'Meta keywords NaturGreen Algarroba Meta keywords',
      metaTitle:
        'Meta title NaturGreen Algarroba a la Taza BIO 225gr Meta title',
      unitVolume: {
        amount: 100,
        unit: 'MILLILITER',
        unitLabel: 'ml'
      },
      contentSizeFactor: 1,
      price: {
        value: 8888,
        currency: 'EUR'
      },
      maxQuantity: 50,
      pricePerUnit: {
        value: 8888,
        currency: 'EUR',
        unit: '100 ml'
      },
      rrp: {
        value: 9999,
        currency: 'EUR'
      },
      availability: 'AVAILABLE',
      categories: {
        lvl0: ['main']
      },
      labels: labelsMock,
      rating: {
        averageRating: 3.5,
        numberOfReviews: 100
      },
      pzn: '1234567',
      manufacturerName: 'LOreal Deutschland',
      netWeight: {
        amount: 100,
        unit: 'Grams',
        unitLabel: 'g'
      }
    },
    {
      url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
      alternativeUrls: {
        'es-es': '',
        'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      },
      enabled: true,
      name: 'Test Product 4',
      brand: { code: 'atida', label: 'Atida' },
      sku: '100000004',
      gtin: '8428148462962',
      format: { code: 'shampooCode', label: 'Shampoo' },
      images: [
        {
          productDatImage:
            'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
          productHigh:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20High-51236DF8-2D7D-4757-AF2614FABA305C0A.png',
          productTileThumbnail:
            'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/Product%20Tile%20Thumbnail-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
        }
      ],
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
        '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
      shortDescription:
        'Preparado vegetal con harina de algarroba ecológica, ideal para desayunos y meriendas',
      metaDescription:
        'Meta description No contiene gluten. Apto para personas celíacas Meta description',
      metaKeywords: 'Meta keywords NaturGreen Algarroba Meta keywords',
      metaTitle:
        'Meta title NaturGreen Algarroba a la Taza BIO 225gr Meta title',
      unitVolume: {
        amount: 100,
        unit: 'MILLILITER',
        unitLabel: 'ml'
      },
      maxQuantity: 50,
      contentSizeFactor: 1,
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
      availability: 'AVAILABLE',
      categories: {
        lvl0: ['main']
      },
      labels: labelsMock,
      rating: {
        averageRating: 3.5,
        numberOfReviews: 100
      },
      pzn: '1234567',
      manufacturerName: 'LOreal Deutschland',
      netWeight: {
        amount: 100,
        unit: 'Grams',
        unitLabel: 'g'
      }
    }
  ],
  isPersonalized: false
}

content: [
  {
    items: [
      {
        title: 'Recommendation 2 ',
        id: '61963650a6ced65cfd052155',
        type: 'PDP2',
        isSlider: true,
        quantity: null,
        altTile: 'Alternative Recommendation 2'
      }
    ]
  },
  {
    items: [
      {
        title: 'Recommendation 1',
        id: '61a63fc8eb809a4256d9a83f',
        type: 'PDP1',
        isSlider: true,
        quantity: '6',
        isPersonalized: false,
        altTile: 'Alternative Recommendation 1'
      }
    ]
  }
]

export const recommendationsCollection = {
  items: [
    {
      title: 'Recommendation 1',
      id: 'some id',
      type: 'PDP1',
      altTile: 'Alternative Recommendation 1'
    },
    {
      title: 'Recommendation 2',
      id: 'some id 2',
      type: 'PDP2',
      altTile: 'Alternative Recommendation 2'
    }
  ]
}

export const recommendationsCollectionUndefined = {
  items: []
}

export const normalizedRecommendationsCollection = [
  {
    items: [
      {
        title: 'Recommendation 1',
        id: 'some id',
        type: 'PDP1',
        altTile: 'Alternative Recommendation 1'
      },
      {
        title: 'Recommendation 2',
        id: 'some id 2',
        type: 'PDP2',
        altTile: 'Alternative Recommendation 2'
      }
    ]
  }
]

export const ExponeaRecommendationResponse = {
  data: {
    success: true,
    results: [
      {
        success: true,
        value: [
          {
            engine_name: 'metric_1625476545',
            item_id: '100000001',
            product_id: '100000001',
            recommendation_id: 'someRecommendationId',
            recommendation_source: 'model_non_personalized',
            recommendation_variant_id: null
          },
          {
            engine_name: 'metric_1625476545',
            item_id: '100000002',
            product_id: '100000002',
            recommendation_id: 'someRecommendationId',
            recommendation_source: 'model_non_personalized',
            recommendation_variant_id: null
          },
          {
            engine_name: 'metric_1625476545',
            item_id: '100000003',
            product_id: '100000003',
            recommendation_id: 'someRecommendationId',
            recommendation_source: 'model_non_personalized',
            recommendation_variant_id: null
          },
          {
            engine_name: 'metric_1625476545',
            item_id: '100000004',
            product_id: '100000004',
            recommendation_id: 'someRecommendationId',
            recommendation_source: 'model_non_personalized',
            recommendation_variant_id: null
          }
        ]
      }
    ]
  }
}

export const ExponeaAllRecommendationsResponse = {
  data: {
    data: {
      exponeaRecommendationCollection: {
        items: [
          {
            title: 'Recommendation 1',
            id: 'some id',
            type: 'PDP1',
            altTile: 'Alternative Recommendation 1'
          },
          {
            title: 'Recommendation 2',
            id: 'some id 2',
            type: 'PDP2',
            altTile: 'Alternative Recommendation 2'
          }
        ]
      }
    }
  }
}

export const ExponeaAllRecommendationsResponseUndefined = {
  data: {
    data: {
      exponeaRecommendationCollection: {
        items: undefined
      }
    }
  }
}
