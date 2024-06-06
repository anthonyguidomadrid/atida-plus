import { orderStatusIconText } from '../orderStatusIconText'
import { ReactComponent as NavDelete } from '../assets/svg/navigation-16px/NavDelete.svg'
import { ReactComponent as NavCheckmarkSmall } from '../assets/svg/navigation-16px/NavCheckmarkSmall.svg'
import { ReactComponent as Clock } from '../assets/svg/navigation-24px/Clock.svg'
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DETAILS_PROVIDED,
  ORDER_STATUS_EXPORTED,
  ORDER_STATUS_FAILED,
  ORDER_STATUS_INVOICE_RAISED,
  ORDER_STATUS_LOYALTY_CASH_PROCESSED,
  ORDER_STATUS_NEW,
  ORDER_STATUS_ORDER_RESERVED,
  ORDER_STATUS_PAYMENT_SUBMITTED,
  ORDER_STATUS_PENDING
} from '~config/constants/order-status'

describe(orderStatusIconText, () => {
  const cancelledIcon = (
    <NavDelete className="icon-24 mt-auto mb-auto mr-2 text-feedback-error" />
  )
  const failedIcon = (
    <NavDelete className="icon-24 mt-auto mb-auto mr-2 text-feedback-error" />
  )
  const successIcon = (
    <NavCheckmarkSmall className="icon-24 mt-auto mb-auto mr-2 text-primary-caribbean-green" />
  )
  const pendingIcon = (
    <Clock className="icon-24 mt-auto mb-auto mr-2 text-feedback-warning" />
  )
  const cancelledTranslationSlug =
    'account.order-history.order-status.cancelled'
  const failedTranslationSlug =
    'account.order-history.order-status.payment-failed'
  const successTranslationSlug = 'account.order-history.order-status.paid'
  const pendingTranslationSlug = 'account.order-history.order-status.pending'

  const cancelledColorClassName = 'text-feedback-error'
  const successColorClassName = 'text-feedback-success'
  const pendingColorClassName = 'text-labels-tangerine-base'

  it('returns a cancelled icon and translation slug when called with oms.state.cancelled', () => {
    expect(orderStatusIconText(ORDER_STATUS_CANCELLED)).toEqual({
      icon: cancelledIcon,
      translationSlug: cancelledTranslationSlug,
      colorClassName: cancelledColorClassName
    })
  })
  it('returns a failed icon and translation slug when called with oms.state.payment-failed', () => {
    expect(orderStatusIconText(ORDER_STATUS_FAILED)).toEqual({
      icon: failedIcon,
      translationSlug: failedTranslationSlug,
      colorClassName: cancelledColorClassName
    })
  })
  it('returns a success icon and translation slug when called with oms.state.exported, oms.state.loyalty-cash-processed or oms.state.payment-submitted', () => {
    expect(orderStatusIconText(ORDER_STATUS_EXPORTED)).toEqual({
      icon: successIcon,
      translationSlug: successTranslationSlug,
      colorClassName: successColorClassName
    })
    expect(orderStatusIconText(ORDER_STATUS_PAYMENT_SUBMITTED)).toEqual({
      icon: successIcon,
      translationSlug: successTranslationSlug,
      colorClassName: successColorClassName
    })
    expect(orderStatusIconText(ORDER_STATUS_LOYALTY_CASH_PROCESSED)).toEqual({
      icon: successIcon,
      translationSlug: successTranslationSlug,
      colorClassName: successColorClassName
    })
  })
  it('returns a peinding icon and translation slug when called with oms.state.new, oms.state.invoice-raised, oms.state.payment-details-provided or oms.state.pending', () => {
    expect(orderStatusIconText(ORDER_STATUS_NEW)).toEqual({
      icon: pendingIcon,
      translationSlug: pendingTranslationSlug,
      colorClassName: pendingColorClassName
    })
    expect(orderStatusIconText(ORDER_STATUS_INVOICE_RAISED)).toEqual({
      icon: pendingIcon,
      translationSlug: pendingTranslationSlug,
      colorClassName: pendingColorClassName
    })
    expect(orderStatusIconText(ORDER_STATUS_DETAILS_PROVIDED)).toEqual({
      icon: pendingIcon,
      translationSlug: pendingTranslationSlug,
      colorClassName: pendingColorClassName
    })
    expect(orderStatusIconText(ORDER_STATUS_ORDER_RESERVED)).toEqual({
      icon: pendingIcon,
      translationSlug: pendingTranslationSlug,
      colorClassName: pendingColorClassName
    })
    expect(orderStatusIconText(ORDER_STATUS_PENDING)).toEqual({
      icon: pendingIcon,
      translationSlug: pendingTranslationSlug,
      colorClassName: pendingColorClassName
    })
  })
  it('returns a null icon and an empty translation slug by default', () => {
    expect(orderStatusIconText('')).toEqual({
      icon: null,
      translationSlug: '',
      colorClassName: ''
    })
  })
})
