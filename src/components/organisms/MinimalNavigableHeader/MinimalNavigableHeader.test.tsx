import { render, screen } from '@testing-library/react'
import { MinimalNavigableHeader, MinimalNavigableHeaderProps } from '.'

describe(MinimalNavigableHeader, () => {
  const setup = (props: Partial<MinimalNavigableHeaderProps> = {}) =>
    render(<MinimalNavigableHeader {...props} />)

  it('renders as an accessible element', () => {
    setup({
      button: true
    })
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the header', () => {
    setup()
    expect(screen.getByTestId('MinimalNavigableHeader')).toBeInTheDocument()
  })

  it("doesn't error if no button component is passed", () => {
    const { container } = setup({ button: undefined })
    expect(container).toBeInTheDocument()
  })
})
