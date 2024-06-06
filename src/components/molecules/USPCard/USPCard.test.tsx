import { screen, render } from '@testing-library/react'
import { USPCard } from '../USPCard'
import { USPCardProps } from './USPCard'

describe(USPCard, () => {
  const defaultProps = {
    title: 'Your trusted personal pharmacy expert',
    items: [
      {
        icon: 'Scan24',
        text: 'Free delivery above €49'
      },
      {
        icon: 'Return24',
        text: 'Free returns'
      },
      {
        icon: 'NavAdvice24',
        text: 'Personal help from our pharmacy team'
      }
    ]
  }
  const setup = (props: Partial<USPCardProps> = {}) =>
    render(<USPCard {...defaultProps} {...props} />)
  it('renders title', () => {
    const { getByText } = setup()
    expect(
      getByText('Your trusted personal pharmacy expert')
    ).toBeInTheDocument()
  })
  it('renders the correct number of USP items', () => {
    setup()
    expect(screen.getByRole('list').children).toHaveLength(
      defaultProps.items.length
    )
  })
  it("doesn't crash when title is not passed", () => {
    const { container } = setup({ title: undefined })
    expect(container).toBeInTheDocument()
  })
  it("doesn't crash when USPs are not passed", () => {
    const { container } = setup({ items: undefined })
    expect(container).toBeInTheDocument()
  })
})
