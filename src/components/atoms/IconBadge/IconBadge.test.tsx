import { render, screen } from '@testing-library/react'
import { IconBadge } from './IconBadge'
import { ReactComponent as Visa } from '~assets/svg/navigation-16px/Visa.svg'

describe('IconBadge', () => {
  it('should render SVG icon', () => {
    render(<IconBadge icon={<Visa />} />)
    expect(
      screen.getByTestId('iconBadge').querySelector('svg')
    ).toBeInTheDocument()
  })
})
