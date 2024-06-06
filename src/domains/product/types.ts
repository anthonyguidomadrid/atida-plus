import { ContentBlock } from '~domains/page'
import { GalleryImage, GalleryVideo } from '~components/organisms/Gallery'
import { getEnabledLocales } from '~domains/translated-routes'
import { SessionChannelType } from '~domains/basket/types'

export enum InfoLabelEnum {
  Promotion = 'promotion',
  Discount = 'discount',
  CampaignPromotion = 'campaign-promo',
  Address = 'address',
  AddressDisabled = 'address-disabled',
  PricingTagOutlet = 'pricing-tag-outlet',
  PricingTagMini = 'pricing-tag-mini'
}

export type ProductLabelWrapper = {
  type: InfoLabelEnum
  label: string
}

export type ProductRating = {
  numberOfReviews: number
  averageRating: number
}

export type Price = {
  value: number
  currency: string
}

export type PricePerUnit = Price & {
  unit?: string
}

export type Product = {
  name: string
  enabled?: boolean
  id?: string
  sku: string
  family?: string
  gtin: string
  url?: string
  productPage?: number
  pzn?: string
  brand: { code: string; label: string }
  brandUrl?: string
  format: { code: string; label: string }
  maxQuantity: number
  productDatImage: string
  thumbnailImage: string
  mediumImage: string
  largeImage: string
  productTileImage: string
  productTileRetinaImage: string
  images?: GalleryImage[]
  videos?: GalleryVideo[]
  description?: string
  shortDescription?: string
  hints?: string
  categories?: { lvl0?: string[]; lvl1?: string[]; lvl2?: string[] }
  metaTitle?: string
  metaKeywords?: string
  metaDescription?: string
  usageNotes?: string
  ingredients?: string
  assetCertificateList?: string[]
  unitVolume?: {
    unit: string
    amount: number
    unitLabel: string
  }
  contentSizeFactor?: number
  bundleSizeFactor?: number
  price: Price
  pricePerUnit?: PricePerUnit
  basketQuantity?: number
  rrp?: Price
  availability?: string
  labels?: ProductLabelWrapper[]
  position?: number
  pharmaceuticalAdvice?: string
  alternativeUrls?: AlternativeLinks | undefined
  rating?: ProductRating
  notForSaleType?: string
  quantityLeft?: number
  isOnDemand?: boolean
  lmivStorage?: string
  manufacturerName?: string
  netWeight?: {
    unit: string
    amount: number
    unitLabel: string
  }
  isBiocide?: boolean
  isReimport?: { code: string; label: string }
  organicControlNumber?: string
  hasOrganicSealLogo?: { code: string; label: string }
  biocideBauaNumber?: string
  ethanolContent?: string
  isPharmacyExclusive?: boolean
  productFeaturesListMultiselect?: { code: string; label: string }[]
  dietetic?: { code: string; label: string }
}

// @todo would be better to make it configurable
// and loop trough the enabledLocales
const localeOne = getEnabledLocales()[0].replace('-', '_').toLowerCase()
const localeTwo =
  getEnabledLocales().length > 1
    ? getEnabledLocales()[1].replace('-', '_').toLowerCase()
    : 'xx_xx'

export type RawProductAttributes = {
  // @todo or we can add all the slug per locales as optional
  // @ts-ignore
  [`url_slug_${localeOne}`]: string
  // @ts-ignore
  [`url_slug_${localeTwo}`]: string
  ean: string
  pzn: string
  brand: { code: string; label: string }
  format: { code: string; label: string }
  max_qty: number
  asset_image_list: string[]
  image_derivatives: {
    dat_url: string
    derivative_product_medium: string
    derivative_product_high: string
    derivative_product_tile_retina: string
    derivative_product_landscape: string
    derivative_product_tile: string
    derivative_product_portrait: string
    derivative_product_tile_thumbnail: string
  }[]
  asset_video_list?: {
    label: string
    type: string
    video_id: string
  }[]
  tag?: { code: string; label: string }
  categories: { lvl0?: string[]; lvl1?: string[]; lvl2?: string[] }
  id_tax_set: number
  meta_title: string
  unit_volume: {
    unit: string
    amount: number
  }
  meta_keyword: string
  national_code: string
  description_long: string
  meta_description: string
  description_short: string
  notes: string
  usage_notes: string
  content_size: { unit: string; amount: number; unit_label: string }
  content_size_factor: number
  bundle_size_factor?: number
  ingredient_list: string
  asset_certificate_list: string[]
  pharmaceutical_advice: string
  not_for_sale_type?: {
    code: string
    label: string
  }
  is_on_demand?: boolean
  lmiv_storage?: string
  manufacturer_name?: string
  net_weight?: { unit: string; amount: number; unit_label: string }
  is_biocide?: boolean
  is_reimport: { code: string; label: string }
  organic_control_body_number?: string
  has_organic_seal_logo?: { code: string; label: string }
  biocide_baua_number?: string
  ethanol_content?: string
  is_pharmacy_exclusive?: boolean
  product_features_list_multiselect?: { code: string; label: string }[]
  dietetic?: { code: string; label: string }
}

export type ElasticSearchProduct = {
  _id: string
  _source: {
    availability_updated_at?: number
    name: string
    enabled: boolean
    attributes: Partial<RawProductAttributes>
    family?: string
    price: { currency: string; sale: number; rrp: number; cost: number }
    channel_prices?: ChannelPrice[]
    availability_state: string
    promos?: string[]
    campaign?: string
    qty?: number
    review?: {
      updated_at: number
      product_score: number
      total_reviews: number
    }
  }
  found?: boolean
  id?: string
}

export type AlgoliaProduct = {
  enabled: boolean
  locale: string
  name: string
  objectID: string
  sku: string
  store: string
  updated: string
  attributes: Partial<RawProductAttributes>
  price: { currency: string; sale: number; rrp: number; cost: number }
  channel_prices?: ChannelPrice[]
  availability: { state: string; updated_at: string }
  promos?: string[]
  campaign?: string
  review?: {
    updated_at: number
    product_score: number
    total_reviews: number
  }
  __autocomplete_id?: number
  __autocomplete_queryID?: string
}

export type AlgoliaSuggestion = {
  name: string
  objectID: string
  __autocomplete_id?: number
  __autocomplete_queryID?: string
  query: string
}

export type AlgoliaABTestIDs = {
  abTestVariantID: number
  abTestID: number
}

export type AlgoliaCategory = {
  category_name: string
  category_slug: string
  objectID: string
  __autocomplete_id?: number
  __autocomplete_queryID?: string
  category_path: string
}

export type ProductFilter = {
  type: string
  value?: string
}

export type ProductsAndContentBlocksListItem = Partial<Product> | ContentBlock

export enum ProductImageDerivative {
  Thumbnail = 'Tile%20Thumbnail',
  Medium = 'Medium',
  High = 'High',
  ProductTile = 'Tile',
  ProductTileRetina = 'Tile%20Retina'
}

export type AlternativeLinks = {
  'es-es'?: string
  'pt-pt'?: string
}

export type BasketPromotionalItem = {
  handleQuantityChange: boolean
  handleRemoval: boolean
  parentSku: string
}

export type ChannelPrice = {
  channel: string
  price: number
}

export type GetElasticSearchProductPayload = {
  sku?: string
  sessionChannel?: SessionChannelType
}
