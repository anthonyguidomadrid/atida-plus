import { render } from '@testing-library/react'

import { SimpleHeader, SimpleHeaderProps } from '.'
import { setupMatchMediaMock } from '~domains/breakpoints'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe('SimpleHeader', () => {
  const initialProps = {
    backFunction: jest.fn(),
    image: {},
    title: 'Simple header title'
  }
  const setup = (
    props: SimpleHeaderProps = initialProps,
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    reset()
    return render(<SimpleHeader {...props} />)
  }

  it('renders the component', async () => {
    const { findByTestId } = setup()

    expect(await findByTestId('simpleHeader')).toBeInTheDocument()
  })

  it('fires the back function when the back button is clicked', async () => {
    const { findByRole } = setup()
    const button = await findByRole('button')
    button.click()

    expect(initialProps.backFunction).toHaveBeenCalled()
  })
})
