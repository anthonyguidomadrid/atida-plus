import { render, screen } from '@testing-library/react'
import { MondialRelayScript } from '~components/meta/MetaData/MondialRelayScript'

describe(MondialRelayScript, () => {
  it('renders the scripts', () => {
    render(<MondialRelayScript zipCode="12345" />)
    expect(
      screen.getByTestId('mondial-relay-jquery-script')
    ).toBeInTheDocument()
  })
})
