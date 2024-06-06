import dayjs from 'dayjs'
import {
  getDeliveryDateFormat,
  getShipmentDateFormat,
  getMultibancoExpirationDate
} from '../delivery-date'

const today = dayjs().add(1, 'day')
const fewDaysFromNow = dayjs().add(3, 'days')
const todayMonth = today.month()
const fewDaysFromNowMonth = fewDaysFromNow.month()

describe(getDeliveryDateFormat, () => {
  const deliveryDateFormat = getDeliveryDateFormat('pt')
  it('returns the delivery date in the correct format', () => {
    expect(deliveryDateFormat).toMatch(
      `${today.locale('pt').format('DD MMMM')} - ${fewDaysFromNow
        .locale('pt')
        .format('DD MMMM')}`
    )
  })
  it('returns a date in English when no locale is sent', () => {
    expect(getDeliveryDateFormat()).toMatch(
      `${today.locale('en').format('DD MMMM')} - ${fewDaysFromNow
        .locale('en')
        .format('DD MMMM')}`
    )
  })
})

describe(getShipmentDateFormat, () => {
  const shipmentDateFormat = getShipmentDateFormat('pt')
  if (todayMonth === fewDaysFromNowMonth) {
    it('returns the shipment date in the correct format', () => {
      expect(shipmentDateFormat).toMatch(
        `${today.locale('pt').format('D')} - ${fewDaysFromNow
          .locale('pt')
          .format('D/M')}`
      )
    })
    it('returns a date in English when no locale is sent', () => {
      expect(getShipmentDateFormat()).toMatch(
        `${today.locale('en').format('D')} - ${fewDaysFromNow
          .locale('en')
          .format('D/M')}`
      )
    })
  } else {
    it('returns the shipment date in the correct format', () => {
      expect(shipmentDateFormat).toMatch(
        `${today.locale('pt').format('D/M')} - ${fewDaysFromNow
          .locale('pt')
          .format('D/M')}`
      )
    })
    it('returns a date in English when no locale is sent', () => {
      expect(getShipmentDateFormat()).toMatch(
        `${today.locale('en').format('D/M')} - ${fewDaysFromNow
          .locale('en')
          .format('D/M')}`
      )
    })
  }
})

describe(getMultibancoExpirationDate, () => {
  const sibsMultibancoExpirationDateFormatted = getMultibancoExpirationDate(
    fewDaysFromNow.toISOString(),
    'pt-pt'
  )
  it('returns the shipment date in the correct format', () => {
    expect(sibsMultibancoExpirationDateFormatted).toMatch(
      `${fewDaysFromNow.locale('pt').format('dddd DD MMMM YYYY H:mm')}`
    )
  })
  it('returns a date in English when no locale is sent', () => {
    expect(getMultibancoExpirationDate(fewDaysFromNow.toISOString())).toMatch(
      `${fewDaysFromNow.locale('en').format('dddd DD MMMM YYYY H:mm')}`
    )
  })
  it('returns an empty string if no date is sent', () => {
    expect(getMultibancoExpirationDate('', 'pt-pt')).toMatch('')
  })
})
