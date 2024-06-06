import { createAction } from '@reduxjs/toolkit'
import {
  ReportProductAddedLoad,
  ReportProductsSearchedLoad,
  ReportProductViewedLoad,
  ReportProductListViewedLoad,
  ReportProductRemovedLoad,
  ReportPageViewedLoad,
  ReportEmailSubscription,
  ReportEmailUnsubscription,
  ReportCheckoutStep,
  ReportUserInteractions,
  ReportPromotionListViewedLoad,
  ReportPromotionData,
  ReportIdentifyUser,
  ReportCouponAdded,
  ReportCouponRemoval,
  ReportProductClickedLoad,
  ReportLoginFailed,
  ReportAccountUpdated,
  ReportOrderCompleted,
  ReportAddPaymentInfo,
  ReportProductOrdered,
  ReportErrorInfo,
  ReportSocial,
  ReportGridListViewToggled,
  ReportProductFavourites,
  ReportProductFavouritesError,
  ReportCheckoutAttempted,
  ReportProductListFilteredLoad,
  ReportNavigationItemButtonClicked,
  ReportSocialLoginAttempted,
  ReportAccountType,
  ReportBasketIconClicked,
  ReportShippingMethodSelected
} from '../types'

export const triggerEmitIsSegmentInitialised = createAction(
  'triggerEmitIsSegmentInitialised'
)

export const triggerReportProductAdded = createAction<ReportProductAddedLoad>(
  'triggerReportProductAdded'
)

export const triggerReportEmailSubscription = createAction<ReportEmailSubscription>(
  'triggerReportEmailSubscription'
)

export const triggerReportAccountUpdated = createAction<ReportAccountUpdated>(
  'triggerReportAccountUpdated'
)

export const triggerReportUserInteraction = createAction<
  ReportUserInteractions & ReportAccountType
>('triggerReportUserInteraction')

export const triggerReportEmailUnsubscription = createAction<ReportEmailUnsubscription>(
  'triggerReportEmailUnsubscription'
)

export const triggerReportProductRemoved = createAction<ReportProductRemovedLoad>(
  'triggerReportProductRemoved'
)

export const triggerReportOrderCompleted = createAction<ReportOrderCompleted>(
  'triggerReportOrderCompleted'
)

export const triggerReportProductsSearched = createAction<ReportProductsSearchedLoad>(
  'triggerReportProductsSearched'
)

export const triggerReportProductViewed = createAction<ReportProductViewedLoad>(
  'triggerReportProductViewed'
)

export const triggerReportProductListViewed = createAction<ReportProductListViewedLoad>(
  'triggerReportProductListViewed'
)

export const triggerReportProductListFiltered = createAction<ReportProductListFilteredLoad>(
  'triggerReportProductListFiltered'
)

export const triggerReportCheckoutStarted = createAction(
  'triggerReportCheckoutStarted'
)

export const triggerReportCheckoutAttempted = createAction<ReportCheckoutAttempted>(
  'triggerReportCheckoutAttempted '
)

export const triggerReportCheckoutStepViewed = createAction(
  'triggerReportCheckoutStepViewed'
)

export const triggerReportCheckoutStepCompleted = createAction<ReportCheckoutStep>(
  'triggerReportCheckoutStepCompleted'
)

export const triggerReportPromotionListViewed = createAction<ReportPromotionListViewedLoad>(
  'triggerReportPromotionListViewed'
)

export const triggerReportPromotionClicked = createAction<ReportPromotionData>(
  'triggerReportPromotionClicked'
)

export const triggerReportPromotionViewed = createAction<ReportPromotionData>(
  'triggerReportPromotionViewed'
)

export const triggerReportPageViewed = createAction<ReportPageViewedLoad>(
  'triggerReportPageViewed'
)

export const triggerReportIdentifyUser = createAction<ReportIdentifyUser>(
  'triggerReportIdentifyUser'
)

export const triggerReportCartViewed = createAction('triggerReportCartViewed')

export const triggerReportCouponRemoval = createAction<ReportCouponRemoval>(
  'triggerReportCouponRemoval'
)

export const triggerReportCouponAdded = createAction<ReportCouponAdded>(
  'triggerReportCouponAdded'
)

export const triggerReportProductClicked = createAction<ReportProductClickedLoad>(
  'triggerReportProductClicked'
)

export const triggerReportLoginFailed = createAction<ReportLoginFailed>(
  'triggerReportLoginFailed'
)

export const triggerReportAddPaymentInfo = createAction<ReportAddPaymentInfo>(
  'triggerReportAddPaymentInfo'
)

export const triggerReportProductOrdered = createAction<ReportProductOrdered>(
  'triggerReportProductOrdered'
)

export const triggerReportPasswordForgotten = createAction(
  'triggerReportPasswordForgotten'
)

export const triggerReportPasswordReset = createAction(
  'triggerReportPasswordReset'
)

export const triggerReportPasswordResetLinkRequested = createAction(
  'triggerReportPasswordResetLinkRequested'
)

export const triggerReportPasswordResetFailed = createAction<ReportErrorInfo>(
  'triggerReportPasswordResetFailed'
)

export const triggerReportSignInPageViewed = createAction(
  'triggerReportSignInPageViewed'
)

export const triggerReportAccountCreatedFailed = createAction<
  ReportErrorInfo & ReportSocial & ReportAccountType
>('triggerReportAccountCreatedFailed')

export const triggerReportAccountCreatedAttempted = createAction<
  ReportSocial & ReportAccountType
>('triggerReportAccountCreatedAttempted')

export const triggerReportAccountCreationStepCompleted = createAction(
  'triggerReportAccountCreationStepCompleted'
)

export const triggerReportGridListViewToggled = createAction<ReportGridListViewToggled>(
  'triggerReportGridListViewToggled'
)

export const triggerReportGuestDetailsEntered = createAction(
  'triggerReportGuestDetailsEntered'
)

export const triggerReportGuestCheckoutAttempted = createAction(
  'triggerReportGuestCheckoutAttempted'
)

export const triggerReportProductFavourites = createAction<ReportProductFavourites>(
  'triggerReportProductFavourites'
)

export const triggerReportProductFavouritesFailed = createAction<ReportProductFavouritesError>(
  'triggerReportProductFavouritesFailed'
)

export const triggerReportNavigationItemButtonClicked = createAction<ReportNavigationItemButtonClicked>(
  'triggerReportNavigationItemButtonClicked'
)

export const triggerReportBasketIconClicked = createAction<ReportBasketIconClicked>(
  'triggerReportBasketIconClicked'
)

export const triggerReportSocialLoginAttempted = createAction<ReportSocialLoginAttempted>(
  'triggerReportSocialLoginAttempted'
)

export const triggerReportMissingAddressCheckoutPageViewed = createAction(
  'triggerReportMissingAddressCheckoutPageViewed'
)

export const triggerReportGuestDetailsPageViewed = createAction(
  'triggerReportGuestDetailsPageViewed'
)
export const triggerReportMobileFilterAndSortOpened = createAction(
  'triggerReportMobileFilterAndSortOpened'
)
export const triggerReportSocialVerificationPageViewed = createAction<ReportSocial>(
  'triggerReportSocialVerificationPageViewed'
)

export const triggerReportShippingMethodSelected = createAction<ReportShippingMethodSelected>(
  'triggerReportShippingMethodSelected'
)
