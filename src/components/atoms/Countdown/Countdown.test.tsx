import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'

import { Countdown } from '.'
import { CountdownProps } from '~components/atoms/Countdown/types'
import * as countdownHook from '~helpers/useCountdown'

describe('Countdown', () => {
  const endDate = dayjs(Date.now()).add(3, 'days').toISOString()
  const initialData: CountdownProps = {
    finishingDate: endDate,
    isMinified: false
  }

  const setup = (props: CountdownProps = initialData) =>
    render(<Countdown {...props} />)

  it("doesn't render the component when there is no time left", async () => {
    setup({
      ...initialData,
      finishingDate: dayjs(Date.now()).subtract(1, 'day').toISOString()
    })

    const countdown = await screen.queryByTestId('countDownComponent')
    expect(countdown).not.toBeInTheDocument()
  })

  it('renders the countdown component, when there is a valid end date', async () => {
    setup()

    const countdown = await screen.findByTestId('countDownComponent')
    expect(countdown).toBeInTheDocument()
  })

  it("won't render the countdown component, when the timer falls below 0 (the endDate is < than Date.now())", async () => {
    jest.spyOn(countdownHook, 'useCountdown').mockReturnValue({
      days: -1,
      hours: -1,
      minutes: -1,
      seconds: -1
    })
    setup()

    const countdown = await screen.queryByTestId('countDownComponent')
    expect(countdown).not.toBeInTheDocument()
    jest.restoreAllMocks()
  })

  it('renders : only when in minified mode', async () => {
    setup({
      ...initialData,
      isMinified: true
    })

    const colons = await screen.findAllByText(':')
    expect(colons.length).toBe(3)
  })

  it("doesn't render : when in un-minified mode", () => {
    setup({
      ...initialData,
      isMinified: false
    })

    const colons = screen.queryAllByText(':')
    expect(colons.length).toBe(0)
  })

  it('renders the names of the time measurements when in un-minified mode', async () => {
    setup()

    const days = await screen.findByText('COUNTDOWN.DAYS_PLURAL')
    const hours = await screen.findByText('COUNTDOWN.HOURS_PLURAL')
    const minutes = await screen.findByText('COUNTDOWN.MINUTES_PLURAL')
    const seconds = await screen.findByText('COUNTDOWN.SECONDS_PLURAL')

    expect(days).toBeInTheDocument()
    expect(hours).toBeInTheDocument()
    expect(minutes).toBeInTheDocument()
    expect(seconds).toBeInTheDocument()
  })

  it('renders abbreviations when in minified mode', async () => {
    setup({
      ...initialData,
      isMinified: true
    })

    const days = await screen.findByText('D')
    const hours = await screen.findByText('H')
    const minutes = await screen.findByText('M')
    const seconds = await screen.findByText('S')

    expect(days).toBeInTheDocument()
    expect(hours).toBeInTheDocument()
    expect(minutes).toBeInTheDocument()
    expect(seconds).toBeInTheDocument()
  })
})
