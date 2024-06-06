import {
  SHIPMENT_STATUS_CANCELLED,
  SHIPMENT_STATUS_DELIVERED,
  SHIPMENT_STATUS_DISPATCHED,
  SHIPMENT_STATUS_IN_PROGRESS,
  SHIPMENT_STATUS_PARTIALLY_DISPATCHED
} from '~config/constants/shipment-status'
import { getShipmentStatus } from '../getShipmentStatus'

describe(getShipmentStatus, () => {
  it('returns in progress status translation slug and color className', () => {
    expect(getShipmentStatus(SHIPMENT_STATUS_IN_PROGRESS)).toEqual({
      translationSlug: `order.shipment-status.in_progress`,
      colorClassName: 'text-labels-tangerine-base'
    })
  })

  it('returns dispatched status translation slug and color className', () => {
    expect(getShipmentStatus(SHIPMENT_STATUS_DISPATCHED)).toEqual({
      translationSlug: `order.shipment-status.order_dispatched`,
      colorClassName: 'text-labels-tangerine-base'
    })
  })

  it('returns delivered status translation slug and color className', () => {
    expect(getShipmentStatus(SHIPMENT_STATUS_DELIVERED)).toEqual({
      translationSlug: `order.shipment-status.order_delivered`,
      colorClassName: 'text-feedback-success'
    })
  })

  it('returns partially dispatched status translation slug and color className', () => {
    expect(getShipmentStatus(SHIPMENT_STATUS_PARTIALLY_DISPATCHED)).toEqual({
      translationSlug: `order.shipment-status.order_partially_dispatched`,
      colorClassName: 'text-labels-tangerine-base'
    })
  })

  it('returns cancelled delivery dispatched status translation slug and color className', () => {
    expect(getShipmentStatus(SHIPMENT_STATUS_CANCELLED)).toEqual({
      translationSlug: `order.shipment-status.cancelled_delivery`,
      colorClassName: 'text-feedback-error'
    })
  })

  it('returns default delivery status', () => {
    expect(getShipmentStatus('')).toEqual({
      translationSlug: 'order.shipment-status.processing_order',
      colorClassName: 'text-labels-tangerine-base'
    })
  })
})
