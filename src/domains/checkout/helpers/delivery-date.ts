import dayjs from 'dayjs'
import { getDefaultLocale } from '~domains/translated-routes'
require('dayjs/locale/pt')

const getTranslatedDates = (locale: string) => ({
  today: dayjs().locale(locale.substr(0, 2)).add(1, 'day'),
  fewDaysFromNow: dayjs().locale(locale.substr(0, 2)).add(3, 'days')
})

const formatDeliveryDate = (date: dayjs.Dayjs) => date.format('DD MMMM')
const formatShipmentDate = (date: dayjs.Dayjs) => date.format('D/M')

export const getDeliveryDateFormat = (locale = getDefaultLocale()): string => {
  const dates = getTranslatedDates(locale)
  return dates.today.month() === dates.fewDaysFromNow.month()
    ? `${dates.today.format('DD MMMM')} - ${formatDeliveryDate(
        dates.fewDaysFromNow
      )}`
    : `${formatDeliveryDate(dates.today)} - ${formatDeliveryDate(
        dates.fewDaysFromNow
      )}`
}

export const getShipmentDateFormat = (locale = getDefaultLocale()): string => {
  const dates = getTranslatedDates(locale)
  return dates.today.month() === dates.fewDaysFromNow.month()
    ? `${dates.today.date()} - ${formatShipmentDate(dates.fewDaysFromNow)}`
    : `${formatShipmentDate(dates.today)} - ${formatShipmentDate(
        dates.fewDaysFromNow
      )}`
}

export const getMultibancoExpirationDate = (
  multibancoExpirationDate: string | undefined,
  locale = getDefaultLocale()
): string => {
  if (!multibancoExpirationDate) return ''
  return dayjs(multibancoExpirationDate)
    .locale(locale.substr(0, 2))
    .format('dddd DD MMMM YYYY H:mm')
}
