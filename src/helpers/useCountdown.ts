import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const getFormattedFinishingDate = (
  finishingDate: string
): TimeLeft | undefined => {
  if (!finishingDate) return
  // We can't render the component if we receive the finishingDate in a format other than ISO string.
  // For example if a "test string" is received as the value of finishingDate, the timer would show NaN instead of the numbers.
  try {
    dayjs(finishingDate).toISOString()
  } catch (error) {
    return {} as TimeLeft
  }

  const finishingDateInDays = dayjs(Date.now()).diff(
    finishingDate as string,
    'days'
  )
  const finishingDateInHours = dayjs(Date.now())
    .subtract(finishingDateInDays, 'day')
    .diff(finishingDate as string, 'hours')
  const finishingDateInMinutes = dayjs(Date.now())
    .subtract(finishingDateInDays, 'day')
    .subtract(finishingDateInHours, 'hour')
    .diff(finishingDate as string, 'minutes')
  const finishingDateInSeconds = dayjs(Date.now())
    .subtract(finishingDateInDays, 'day')
    .subtract(finishingDateInHours, 'hour')
    .subtract(finishingDateInMinutes, 'minute')
    .diff(finishingDate as string, 'seconds')

  return {
    days:
      finishingDateInDays <= 0
        ? Math.abs(finishingDateInDays)
        : Math.abs(finishingDateInDays) * -1,
    hours:
      finishingDateInHours <= 0
        ? Math.abs(finishingDateInHours)
        : Math.abs(finishingDateInHours) * -1,
    minutes:
      finishingDateInMinutes <= 0
        ? Math.abs(finishingDateInMinutes)
        : Math.abs(finishingDateInMinutes) * -1,
    seconds:
      finishingDateInSeconds <= 0
        ? Math.abs(finishingDateInSeconds)
        : Math.abs(finishingDateInSeconds) * -1
  }
}

export const useCountdown = (finishingDate: string): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({} as TimeLeft)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const formattedFinishingDate = getFormattedFinishingDate(finishingDate)
      setTimeLeft(formattedFinishingDate ?? timeLeft)
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [finishingDate, timeLeft])

  return timeLeft
}
