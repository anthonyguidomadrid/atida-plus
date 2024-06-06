import { render, fireEvent } from '@testing-library/react'

import { InteractionTracker, InteractionTrackerProps } from '.'

describe(InteractionTracker, () => {
  const initialProps = {
    trackingHandler: jest.fn()
  }

  const setup = (props: InteractionTrackerProps = initialProps) =>
    render(
      <InteractionTracker {...props}>
        <div>this is a test div</div>
      </InteractionTracker>
    )

  it('renders the children', async () => {
    const { findByText } = setup()

    expect(await findByText('this is a test div')).toBeInTheDocument()
  })

  it('renders the children with a wrapper that has click handler', async () => {
    const { findByTestId } = setup()

    const wrapper = await findByTestId('interactionTracker')
    wrapper.click()
    expect(initialProps.trackingHandler).toHaveBeenCalled()
  })

  it('renders the children with a wrapper that has keyup handler that only fires when Enter is hit', async () => {
    const { findByTestId } = setup()
    const wrapper = await findByTestId('interactionTracker')

    fireEvent.keyUp(wrapper, { key: 'Tab' })
    expect(initialProps.trackingHandler).not.toHaveBeenCalled()

    // trackingHandler will only fire for the Enter key
    fireEvent.keyUp(wrapper, { key: 'Enter' })
    expect(initialProps.trackingHandler).toHaveBeenCalled()
  })
})
