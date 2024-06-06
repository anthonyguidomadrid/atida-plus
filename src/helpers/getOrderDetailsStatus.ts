import { ORDER_FAILED_STATUSES } from '~config/constants/order-status'
import { SHIPMENT_STATUSES } from '~config/constants/shipment-status'
import { getShipmentStatus } from './getShipmentStatus'
import { orderStatusIconText } from './orderStatusIconText'

export const getOrderDetailsStatus = (
  orderStatus: string,
  shipmentStatus: typeof SHIPMENT_STATUSES[number] | null | undefined,
  showShipmentStatusAfterSuccessfulPayment = true
) => {
  const isOrderStatusFailed = ORDER_FAILED_STATUSES.some(status =>
    orderStatus.includes(status)
  )

  if (!isOrderStatusFailed && showShipmentStatusAfterSuccessfulPayment) {
    return { data: getShipmentStatus(shipmentStatus), isShipmentStatus: true }
  }

  return { data: orderStatusIconText(orderStatus), isShipmentStatus: false }
}
