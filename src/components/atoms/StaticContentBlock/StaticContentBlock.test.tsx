import { render, screen } from '@testing-library/react'
import { StaticContentBlock, StaticContentBlockProps } from '.'

describe(StaticContentBlock, () => {
  const defaultProps = {
    title: 'Delete account',
    content:
      '<p>You can submit a request to have your account, with email address {{userEmail}}, deleted by us.</p><h4>How it works</h4><ul><li><p>All your data will be removed from our systems</p></li><li><p>You can no longer log in and access your data</p></li><li><p>You have to create a new account if you want to order something again</p></li><li><p>Your account is deleted 14 days after your request. Change your mind? Let us know on time</p></li></ul><h4>Tips</h4><ul><li><p>Download your invoices in advance. After deleting your account you can no longer access them</p></li><li><p>Make sure there are no open orders or invoices, otherwise we can’t delete your account</p></li></ul><p></p>'
  }

  const setup = (props: Partial<StaticContentBlockProps> = {}) =>
    render(<StaticContentBlock {...defaultProps} {...props} />)

  it('renders StaticContentBlock component', () => {
    setup()
    expect(screen.getByTestId('staticContentBlock')).toBeInTheDocument()
  })

  it('renders content', () => {
    setup()
    expect(
      screen.getByText(
        'You can submit a request to have your account, with email address {{userEmail}}, deleted by us.'
      )
    ).toBeInTheDocument()
  })
})
