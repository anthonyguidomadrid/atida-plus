import { screen, render } from '@testing-library/react'
import { EmailPreferences, EmailPreferencesProps } from './index'

describe(EmailPreferences, () => {
  const setup = (props: Partial<EmailPreferencesProps> = {}) =>
    render(<EmailPreferences {...props} />)

  it('renders EmailPreferences component', () => {
    setup()
    expect(screen.getByTestId('emailPreferences')).toBeInTheDocument()
  })

  it('renders order status updated checkbox', () => {
    setup()
    expect(screen.getByTestId('orderStatusUpdated')).toBeInTheDocument()
  })

  it('renders personal recommendations checkbox', () => {
    setup()
    expect(screen.getByTestId('personalRecommendations')).toBeInTheDocument()
  })

  it('renders pinned products notifications checkbox', () => {
    setup()
    expect(
      screen.getByTestId('pinnedProductsNotifications')
    ).toBeInTheDocument()
  })
})
