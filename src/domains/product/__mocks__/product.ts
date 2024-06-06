import type { Hit } from '@algolia/client-search'
import { AlgoliaProduct, InfoLabelEnum } from '../types'

export const elasticsearchProduct = {
  body: {
    _index: 'product-ecommerce-pt-pt_pt',
    _type: '_doc',
    _id: '100000000',
    _score: 1.0,
    _source: {
      name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
      enabled: true,
      attributes: {
        // @ts-ignore
        url_slug_pt_pt:
          'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
        // @ts-ignore
        url_slug_es_es: '',
        ean: '8428148462962',
        brand: { code: 'atida', label: 'Atida' },
        format: { code: 'shampooCode', label: 'Shampoo' },
        content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
        content_size_factor: 1,
        description_long:
          '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
        description_short:
          'Preparado vegetal con harina de algarroba ecológica, ideal para desayunos y meriendas',
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
        asset_image_list: [
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/webimage-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
        ],
        meta_title:
          'Meta title NaturGreen Algarroba a la Taza BIO 225gr Meta title',
        unit_volume: {
          unit: 'MILLILITER',
          amount: 100
        },
        max_qty: 50,
        meta_keyword: 'Meta keywords NaturGreen Algarroba Meta keywords',
        meta_description:
          'Meta description No contiene gluten. Apto para personas celíacas Meta description',
        national_code: '1',
        pzn: '1234567',
        manufacturer_name: 'LOreal Deutschland',
        net_weight: {
          unit: 'Grams',
          amount: 100,
          unit_label: 'g'
        }
      },
      price: { currency: 'EUR', sale: 8888, rrp: 9999, cost: 9999 },
      availability_state: 'AVAILABLE',
      created: '2021-02-24T10:07:27+00:00',
      updated: '2021-02-24T10:07:27+00:00',
      pharmaceutical_advice: 'Some advice',
      promos: [
        'campaign-promo.yourcampaignhere.promo.hidelabel',
        'some other promo which should not appear',
        'Free sponge'
      ],
      review: {
        updated_at: 432423423,
        product_score: 3.5,
        total_reviews: 100
      }
    }
  }
}

export const elasticsearchProductPartial = {
  body: {
    _index: 'product-ecommerce-pt-pt_pt',
    _type: '_doc',
    _id: '100000001',
    _score: 1.0,
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
}

export const elasticsearchProductNoImage = {
  body: {
    ...elasticsearchProduct.body,
    _source: {
      ...elasticsearchProduct.body._source,
      attributes: {
        ...elasticsearchProduct.body._source.attributes,
        image_derivatives: []
      }
    }
  }
}

export const algoliaProduct = {
  store: 'PT',
  locale: 'pt_PT',
  sku: '100000000',
  name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
  objectID: '100000000',
  enabled: true,
  updated: '2021-01-01T00:00:00+00:00',
  promos: [
    'campaign-promo.yourcampaignhere.promo.hidelabel',
    'some other promo which should not appear',
    'Free sponge'
  ],
  attributes: {
    // @ts-ignore
    url_slug_pt_pt:
      'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
    // @ts-ignore
    url_slug_es_es: '',
    ean: '3328144462933',
    brand: { code: 'atida', label: 'Atida' },
    format: { code: 'shampooCode', label: 'Shampoo' },
    content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
    content_size_factor: 1,
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
    asset_image_list: [
      'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/webimage-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
    ],
    meta_title:
      'Meta title NaturGreen Algarroba a la Taza BIO 225gr Meta title',
    unit_volume: { unit: 'MILLILITER', amount: 100 },
    meta_keyword: 'Meta keywords NaturGreen Algarroba Meta keywords',
    description_short:
      'Preparado vegetal con harina de algarroba ecológica, ideal para desayunos y meriendas',
    description_long:
      '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>',
    meta_description:
      'Meta description No contiene gluten. Apto para personas celíacas Meta description'
  },
  price: { currency: 'EUR', sale: 9999, rrp: 9999, cost: 9999 },
  _highlightResult: '',
  availability: { state: 'AVAILABLE', updated_at: '1621347140' }
}

export const algoliaProductPartial: Hit<AlgoliaProduct> = {
  store: 'PT',
  locale: 'pt_PT',
  sku: '100000001',
  name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
  objectID: '915656387291',
  enabled: true,
  updated: '',
  promos: [],
  attributes: {
    // @ts-ignore
    url_slug_pt_pt: 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
    // @ts-ignore
    url_slug_es_es: '',
    ean: '3328144462933',
    brand: { code: 'atida', label: 'Atida' },
    format: { code: 'shampooCode', label: 'Shampoo' },
    content_size: { unit: 'MILLILITER', amount: 100, unit_label: 'ml' },
    content_size_factor: 1,
    tag: { code: 'outlet', label: 'Outlet' },
    categories: { lvl0: ['main'] },
    id_tax_set: 1,
    asset_image_list: [
      'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/F1974216-C01C-415C-B00F4AEBC6928147/webimage-51236DF8-2D7D-4757-AF2614FABA305C0A.png'
    ],
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
    description_long:
      '<p><strong>Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1</strong>\n</p><p>¡Recupera la fuerza y vitalidad de tu cabello con Forcapil!\n</p><p>Indicado para hombres y mujeres, este nutricosmético previene y combate la caída del pelo.\n</p><p>Fórmula exclusivamente con ingredientes 100% de origen natural.\n</p><p>Tiene una alta concentración en biotina, y su composición con aminoácidos, vitaminas, minerales y plantas favorece el crecimiento de la melena.\n</p><p>Se recomienda tomar en momentos en los que sufrimos una mayor pérdida de cabello, causada por estrés, menopausia, tras el parto, cambios de estación...\n</p><p><strong>Tratamiento para 3 meses: 2 + 1 de REGALO.</strong>\n</p>'
  },
  price: { currency: 'EUR', sale: 9999, rrp: 9999, cost: 9999 },
  availability: { state: 'AVAILABLE', updated_at: '1621347140' }
}

export const product = {
  url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1',
  alternativeUrls: {
    'es-es': '',
    'pt-pt': 'forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
  },
  name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
  enabled: true,
  brand: { code: 'atida', label: 'Atida' },
  sku: '100000000',
  gtin: '8428148462962',
  categories: { lvl0: ['main'] },
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
  metaTitle: 'Meta title NaturGreen Algarroba a la Taza BIO 225gr Meta title',
  maxQuantity: 50,
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
  labels: [
    {
      type: InfoLabelEnum.Promotion,
      label: 'Free sponge'
    },
    { type: InfoLabelEnum.PricingTagOutlet, label: 'Outlet' },
    {
      type: InfoLabelEnum.Discount,
      label: '-11%'
    }
  ],
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

export const productModal = {
  brand: { code: 'atida', label: 'Atida' },
  format: { code: 'shampooCode', label: 'Shampoo' },
  name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1',
  pricePerUnit: {
    value: 8888,
    currency: 'EUR',
    unit: '100 ml'
  },
  rrp: {
    value: 9999,
    currency: 'EUR'
  },
  thumbnailImage: product.thumbnailImage,
  maxQuantity: 50,
  productDatImage: product.productDatImage,
  mediumImage: product.mediumImage,
  largeImage: product.largeImage,
  productTileImage: product.productTileImage,
  productTileRetinaImage: product.productTileRetinaImage,
  unitVolume: {
    amount: 100,
    unit: 'MILLILITER',
    unitLabel: 'ml'
  },
  price: {
    value: 8888,
    currency: 'EUR'
  },
  sku: '100000000',
  gtin: '1234567890123'
}

export const productPartial = {
  url: '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas',
  name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas',
  enabled: true,
  brand: { code: 'atida', label: 'Atida' },
  sku: '100000001',
  format: { code: 'shampooCode', label: 'Shampoo' },
  image:
    'https://www.mifarma.es/media/catalog/product/cache/1/image/9d6758f7fb7476b09aa51a3fa7ce618a/1/8/180671_.jpg',
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
  unitVolume: {
    amount: 100,
    unit: 'MILLILITER',
    unitLabel: 'ml'
  },
  contentSizeFactor: 1,
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
    value: 9999,
    currency: 'EUR'
  },
  availability: 'AVAILABLE'
}
