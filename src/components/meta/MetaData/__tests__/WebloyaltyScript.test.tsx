import { render, screen } from '@testing-library/react'
import { WebloyaltyScript } from '~components/meta/MetaData/WebloyaltyScript'

describe(WebloyaltyScript, () => {
  it('renders the script', () => {
    render(<WebloyaltyScript />)
    expect(screen.getByTestId('webloyalty-script')).toBeInTheDocument()
  })
})
