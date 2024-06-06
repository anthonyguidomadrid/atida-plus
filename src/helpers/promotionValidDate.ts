import dayjs from 'dayjs'
import { Promotion } from '~domains/contentful/normalizers/promotion'

export const promotionHasInvalidDates = (
  promotion?: Promotion | undefined
): boolean => {
  return (
    !promotion?.validFrom ||
    !promotion?.validTo ||
    dayjs(promotion?.validTo).valueOf() < dayjs().valueOf() ||
    dayjs(promotion?.validFrom).valueOf() > dayjs().valueOf()
  )
}
