import dayjs from 'dayjs'
import { Promotion } from '~domains/contentful/normalizers/promotion'
import { promotionHasInvalidDates } from '../promotionValidDate'

const promoNoDates = ({
  createdAt: '2021-06-09T12:28:23.692Z',
  contentType: 'Promotion'
} as unknown) as Promotion

const promoDatesExpired = ({
  createdAt: '2021-06-09T12:28:23.692Z',
  contentType: 'Promotion',
  validFrom: '2021-06-04T00:00:00.000+02:00',
  validTo: '2021-06-11T00:00:00.000+02:00'
} as unknown) as Promotion

const now = dayjs()
const yesterday = now.subtract(1, 'day').format()
const tomorrow = now.add(1, 'day').format()

const promoDatesNotHappenedYet = ({
  createdAt: now.add(1, 'hour').format(),
  contentType: 'Promotion',
  validFrom: now.add(1, 'year').format(),
  validTo: now.add(2, 'year').format()
} as unknown) as Promotion

const promoWithValidDates = ({
  createdAt: '2021-06-09T12:28:23.692Z',
  contentType: 'Promotion',
  validFrom: yesterday,
  validTo: tomorrow
} as unknown) as Promotion

describe(promotionHasInvalidDates, () => {
  it('returns true when a promotion has no validFrom property', () => {
    expect(promotionHasInvalidDates(promoNoDates)).toBe(true)
  })
  it('returns true when a promotion has no validTo property', () => {
    expect(promotionHasInvalidDates(promoNoDates)).toBe(true)
  })
  it('returns true when a promotion has a validTo property that expired', () => {
    expect(promotionHasInvalidDates(promoDatesExpired)).toBe(true)
  })
  it('returns true when a promotion has a validFrom property that has not yet happened', () => {
    expect(promotionHasInvalidDates(promoDatesNotHappenedYet)).toBe(true)
  })
  it('returns false when a promotion has valid dates', () => {
    expect(promotionHasInvalidDates(promoWithValidDates)).toBe(false)
  })
})
