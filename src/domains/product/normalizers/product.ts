import { removeUndefinedPropertiesFromObject, sanitiseUrl } from '~helpers'
import {
  calculateDiscount,
  calculatePricePerUnit,
  getSalePrice
} from '../helpers'
import {
  AlgoliaProduct,
  ChannelPrice,
  ElasticSearchProduct,
  InfoLabelEnum,
  Product,
  ProductImageDerivative,
  ProductLabelWrapper,
  RawProductAttributes
} from '../types'
import { HIDE_LABEL } from '~config/constants/promotions'
import { getLocaleKey, getEnabledLocales } from '~domains/translated-routes'
import { SessionChannelType } from '~domains/basket/types'

const formatSlugAsUrl = (slug?: string) => (slug ? `/${slug}` : undefined)

const getUrlSlugForLocale = (
  locale?: string,
  attributes?: Partial<RawProductAttributes>
) => {
  const localeKey = getLocaleKey(locale)

  if (localeKey && attributes?.hasOwnProperty('url_slug_' + localeKey)) {
    // @ts-ignore
    const slugAttribute = attributes[`url_slug_${localeKey}`] ?? ''
    return formatSlugAsUrl(slugAttribute)
  }

  return undefined
}

const returnAlternativeUrls = (attributes?: Partial<RawProductAttributes>) => {
  const alternativeUrlObject = {}

  getEnabledLocales().map(locale => {
    const localeKey = getLocaleKey(locale)

    if (localeKey && attributes?.hasOwnProperty('url_slug_' + localeKey)) {
      // @ts-ignore
      alternativeUrlObject[`${locale}`] =
        // @ts-ignore
        attributes[`url_slug_${localeKey}`] ?? ''
    }
  })

  return alternativeUrlObject
}

const makeProductLabels = (
  campaign: string,
  promotions: string[],
  pricingTag?: { code: string; label: string },
  price?: { sale?: number; rrp?: number },
  isPromotionalItem?: boolean,
  isFullyDiscountedItem?: boolean,
  isSample?: boolean
): ProductLabelWrapper[] | undefined => {
  const labels = [
    campaign && !isPromotionalItem
      ? {
          type: InfoLabelEnum.CampaignPromotion,
          label: `${InfoLabelEnum.CampaignPromotion}.${campaign}`
        }
      : null,
    ...(isPromotionalItem
      ? [
          {
            type: InfoLabelEnum.CampaignPromotion,
            label: isFullyDiscountedItem
              ? isSample
                ? 'campaign-promo.sample'
                : 'campaign-promo.gift'
              : 'third-rank.discounted-product'
          }
        ]
      : formatPromotionLabel(promotions)),
    pricingTag
      ? {
          type:
            pricingTag.code === 'outlet'
              ? InfoLabelEnum.PricingTagOutlet
              : InfoLabelEnum.PricingTagMini,
          label: pricingTag.label
        }
      : null,
    price?.sale && price?.rrp && price.sale < price.rrp
      ? {
          type: InfoLabelEnum.Discount,
          label: `-${calculateDiscount(price.sale, price.rrp)}%`
        }
      : null
  ].filter((label): label is ProductLabelWrapper => !!label)

  if (labels.length === 0) {
    return undefined
  }

  return labels
}

// filters promotions with hidelabel content first,
// then takes the last one of the list (not the first one anymore)
// and formats it finally in the desired structure
export const formatPromotionLabel = (promotions: string[]) => {
  return promotions
    .filter((p: string) => !p.includes(HIDE_LABEL))
    .slice(-1)
    .map(promotion => ({
      type: InfoLabelEnum.Promotion,
      label: promotion
    }))
}

const getProductImageUrl = (
  url: string | undefined,
  derivative: ProductImageDerivative,
  isPromotionalItem?: boolean
) => {
  if (url) return sanitiseUrl(url)
  return `/images/no-image-${
    isPromotionalItem ? 'Gift' : 'Product'
  }%20${derivative}.png`
}

export const normalizeElasticSearchProduct = (
  locale: string,
  item?: ElasticSearchProduct,
  sessionChannel?: SessionChannelType,
  mockedProductPriceChannels?: ChannelPrice[],
  isPromotionalItem?: boolean,
  isFullyDiscountedItem?: boolean
): Partial<Product> => {
  const salePrice = getSalePrice(
    { sku: item?._id, sale: item?._source?.price?.sale },
    mockedProductPriceChannels ?? item?._source?.channel_prices,
    sessionChannel
  )
  return removeUndefinedPropertiesFromObject({
    id: item?.id,
    name: item?._source?.name,
    enabled: item?._source?.enabled,
    sku: item?._id,
    pzn: item?._source?.attributes?.pzn,
    family: item?._source?.family,
    gtin: item?._source?.attributes?.ean,
    url: getUrlSlugForLocale(locale, item?._source?.attributes),
    alternativeUrls: removeUndefinedPropertiesFromObject(
      returnAlternativeUrls(item?._source?.attributes)
    ),
    quantityLeft: item?._source?.qty,
    categories: item?._source?.attributes?.categories,
    brand: item?._source?.attributes?.brand,
    format: item?._source?.attributes?.format,
    maxQuantity: item?._source?.attributes?.max_qty,
    productDatImage: item?._id
      ? item?._source?.attributes?.image_derivatives?.[0]?.dat_url
      : undefined,
    thumbnailImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile_thumbnail,
          ProductImageDerivative.Thumbnail,
          isPromotionalItem
        )
      : undefined,
    mediumImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_medium,
          ProductImageDerivative.Medium,
          isPromotionalItem
        )
      : undefined,
    largeImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_high,
          ProductImageDerivative.High,
          isPromotionalItem
        )
      : undefined,
    productTileImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile,
          ProductImageDerivative.ProductTile,
          isPromotionalItem
        )
      : undefined,
    productTileRetinaImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile_retina,
          ProductImageDerivative.ProductTileRetina,
          isPromotionalItem
        )
      : undefined,

    images: item?._id
      ? item?._source?.attributes?.image_derivatives?.map(image => {
          return {
            productDatImage: image?.dat_url,
            productHigh: getProductImageUrl(
              image.derivative_product_high,
              ProductImageDerivative.High,
              isPromotionalItem
            ),
            productTileThumbnail: getProductImageUrl(
              image.derivative_product_tile_thumbnail,
              ProductImageDerivative.Thumbnail,
              isPromotionalItem
            )
          }
        })
      : undefined,

    videos: item?._id
      ? item?._source?.attributes?.asset_video_list?.map(video => {
          return {
            video_id: video.video_id,
            label: video.label,
            type: video.type
          }
        })
      : undefined,

    description: item?._source?.attributes?.description_long,
    shortDescription: item?._source?.attributes?.description_short,
    hints: item?._source?.attributes?.notes,
    lmivStorage: item?._source?.attributes?.lmiv_storage,
    metaTitle: item?._source?.attributes?.meta_title,
    metaKeywords: item?._source?.attributes?.meta_keyword,
    metaDescription: item?._source?.attributes?.meta_description,
    unitVolume: item?._source?.attributes?.content_size
      ? {
          unit: item?._source?.attributes?.content_size?.unit,
          amount: item?._source?.attributes?.content_size?.amount,
          unitLabel: item?._source?.attributes?.content_size?.unit_label
        }
      : undefined,
    contentSizeFactor: item?._source?.attributes?.content_size_factor,
    bundleSizeFactor: item?._source?.attributes?.bundle_size_factor,
    usageNotes: item?._source?.attributes?.usage_notes,
    ingredients: item?._source?.attributes?.ingredient_list,
    assetCertificateList: item?._source?.attributes?.asset_certificate_list,
    price: item?._source?.price
      ? {
          currency: item?._source?.price?.currency,
          value: salePrice
        }
      : undefined,
    pricePerUnit:
      item?._source?.price && item?._source?.attributes?.content_size
        ? removeUndefinedPropertiesFromObject(
            calculatePricePerUnit({
              locale,
              price: { ...item._source.price, sale: salePrice },
              contentSizeFactor: item?._source?.attributes?.content_size_factor,
              contentSize: item._source.attributes.content_size
            })
          )
        : undefined,
    rrp: item?._source?.price
      ? {
          value: item?._source?.price?.rrp,
          currency: item?._source?.price?.currency
        }
      : undefined,
    availability: item?._source?.availability_state,
    labels: makeProductLabels(
      item?._source?.campaign ?? '',
      item?._source?.promos ?? [],
      item?._source?.attributes?.tag,
      {
        sale: salePrice,
        rrp: item?._source?.price?.rrp
      },
      isPromotionalItem,
      isFullyDiscountedItem,
      item?._source?.attributes?.not_for_sale_type?.code === 'sample'
    ),
    pharmaceuticalAdvice: item?._source?.attributes?.pharmaceutical_advice,
    rating: item?._source?.review
      ? {
          averageRating: item._source.review.product_score,
          numberOfReviews: item._source.review.total_reviews
        }
      : undefined,
    notForSaleType: item?._source?.attributes?.not_for_sale_type?.code,
    isOnDemand: item?._source?.attributes?.is_on_demand,
    manufacturerName: item?._source?.attributes?.manufacturer_name,
    netWeight: item?._source?.attributes?.net_weight
      ? {
          unit: item?._source?.attributes?.net_weight?.unit,
          amount: item?._source?.attributes?.net_weight?.amount,
          unitLabel: item?._source?.attributes?.net_weight?.unit_label
        }
      : undefined,
    isBiocide: item?._source?.attributes?.is_biocide,
    biocideBauaNumber: item?._source?.attributes?.biocide_baua_number,
    isReimport: item?._source?.attributes?.is_reimport
      ? {
          code: item?._source?.attributes?.is_reimport?.code,
          label: item?._source?.attributes?.is_reimport?.label
        }
      : undefined,
    organicControlNumber:
      item?._source?.attributes?.organic_control_body_number,
    hasOrganicSealLogo: item?._source?.attributes?.has_organic_seal_logo
      ? {
          code: item?._source?.attributes?.has_organic_seal_logo?.code,
          label: item?._source?.attributes?.has_organic_seal_logo?.label
        }
      : undefined,
    ethanolContent: item?._source?.attributes?.ethanol_content,
    isPharmacyExclusive: item?._source?.attributes?.is_pharmacy_exclusive,
    productFeaturesListMultiselect: item?._source?.attributes
      ?.product_features_list_multiselect
      ? [...item?._source?.attributes?.product_features_list_multiselect]
      : undefined,
    dietetic: item?._source?.attributes?.dietetic
      ? {
          code: item?._source?.attributes?.dietetic?.code,
          label: item?._source?.attributes?.dietetic?.label
        }
      : undefined
  })
}

export const normalizeAlgoliaProduct = (
  locale?: string,
  item?: AlgoliaProduct,
  sessionChannel?: SessionChannelType,
  mockedProductPriceChannels?: ChannelPrice[]
): Partial<Product> => {
  const salePrice = getSalePrice(
    { sku: item?.sku, sale: item?.price?.sale },
    mockedProductPriceChannels ?? item?.channel_prices,
    sessionChannel
  )
  return removeUndefinedPropertiesFromObject({
    name: item?.name,
    sku: item?.sku,
    url: getUrlSlugForLocale(locale, item?.attributes),
    brand: item?.attributes?.brand,
    format: item?.attributes?.format,
    productDatImage: item?.sku
      ? item?.attributes?.image_derivatives?.[0]?.dat_url
      : undefined,
    thumbnailImage: item?.sku
      ? getProductImageUrl(
          item?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile_thumbnail,
          ProductImageDerivative.Thumbnail
        )
      : undefined,
    mediumImage: item?.sku
      ? getProductImageUrl(
          item?.attributes?.image_derivatives?.[0]?.derivative_product_medium,
          ProductImageDerivative.Medium
        )
      : undefined,
    largeImage: item?.sku
      ? getProductImageUrl(
          item?.attributes?.image_derivatives?.[0]?.derivative_product_high,
          ProductImageDerivative.High
        )
      : undefined,
    productTileImage: item?.sku
      ? getProductImageUrl(
          item?.attributes?.image_derivatives?.[0]?.derivative_product_tile,
          ProductImageDerivative.ProductTile
        )
      : undefined,
    productTileRetinaImage: item?.sku
      ? getProductImageUrl(
          item?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile_retina,
          ProductImageDerivative.ProductTileRetina
        )
      : undefined,
    description: item?.attributes?.description_long,
    shortDescription: item?.attributes?.description_short,
    categories: item?.attributes?.categories,
    tag: item?.attributes?.tag,
    metaTitle: item?.attributes?.meta_title,
    metaKeywords: item?.attributes?.meta_keyword,
    metaDescription: item?.attributes?.meta_description,
    unitVolume: item?.attributes?.content_size
      ? {
          unit: item?.attributes?.content_size?.unit,
          amount: item?.attributes?.content_size?.amount,
          unitLabel: item?.attributes?.content_size?.unit_label
        }
      : undefined,
    contentSizeFactor: item?.attributes?.content_size_factor,
    price: item?.price
      ? { currency: item?.price?.currency, value: salePrice }
      : undefined,
    pricePerUnit:
      item?.price && item?.attributes?.content_size
        ? removeUndefinedPropertiesFromObject(
            calculatePricePerUnit({
              locale,
              price: { ...item.price, sale: salePrice },
              contentSizeFactor: item?.attributes?.content_size_factor,
              contentSize: item.attributes.content_size
            })
          )
        : undefined,
    rrp: item?.sku
      ? {
          value: item?.price?.rrp,
          currency: item?.price?.currency
        }
      : undefined,
    availability: item?.availability?.state,
    labels: makeProductLabels(
      item?.campaign ?? '',
      item?.promos ?? [],
      item?.attributes?.tag,
      {
        sale: salePrice,
        rrp: item?.price?.rrp
      }
    ),
    rating: item?.review
      ? {
          averageRating: item.review.product_score,
          numberOfReviews: item.review.total_reviews
        }
      : undefined
  })
}

export const normalizeElasticSearchMinimalProduct = (
  locale?: string,
  item?: ElasticSearchProduct,
  sessionChannel?: SessionChannelType,
  mockedProductPriceChannels?: ChannelPrice[],
  isPromotionalItem?: boolean,
  isFullyDiscountedItem?: boolean
): Partial<Product> => {
  const salePrice = getSalePrice(
    { sku: item?._id, sale: item?._source?.price?.sale },
    mockedProductPriceChannels ?? item?._source?.channel_prices,
    sessionChannel
  )
  return removeUndefinedPropertiesFromObject({
    id: item?.id,
    name: item?._source?.name,
    enabled: item?._source?.enabled,
    sku: item?._id,
    url: getUrlSlugForLocale(locale, item?._source?.attributes),
    alternativeUrls: removeUndefinedPropertiesFromObject(
      returnAlternativeUrls(item?._source?.attributes)
    ),
    format: item?._source?.attributes?.format,
    maxQuantity: item?._source?.attributes?.max_qty,
    productDatImage: item?._id
      ? item?._source?.attributes?.image_derivatives?.[0]?.dat_url
      : undefined,
    thumbnailImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile_thumbnail,
          ProductImageDerivative.Thumbnail,
          isPromotionalItem
        )
      : undefined,
    mediumImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_medium,
          ProductImageDerivative.Medium,
          isPromotionalItem
        )
      : undefined,
    largeImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_high,
          ProductImageDerivative.High,
          isPromotionalItem
        )
      : undefined,
    productTileImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile,
          ProductImageDerivative.ProductTile,
          isPromotionalItem
        )
      : undefined,
    productTileRetinaImage: item?._id
      ? getProductImageUrl(
          item?._source?.attributes?.image_derivatives?.[0]
            ?.derivative_product_tile_retina,
          ProductImageDerivative.ProductTileRetina,
          isPromotionalItem
        )
      : undefined,
    metaTitle: item?._source?.attributes?.meta_title,
    metaKeywords: item?._source?.attributes?.meta_keyword,
    metaDescription: item?._source?.attributes?.meta_description,
    unitVolume: item?._source?.attributes?.content_size
      ? {
          unit: item?._source?.attributes?.content_size?.unit,
          amount: item?._source?.attributes?.content_size?.amount,
          unitLabel: item?._source?.attributes?.content_size?.unit_label
        }
      : undefined,
    price: item?._source?.price
      ? {
          currency: item?._source?.price?.currency,
          value: salePrice
        }
      : undefined,
    pricePerUnit:
      item?._source?.price && item?._source?.attributes?.content_size
        ? removeUndefinedPropertiesFromObject(
            calculatePricePerUnit({
              locale,
              price: { ...item._source.price, sale: salePrice },
              contentSizeFactor: item?._source?.attributes?.content_size_factor,
              contentSize: item._source.attributes.content_size
            })
          )
        : undefined,
    rrp: item?._source?.price
      ? {
          value: item?._source?.price?.rrp,
          currency: item?._source?.price?.currency
        }
      : undefined,
    availability: item?._source?.availability_state,
    labels: makeProductLabels(
      item?._source?.campaign ?? '',
      item?._source?.promos ?? [],
      item?._source?.attributes?.tag,
      {
        sale: salePrice,
        rrp: item?._source?.price?.rrp
      },
      isPromotionalItem,
      isFullyDiscountedItem,
      item?._source?.attributes?.not_for_sale_type?.code === 'sample'
    ),
    rating: item?._source?.review
      ? {
          averageRating: item._source.review.product_score,
          numberOfReviews: item._source.review.total_reviews
        }
      : undefined
  })
}
