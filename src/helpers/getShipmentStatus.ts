import {
  SHIPMENT_STATUS_IN_PROGRESS,
  SHIPMENT_STATUS_DISPATCHED,
  SHIPMENT_STATUS_PARTIALLY_DISPATCHED,
  SHIPMENT_STATUS_CANCELLED,
  SHIPMENT_STATUS_DELIVERED
} from './../config/constants/shipment-status'

export const getShipmentColorClassName = (status?: string | null) => {
  switch (status) {
    case SHIPMENT_STATUS_DELIVERED:
      return 'text-feedback-success'
    case SHIPMENT_STATUS_CANCELLED:
      return 'text-feedback-error'
    case SHIPMENT_STATUS_IN_PROGRESS:
    case SHIPMENT_STATUS_DISPATCHED:
    case SHIPMENT_STATUS_PARTIALLY_DISPATCHED:
    default:
      return 'text-labels-tangerine-base'
  }
}

export const getShipmentStatus = (status?: string | null) => {
  return {
    translationSlug: status
      ? `order.shipment-status.${status}`
      : 'order.shipment-status.processing_order',
    colorClassName: getShipmentColorClassName(status)
  }
}
