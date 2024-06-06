import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_EXPORTED,
  ORDER_STATUS_FAILED,
  ORDER_STATUS_PENDING
} from '~config/constants/order-status'
import {
  SHIPMENT_STATUS_IN_PROGRESS,
  SHIPMENT_STATUS_DISPATCHED,
  SHIPMENT_STATUS_PARTIALLY_DISPATCHED,
  SHIPMENT_STATUS_CANCELLED
} from '~config/constants/shipment-status'
import { getOrderDetailsStatus } from '../getOrderDetailsStatus'
import { ReactComponent as NavDelete } from '../assets/svg/navigation-16px/NavDelete.svg'
import { ReactComponent as Clock } from '../assets/svg/navigation-24px/Clock.svg'

describe(getOrderDetailsStatus, () => {
  const cancelledIcon = (
    <NavDelete className="icon-24 mt-auto mb-auto mr-2 text-feedback-error" />
  )
  const failedIcon = (
    <NavDelete className="icon-24 mt-auto mb-auto mr-2 text-feedback-error" />
  )
  const pendingIcon = (
    <Clock className="icon-24 mt-auto mb-auto mr-2 text-feedback-warning" />
  )
  const cancelledTranslationSlug =
    'account.order-history.order-status.cancelled'
  const failedTranslationSlug =
    'account.order-history.order-status.payment-failed'
  const pendingTranslationSlug = 'account.order-history.order-status.pending'

  const cancelledColorClassName = 'text-feedback-error'
  const pendingColorClassName = 'text-labels-tangerine-base'

  it('returns in progress status translation slug and color className', () => {
    expect(
      getOrderDetailsStatus(ORDER_STATUS_EXPORTED, SHIPMENT_STATUS_IN_PROGRESS)
    ).toEqual({
      data: {
        translationSlug: `order.shipment-status.in_progress`,
        colorClassName: 'text-labels-tangerine-base'
      },
      isShipmentStatus: true
    })
  })

  it('returns dispatched status, translation slug and color className', () => {
    expect(
      getOrderDetailsStatus(ORDER_STATUS_EXPORTED, SHIPMENT_STATUS_DISPATCHED)
    ).toEqual({
      data: {
        translationSlug: `order.shipment-status.order_dispatched`,
        colorClassName: 'text-labels-tangerine-base'
      },
      isShipmentStatus: true
    })
  })

  it('returns partially dispatched status, translation slug and color className', () => {
    expect(
      getOrderDetailsStatus(
        ORDER_STATUS_EXPORTED,
        SHIPMENT_STATUS_PARTIALLY_DISPATCHED
      )
    ).toEqual({
      data: {
        translationSlug: `order.shipment-status.order_partially_dispatched`,
        colorClassName: 'text-labels-tangerine-base'
      },
      isShipmentStatus: true
    })
  })

  it('returns cancelled delivery status, translation slug and color className', () => {
    expect(
      getOrderDetailsStatus(ORDER_STATUS_EXPORTED, SHIPMENT_STATUS_CANCELLED)
    ).toEqual({
      data: {
        translationSlug: `order.shipment-status.cancelled_delivery`,
        colorClassName: 'text-feedback-error'
      },
      isShipmentStatus: true
    })
  })

  it('returns pending payment status, translation slug and color className', () => {
    expect(
      getOrderDetailsStatus(
        ORDER_STATUS_PENDING,
        SHIPMENT_STATUS_CANCELLED,
        false
      )
    ).toEqual({
      data: {
        icon: pendingIcon,
        translationSlug: pendingTranslationSlug,
        colorClassName: pendingColorClassName
      },
      isShipmentStatus: false
    })
  })

  it('returns cancelled payment status, translation slug and color className', () => {
    expect(
      getOrderDetailsStatus(
        ORDER_STATUS_CANCELLED,
        SHIPMENT_STATUS_CANCELLED,
        false
      )
    ).toEqual({
      data: {
        icon: cancelledIcon,
        translationSlug: cancelledTranslationSlug,
        colorClassName: cancelledColorClassName
      },
      isShipmentStatus: false
    })
  })

  it('returns failed payment status, translation slug and color className', () => {
    expect(
      getOrderDetailsStatus(
        ORDER_STATUS_FAILED,
        SHIPMENT_STATUS_CANCELLED,
        false
      )
    ).toEqual({
      data: {
        icon: failedIcon,
        translationSlug: failedTranslationSlug,
        colorClassName: cancelledColorClassName
      },
      isShipmentStatus: false
    })
  })
})
