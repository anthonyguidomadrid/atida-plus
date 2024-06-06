import { ElasticSearchProduct } from '~domains/product'
import { AlgoliaProduct } from '~domains/product/types'
import {
  elasticsearchProduct,
  elasticsearchProductPartial,
  algoliaProduct,
  algoliaProductPartial,
  elasticsearchProductNoImage
} from '~domains/product/__mocks__/product'
import {
  normalizeAlgoliaProduct,
  normalizeElasticSearchProduct,
  formatPromotionLabel,
  normalizeElasticSearchMinimalProduct
} from '../product'

describe(normalizeElasticSearchProduct, () => {
  it('normalizes the data - without session channel', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'en_GB',
      elasticsearchProduct.body
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('normalizes the data - with session channel', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'en_GB',
      elasticsearchProduct.body,
      { sku: '100000000', channel: 'amazon' },
      [{ channel: 'amazon', price: 7777 }]
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('retrieves correct url for locale', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'pt_PT',
      elasticsearchProduct.body
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('normalizes partial product data', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'en_GB',
      elasticsearchProductPartial.body
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'en_GB',
      {} as ElasticSearchProduct
    )
    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeElasticSearchProduct('en_GB')
    expect(normalizedData).toMatchSnapshot()
  })

  it('renders a default gift image if the product is a promotional item', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'en_GB',
      elasticsearchProductNoImage.body,
      undefined,
      undefined,
      true
    )
    expect(normalizedData.mediumImage).toEqual(
      '/images/no-image-Gift%20Medium.png'
    )
  })
})

describe(normalizeElasticSearchMinimalProduct, () => {
  it('normalizes the data - without session channel', () => {
    const normalizedData = normalizeElasticSearchMinimalProduct(
      'en_GB',
      elasticsearchProduct.body
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('normalizes the data - with session channel', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'en_GB',
      elasticsearchProduct.body,
      { sku: '100000000', channel: 'amazon' },
      [{ channel: 'amazon', price: 7777 }]
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('retrieves correct url for locale', () => {
    const normalizedData = normalizeElasticSearchMinimalProduct(
      'pt_PT',
      elasticsearchProduct.body
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('normalizes partial product data', () => {
    const normalizedData = normalizeElasticSearchMinimalProduct(
      'en_GB',
      elasticsearchProductPartial.body
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeElasticSearchMinimalProduct(
      'en_GB',
      {} as ElasticSearchProduct
    )
    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeElasticSearchMinimalProduct('en_GB')
    expect(normalizedData).toMatchSnapshot()
  })

  it('renders a default gift image if the product is a promotional item', () => {
    const normalizedData = normalizeElasticSearchMinimalProduct(
      'en_GB',
      elasticsearchProductNoImage.body,
      undefined,
      undefined,
      true
    )
    expect(normalizedData.mediumImage).toEqual(
      '/images/no-image-Gift%20Medium.png'
    )
  })
})

describe(normalizeAlgoliaProduct, () => {
  it('normalizes the data - without session channel', () => {
    const normalizedData = normalizeAlgoliaProduct('en_GB', algoliaProduct)

    expect(normalizedData).toMatchSnapshot()
  })

  it('normalizes the data - with session channel', () => {
    const normalizedData = normalizeAlgoliaProduct(
      'en_GB',
      algoliaProduct,
      { sku: '100000000', channel: 'amazon' },
      [{ channel: 'amazon', price: 7777 }]
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('retrieves correct url for locale', () => {
    const normalizedData = normalizeElasticSearchProduct(
      'pt_PT',
      elasticsearchProduct.body
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('normalizes partial product data', () => {
    const normalizedData = normalizeAlgoliaProduct(
      'en_GB',
      algoliaProductPartial
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeAlgoliaProduct(
      'en_GB',
      {} as AlgoliaProduct
    )
    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeAlgoliaProduct('en_GB')
    expect(normalizedData).toMatchSnapshot()
  })
})

describe(formatPromotionLabel, () => {
  it('strips input of hidelabel promos and returns 1 promo', () => {
    const formattedPromotionLabel = formatPromotionLabel([
      'test456.def.hidelabel',
      'test123.abc.nolabel'
    ])
    expect(formattedPromotionLabel).toEqual([
      {
        type: 'promotion',
        label: 'test123.abc.nolabel'
      }
    ])
  })

  it('will strip the promo since the key is not correct', () => {
    const formattedPromotionLabel = formatPromotionLabel([
      'test123.abc.nolabel',
      'test456.def.hiddenlabel'
    ])
    expect(formattedPromotionLabel).toEqual([
      {
        type: 'promotion',
        label: 'test456.def.hiddenlabel'
      }
    ])
  })

  it('should return an empty array when empty input is passed', () => {
    const formattedPromotionLabel = formatPromotionLabel([])
    expect(formattedPromotionLabel).toEqual([])
  })

  it('should return an empty array when a single hidelabel promotion is passed', () => {
    const formattedPromotionLabel = formatPromotionLabel([
      'test456.def.hidelabel'
    ])
    expect(formattedPromotionLabel).toEqual([])
  })
})
