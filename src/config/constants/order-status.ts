export const ORDER_STATUS_NEW = 'new'
export const ORDER_STATUS_INVOICE_RAISED = 'invoice-raised'
export const ORDER_STATUS_DETAILS_PROVIDED = 'payment-details-provided'
export const ORDER_STATUS_ORDER_RESERVED = 'order-reserved'
export const ORDER_STATUS_PENDING = 'pending'
export const ORDER_STATUS_CANCELLED = 'cancelled'
export const ORDER_STATUS_FAILED = 'payment-failed'
export const ORDER_STATUS_PAYMENT_SUBMITTED = 'payment-submitted'
export const ORDER_STATUS_EXPORTED = 'exported'
export const ORDER_STATUS_LOYALTY_CASH_PROCESSED = 'loyalty-cash-processed'

export const ORDER_STATUS_PREFIX = 'oms.state.'

export const ORDER_PENDING_STATUSES = [
  ORDER_STATUS_NEW,
  ORDER_STATUS_ORDER_RESERVED,
  ORDER_STATUS_INVOICE_RAISED,
  ORDER_STATUS_DETAILS_PROVIDED,
  ORDER_STATUS_PENDING
]

export const ORDER_FAILED_STATUSES = [
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_FAILED
]
