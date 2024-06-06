export const SHIPMENT_STATUS_IN_PROGRESS = 'in_progress'
export const SHIPMENT_STATUS_DISPATCHED = 'order_dispatched'
export const SHIPMENT_STATUS_PARTIALLY_DISPATCHED = 'order_partially_dispatched'
export const SHIPMENT_STATUS_CANCELLED = 'cancelled_delivery'
// 1. Name could be different - needs to be implemented on the backend first
// 2. Add translation key in contentful
export const SHIPMENT_STATUS_DELIVERED = 'order_delivered'

export const SHIPMENT_STATUSES = [
  SHIPMENT_STATUS_IN_PROGRESS,
  SHIPMENT_STATUS_DISPATCHED,
  SHIPMENT_STATUS_PARTIALLY_DISPATCHED,
  SHIPMENT_STATUS_CANCELLED
] as const
