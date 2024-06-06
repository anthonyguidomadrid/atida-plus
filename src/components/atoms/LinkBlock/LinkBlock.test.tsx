import { render, screen } from '@testing-library/react'
import { LinkBlock } from '.'

describe('LinkBlock', () => {
  it('renders button correctly', () => {
    render(<LinkBlock label="Some Button" url="/some-link" />)
    expect(screen.getByText('Some Button').tagName).toBe('SPAN')
    expect(screen.getByTestId('LinkBlock').children[0].nodeName).toBe('BUTTON')
    expect(screen.getByTestId('LinkBlock').nodeName).toBe('DIV')
  })
  it('renders button with the icon when it the icon reference passed', () => {
    render(<LinkBlock label="Some Button" url="/some-link" icon="PlusLarge" />)
    expect(
      screen.getByTestId('LinkBlock').children[0].children[0].nodeName
    ).toBe('DIV')
    expect(
      screen
        .getByText('Some Button')
        .querySelector('[data-testid="dynamic component"]')
    ).toBeInTheDocument
  })
})
