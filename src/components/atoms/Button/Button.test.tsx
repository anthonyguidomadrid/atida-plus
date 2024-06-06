import { render, screen } from '@testing-library/react'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { Button } from './Button'

describe('Button', () => {
  it('renders button with content and attributes', () => {
    render(
      <Button variant="secondary" disabled>
        Some Button
      </Button>
    )
    expect(screen.getByText('Some Button').parentElement?.tagName).toBe(
      'BUTTON'
    )
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.queryByTestId('buttonLoadingSpinner')).not.toBeInTheDocument()
  })

  it('renders loading spinner when isLoading is true', () => {
    render(<Button isLoading>Some Button</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByTestId('buttonLoadingSpinner')).toBeInTheDocument()
  })

  describe('with icon', () => {
    it('renders the icon before the content by default', () => {
      render(<Button icon={<ChevronLeft />}>Some Button</Button>)
      expect(
        screen.getByText('Some Button').parentElement?.firstChild?.nodeName
      ).toBe('svg')
    })

    it('renders the icon after the content when iconPosition is "after"', () => {
      render(
        <Button icon={<ChevronLeft />} iconPosition="after">
          Some Button
        </Button>
      )
      expect(
        screen.getByText('Some Button').parentElement?.lastChild?.nodeName
      ).toBe('svg')
    })

    it('renders an icon-only button', () => {
      render(<Button icon={<ChevronLeft />} aria-label="Some Button" />)
      expect(screen.getByLabelText('Some Button').lastChild?.nodeName).toBe(
        'svg'
      )
      expect(screen.getByLabelText('Some Button').textContent).toBe('')
    })
  })
})
