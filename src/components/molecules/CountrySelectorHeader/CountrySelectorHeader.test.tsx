import { screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { CountrySelectorHeader } from '.'

describe('CountrySelectorHeader', () => {
  const setup = (props: Record<string, unknown> = {}) =>
    renderWithStore(<CountrySelectorHeader {...props} />)

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('countrySelectorHeader')).toBeInTheDocument()
  })

  it('renders title', () => {
    setup()
    expect(
      screen.getByText('country-selector-header.title')
    ).toBeInTheDocument()
  })

  it('renders select', () => {
    setup()
    expect(screen.getByTestId('countrySelector')).toBeInTheDocument()
  })

  it('renders button', () => {
    setup()
    expect(screen.getByTestId('countrySelectorButton')).toBeInTheDocument()
  })
})
