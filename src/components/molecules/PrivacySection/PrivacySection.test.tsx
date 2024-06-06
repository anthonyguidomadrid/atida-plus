import { screen, render } from '@testing-library/react'
import { PrivacySection } from './index'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe(PrivacySection, () => {
  const setup = () => render(<PrivacySection />)

  beforeEach(setup)

  it('renders PrivacySection component', () => {
    expect(screen.getByTestId('privacySection')).toBeInTheDocument()
  })

  it('renders personal data preference panel', () => {
    expect(
      screen.getByTestId('preferencePanelPersonalData')
    ).toBeInTheDocument()
  })

  it('renders delete account preference panel', () => {
    expect(
      screen.getByTestId('preferencePanelDeleteAccount')
    ).toBeInTheDocument()
  })
})
