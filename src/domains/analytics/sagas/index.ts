import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { emitIsSegmentInitialisedSaga } from './is-segment-initialised'
import { reportProductAddedSaga } from './report-product-added'
import { reportProductRemovedSaga } from './report-product-removed'
import { reportOrderCompletedSaga } from './report-order-completed'
import { reportProductsSearchedSaga } from './report-products-searched'
import { reportProductViewedSaga } from './report-product-viewed'
import { reportProductListViewedSaga } from './report-product-list-viewed'
import { reportPageViewedSaga } from './report-page-viewed'
import { reportIdentifyUserSaga } from './report-identify-user'
import { reportCartViewedSaga } from './report-cart-viewed'
import { reportEmailSubscriptionSaga } from './report-email-subscription'
import { reportEmailUnsubscriptionSaga } from './report-email-unsubscription'
import { reportUserInteractionSaga } from '~domains/analytics/sagas/report-user-interaction'
import { reportPromotionListViewedSaga } from '~domains/analytics/sagas/report-promotion-list-viewed'
import { reportPromotionClickedSaga } from '~domains/analytics/sagas/report-promotion-clicked'
import { reportCheckoutStartedSaga } from '~domains/analytics/sagas/report-checkout-started'
import { reportCheckoutAttemptedSaga } from '~domains/analytics/sagas/report-checkout-attempted'
import { reportCheckoutStepViewedSaga } from '~domains/analytics/sagas/report-checkout-step-viewed'
import { reportCheckoutStepCompletedSaga } from '~domains/analytics/sagas/report-checkout-step-completed'
import { reportCouponAddedSaga } from '~domains/analytics/sagas/report-coupon-added'
import { reportCouponRemovalSaga } from '~domains/analytics/sagas/report-coupon-removal'
import { reportProductClickedSaga } from './report-product-clicked'
import { reportAccountUpdatedSaga } from '~domains/analytics/sagas/report-account-updated'
import { reportLoginFailedSaga } from './report-login-failed'
import { reportAddPaymentInfoSaga } from './report-add-payment-info'
import { reportProductOrderedSaga } from './report-product-ordered'
import { reportPasswordForgottenSaga } from './report-password-forgotten'
import { reportPasswordResetSaga } from './report-password-reset'
import { reportPasswordResetLinkRequestedSaga } from './report-password-reset-link-requested'
import { reportPasswordResetFailedSaga } from './report-password-reset-failed'
import { reportAccountCreatedAttemptedSaga } from './report-account-created-attempted'
import { reportAccountCreationStepCompletedSaga } from './report-account-creation-step-completed'
import { reportAccountCreatedFailedSaga } from './report-account-created-failed'
import { reportGridListViewToggledSaga } from './report-grid-list-view-toggled'
import { reportSignInPageViewedSaga } from './report-sign-in-page-viewed'
import { reportPromotionViewedSaga } from '~domains/analytics/sagas/report-promotion-viewed'
import { reportGuestDetailsEnteredSaga } from '~domains/analytics/sagas/report-guest-details-entered'
import { reportGuestCheckoutAttemptedSaga } from './report-guest-checkout-attempted'
import { reportProductFavouritesSaga } from './report-product-favourites'
import { reportProductFavouritesFailedSaga } from './report-product-favourites-failed'
import { reportProductListFilteredSaga } from './report-product-list-filtered'
import { reportNavigationItemButtonClickedSaga } from './report-navigation-item-button-clicked'
import { reportSocialLoginAttempted } from './report-social-login-attempted'
import { reportMissingAddressCheckoutPageViewed } from './report-missing-address-checkout-page-viewed'
import { reportGuestDetailsPageViewed } from './report-guest-details-page-viewed'
import { reportMobileFilterAndSortOpened } from './report-mobile-filter-and-sort-opened'
import { reportSocialVerificationPageViewedSaga } from './report-social-verification-page-viewed'
import { reportBasketIconClickedSaga } from './report-basket-icon-clicked'
import { reportShippingMethodSelectedSaga } from './report-shipping-method-selected'

export function* analyticsSaga(): SagaIterator {
  yield all(
    [
      emitIsSegmentInitialisedSaga,
      reportProductAddedSaga,
      reportProductRemovedSaga,
      reportOrderCompletedSaga,
      reportProductsSearchedSaga,
      reportProductViewedSaga,
      reportProductListViewedSaga,
      reportProductListFilteredSaga,
      reportPageViewedSaga,
      reportIdentifyUserSaga,
      reportCartViewedSaga,
      reportEmailSubscriptionSaga,
      reportEmailUnsubscriptionSaga,
      reportUserInteractionSaga,
      reportCheckoutStartedSaga,
      reportCheckoutAttemptedSaga,
      reportCheckoutStepViewedSaga,
      reportCheckoutStepCompletedSaga,
      reportPromotionListViewedSaga,
      reportPromotionClickedSaga,
      reportCouponAddedSaga,
      reportCouponRemovalSaga,
      reportProductClickedSaga,
      reportLoginFailedSaga,
      reportAccountUpdatedSaga,
      reportAddPaymentInfoSaga,
      reportProductOrderedSaga,
      reportSignInPageViewedSaga,
      reportPasswordResetSaga,
      reportPasswordForgottenSaga,
      reportPasswordResetLinkRequestedSaga,
      reportPasswordResetFailedSaga,
      reportAccountCreatedAttemptedSaga,
      reportAccountCreationStepCompletedSaga,
      reportAccountCreatedFailedSaga,
      reportGridListViewToggledSaga,
      reportPromotionViewedSaga,
      reportGuestDetailsEnteredSaga,
      reportGuestCheckoutAttemptedSaga,
      reportProductFavouritesSaga,
      reportProductFavouritesFailedSaga,
      reportNavigationItemButtonClickedSaga,
      reportSocialLoginAttempted,
      reportMissingAddressCheckoutPageViewed,
      reportGuestDetailsPageViewed,
      reportMobileFilterAndSortOpened,
      reportSocialVerificationPageViewedSaga,
      reportBasketIconClickedSaga,
      reportShippingMethodSelectedSaga
    ].map(fork)
  )
}
