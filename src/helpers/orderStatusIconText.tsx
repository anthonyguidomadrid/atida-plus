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
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PREFIX
} from '~config/constants/order-status'

/* 
  Get the actual status name
  Ex: oms.state.a:exported -> exported
      oms.state.exported -> exported
*/
const extractStatusName = (statusDisplayName: string) => {
  const statusPrefixIndex = statusDisplayName.indexOf(':') + 1

  if (statusPrefixIndex > 0) {
    return statusDisplayName.substring(statusPrefixIndex)
  }

  return statusDisplayName.replace(ORDER_STATUS_PREFIX, '')
}

export const orderStatusIconText = (
  statusDisplayName: string
): {
  icon: JSX.Element | null
  translationSlug: string
  colorClassName: string
} => {
  switch (extractStatusName(statusDisplayName)) {
    case ORDER_STATUS_CANCELLED:
      return {
        icon: (
          <NavDelete className="icon-24 mt-auto mb-auto mr-2 text-feedback-error" />
        ),
        translationSlug: 'account.order-history.order-status.cancelled',
        colorClassName: 'text-feedback-error'
      }

    case ORDER_STATUS_FAILED:
      return {
        icon: (
          <NavDelete className="icon-24 mt-auto mb-auto mr-2 text-feedback-error" />
        ),
        translationSlug: 'account.order-history.order-status.payment-failed',
        colorClassName: 'text-feedback-error'
      }

    case ORDER_STATUS_PAYMENT_SUBMITTED:
    case ORDER_STATUS_EXPORTED:
    case ORDER_STATUS_LOYALTY_CASH_PROCESSED:
      return {
        icon: (
          <NavCheckmarkSmall className="icon-24 mt-auto mb-auto mr-2 text-primary-caribbean-green" />
        ),
        translationSlug: 'account.order-history.order-status.paid',
        colorClassName: 'text-feedback-success'
      }

    case ORDER_STATUS_NEW: // This should NEVER happen as orders should immediately go to `pending`. Handle it just in case.
    case ORDER_STATUS_ORDER_RESERVED:
    case ORDER_STATUS_INVOICE_RAISED:
    case ORDER_STATUS_DETAILS_PROVIDED:
    case ORDER_STATUS_PENDING:
      return {
        icon: (
          <Clock className="icon-24 mt-auto mb-auto mr-2 text-feedback-warning" />
        ),
        translationSlug: 'account.order-history.order-status.pending',
        colorClassName: 'text-labels-tangerine-base'
      }

    default:
      return {
        icon: null,
        translationSlug: '',
        colorClassName: ''
      }
  }
}
