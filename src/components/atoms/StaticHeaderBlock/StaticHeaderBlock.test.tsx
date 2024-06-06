import { render, screen } from '@testing-library/react'
import { StaticHeaderBlock, StaticHeaderBlockProps } from '.'

describe(StaticHeaderBlock, () => {
  const defaultProps = {
    title: 'Static Header Title'
  }

  const setup = (props: Partial<StaticHeaderBlockProps> = {}) =>
    render(<StaticHeaderBlock {...defaultProps} {...props} />)

  it('renders StaticHeaderBlock component', () => {
    setup()
    expect(screen.getByTestId('staticHeaderBlock')).toBeInTheDocument()
  })

  it('renders content', () => {
    setup()
    expect(screen.getByText('Static Header Title')).toBeInTheDocument()
  })
})
