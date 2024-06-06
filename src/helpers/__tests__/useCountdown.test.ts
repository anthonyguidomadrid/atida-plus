import MockDate from 'mockdate'
import { getFormattedFinishingDate } from '../useCountdown'

describe('useCountdown/getFormattedFinishingDate', () => {
  const currentDate = '2021-10-07T14:51:02.000+02:00'
  const finishingDate = '2021-10-09T00:00:00.000+02:00'

  beforeEach(() => {
    MockDate.set(currentDate)
  })
  afterEach(() => {
    MockDate.reset()
  })

  it('returns expected object if a correct ISO date is passed', () => {
    const formattedFinishingDate = getFormattedFinishingDate(finishingDate)
    expect(formattedFinishingDate?.days).toBe(1)
    expect(formattedFinishingDate?.hours).toBe(9)
    expect(formattedFinishingDate?.minutes).toBe(8)
    expect(formattedFinishingDate?.seconds).toBe(58)
  })

  it('returns undefined if an empty string is passed', () => {
    const formattedFinishingDate = getFormattedFinishingDate('')
    expect(formattedFinishingDate).toBe(undefined)
  })
})
