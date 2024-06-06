import { render, screen } from '@testing-library/react'
import { Tag, TagProps } from './Tag'

describe(Tag, () => {
  const setup = (props: Partial<TagProps> = {}) =>
    render(<Tag {...props}>Nav item 6</Tag>)

  it('renders as a link', () => {
    setup({ href: '/nav-item-6' })
    expect(screen.getByRole('link', { name: 'Nav item 6' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Nav item 6' })).toHaveAttribute(
      'href',
      '/nav-item-6'
    )
    expect(screen.getByRole('link', { name: 'Nav item 6' })).not.toHaveClass(
      'button--primary'
    )
  })

  it('does not render any href or link attribute is no href prop is sent', () => {
    setup()
    const link = screen.getByTestId('tagLink')
    expect(link).not.toHaveAttribute('href', '/nav-item-6')
  })

  describe('when tag is selected', () => {
    it('applies new class name', () => {
      setup({ isSelected: true, href: '/nav-item-6' })
      expect(screen.getByRole('link', { name: 'Nav item 6' })).toHaveClass(
        'button--primary'
      )
    })
  })
})
