import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe(ProgressBar, () => {
  it('fills 0% of container when now value is 0', () => {
    render(<ProgressBar now={0} max={432} />)
    expect(screen.getByTestId('progressBarValue')).toHaveStyle({ width: '0%' })
  })

  it('fills 50% of bar when now value is half of max value', () => {
    render(<ProgressBar now={432 / 2} max={432} />)
    expect(screen.getByTestId('progressBarValue')).toHaveStyle({ width: '50%' })
  })

  it('fills 100% of container when now value is equal to max value', () => {
    render(<ProgressBar now={432} max={432} />)
    expect(screen.getByTestId('progressBarValue')).toHaveStyle({
      width: '100%'
    })
  })

  it('fills 100% of container when now value is greater than max value', () => {
    render(<ProgressBar now={432 * 2} max={432} />)
    expect(screen.getByTestId('progressBarValue')).toHaveStyle({
      width: '100%'
    })
  })
})
