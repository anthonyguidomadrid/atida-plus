import { BasketWithProducts } from '~domains/basket/types'
import {
  CampaignHeroBanner,
  Category,
  ContentBlockWithImage,
  HeroBanner
} from '~domains/contentful'
import { Product, ProductFilter } from '~domains/product'
import { Promotion } from '~domains/contentful/normalizers/promotion'
import { ProductViews } from '~domains/product/slices/view-toggle'
import { BasketButtonPosition } from '~config/constants/basket-button-position'
import { AccountType } from '~domains/account'

export type ReportProductAddedLoad = {
  sku: string
  data: BasketWithProducts
  quantity?: number
  quantity_difference?: number
  isPromo?: boolean
  added_from?: string
}

export type ReportEmailSubscription = {
  email_list: string
  email?: string
  subscribed_from: string
}

export type ReportAccountUpdated = {
  information_updated: string[] | null
}

export type ReportUserInteractions = ReportSocial & {
  event: string
}

export type ReportEmailUnsubscription = {
  email_list: string
  email?: string
  unsubscribed_from: string
}

export type ReportProductRemovedLoad = {
  sku: string
  quantity?: number
  quantity_difference?: number
  removed_from?: string
}

export type ReportOrderCompletedLoad = {
  sku: string
}

export type ReportProductsSearchedLoad = {
  query: string
  isSearchAsYouType?: boolean
  suggestion?: string
  algoliaABTestId?: string
}

export type ReportProductViewedLoad = {
  product: Product
  basketQuantity: number
  positionInBasket: number
}

export type ReportProductClickedLoad = {
  product: Partial<Product>
  positionInTheList?: number
  basketQuantity?: number
  list_id?: string
  recommendation_id?: string
}

export type ReportProductListViewedLoad = {
  products?: Partial<Product>[]
  category?: string
  type?: string
  list_view?: ProductViews
  list_id?: string
  recommendation_id?: string
  algoliaABTestId?: string
}

export type ReportProductListFilteredLoad = {
  products?: Partial<Product>[]
  filters?: Partial<ProductFilter>[]
}

export type ReportPromotionListViewedLoad = {
  promotions: Partial<Promotion>[]
}

export type ReportPromotionData = {
  name?: string
  creative?: string
  promotion_id?: string
  index?: number
  is_sponsored_content?: boolean
}

export type SponsoredContent =
  | HeroBanner
  | ContentBlockWithImage
  | Promotion
  | CampaignHeroBanner

export type ReportPageViewedLoad = {
  page: string
  pageType: string
  category?: Category
  brand?: string
  brand_code?: string
  productId?: string
  paymentMethod?: string
}

export type ReportCheckoutAttempted = {
  position: BasketButtonPosition
}

export type ReportCheckoutStep = {
  payment_method?: string
}

export type ReportSocial = {
  is_social?: boolean
  social_platform?: string
}

export type ReportIdentifyUser = {
  email?: string
  first_name?: string
}

export type ReportCouponRemoval = {
  couponId?: string
  couponName?: string
  discount?: number
}

export type ReportOrderCompleted = {
  payment_method: string
  is_redirected: boolean
}

export type ReportCouponAdded = {
  displayName?: string
  code?: string
  amount?: number
}

export type ReportErrorInfo = {
  error_message?: string
  error_key?: string
}

export type ReportLoginFailed = ReportErrorInfo &
  ReportSocial & {
    email?: string
  } & { event?: string }

export type ReportAddPaymentInfo = ReportErrorInfo & {
  cart_id?: string
  is_logged_in?: boolean
  payment_method?: string
  success?: boolean
}

export type ReportProductOrdered = {
  payment_method: string
  is_redirected: boolean
}

export type ReportGridListViewToggled = {
  view: ProductViews
}

export type ReportProductFavourites = {
  event: string
  product?: Partial<Product>
  added_from?: string
  removed_from?: string
}

export type ReportProductFavouritesError = ReportErrorInfo & {
  event: string
}

export type ReportNavigationItemButtonClicked = {
  buttonName: string
  buttonClickedFrom: string
}

export type ReportBasketIconClicked = {
  icon_clicked_from: string
}

export type ReportSocialLoginAttempted = {
  social_platform: string
  clickedFrom: string
}

export type ReportAccountType = {
  account_type?: AccountType['accountType']
}

export type ReportShippingMethodSelected = {
  shipping_method: string
}
