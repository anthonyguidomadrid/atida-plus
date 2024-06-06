import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RangeInput } from '.'
import { rangeInputMock } from './RangeInputConnected.mock'

describe('RangeInput', () => {
  const setup = (props = {}) => {
    const renderedComponent = render(
      <RangeInput {...rangeInputMock} {...props} />
    )
    return renderedComponent
  }
  describe('Range input component', () => {
    it('renders range input component', () => {
      setup()
      expect(screen.getByTestId('rangeInput')).toBeInTheDocument()
    })
  })
  it('renders min input field', () => {
    setup()
    expect(screen.getByTestId('minField')).toBeInTheDocument()
  })
  it('renders min input field', () => {
    setup()
    expect(screen.getByTestId('maxField')).toBeInTheDocument()
  })
  it('renders a correct value for min input field after user input', () => {
    setup()
    const inputEl = screen.getByTestId('minField')
    userEvent.type(inputEl, '28')

    expect(screen.getByTestId('minField')).toHaveValue(rangeInputMock.min)
  })
  it('renders a correct value for max input field after user input', () => {
    setup()
    const inputEl = screen.getByTestId('maxField')
    userEvent.type(inputEl, '35143')

    expect(screen.getByTestId('maxField')).toHaveValue(rangeInputMock.max)
  })
  it('renders the submit button', () => {
    setup()
    expect(screen.getByTestId('priceFilterButton')).toBeInTheDocument()
  })
  it('calls refine when submit buttons is clicked', () => {
    const refine = jest.fn()
    setup({ refine })
    expect(refine).toBeCalledTimes(0)
    const buttonEl = screen.getByTestId('priceFilterButton')
    userEvent.click(buttonEl)
    expect(refine).toBeCalledTimes(1)
  })
})
