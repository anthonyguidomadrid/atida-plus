import { render, screen } from '@testing-library/react'
import { Tooltip, TooltipProps } from './Tooltip'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('Tooltip', () => {
  const setup = (props: Partial<TooltipProps> = {}) =>
    render(
      <Tooltip
        children={<p>button</p>}
        content="text in tooltip"
        delay={200}
        {...props}
      />
    )

  it('renders tooltip', () => {
    setup()
    expect(screen.getByTestId('tooltip-content-wrapper')).toBeInTheDocument()
  })

  it('renders tooltip content', async () => {
    setup()
    fireEvent.mouseEnter(screen.getByTestId('tooltip-content-wrapper'))
    waitFor(() =>
      expect(screen.getByText('text in tooltip')).toBeInTheDocument()
    )
  })

  it('render text content', () => {
    setup()
    fireEvent.mouseEnter(screen.getByTestId('tooltip-content-wrapper'))
    waitFor(() => expect(screen.getByText('test')).toBeInTheDocument())
  })

  it('renders children', () => {
    setup()
    expect(screen.getByText('button')).toBeInTheDocument()
  })

  it('renders tooltip when unhovered', () => {
    setup()
    fireEvent.mouseLeave(screen.getByTestId('tooltip-content-wrapper'))
    expect(screen.getByTestId('tooltip-content-wrapper')).toBeInTheDocument()
  })

  it('renders tooltip when clicked', () => {
    setup()
    fireEvent.click(screen.getByTestId('tooltip-content-wrapper'))
    waitFor(() =>
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument()
    )
  })

  it('hides tooltip when clicked', () => {
    setup()
    fireEvent.click(screen.getByTestId('tooltip-content-wrapper'))
    fireEvent.click(screen.getByTestId('tooltip-content-wrapper'))
    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument()
  })

  it('render tooltip on hover', () => {
    setup()
    const button = screen.getByText('button')
    fireEvent.mouseEnter(button)
    waitFor(() =>
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument()
    )
  })
})
