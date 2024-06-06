import { render } from '@testing-library/react'

import { BreakOutOfContainer } from './'

describe(BreakOutOfContainer, () => {
  const setup = () =>
    render(
      <BreakOutOfContainer>
        <div data-testid="testChildDiv">I'm a happy test div</div>
      </BreakOutOfContainer>
    )

  it('adds some specific styles to the div', async () => {
    const { findByTestId } = setup()
    const elem = await findByTestId('breakOutOfContainer')
    const childDiv = await findByTestId('testChildDiv')

    expect(elem).toBeInTheDocument()
    expect(childDiv).toBeInTheDocument()
    expect(elem).toHaveClass(
      ...['w-screen', 'relative', 'left-1/2', 'right-1/2', '-mx-w-1/2-screen']
    )
  })
})
