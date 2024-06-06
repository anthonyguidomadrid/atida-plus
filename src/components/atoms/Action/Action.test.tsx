import { render, screen } from '@testing-library/react'
import { Action, ActionProps } from './index'

describe(Action, () => {
  const defaultProps = {
    testId: 'someId'
  } as const

  const setup = (props: Partial<ActionProps> = {}) =>
    render(
      <Action {...defaultProps} {...props}>
        <div data-testid="childId" />
      </Action>
    )

  it('renders the box', () => {
    setup()
    expect(screen.getByTestId('action-someId')).toBeInTheDocument()
  })

  it('renders the child', () => {
    setup()
    expect(screen.getByTestId('childId')).toBeInTheDocument()
  })
})
