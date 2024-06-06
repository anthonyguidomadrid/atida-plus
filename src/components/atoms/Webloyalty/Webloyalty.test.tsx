import { render, screen } from '@testing-library/react'
import { Webloyalty, WebloyaltyProps } from './Webloyalty'

const defaultProps = {
  hash: '3633839eb5a848a52e1c495be4b5f92a',
  ckw: '',
  windowProdIDA: [
    {
      h: '3336333338333965623561383438613532653163343935626534623566393261',
      ckw: '',
      r: false
    }
  ],
  getWebloyalty: jest.fn(),
  pushToWindowProdIDAArray: jest.fn()
}

describe('Webloyalty', () => {
  const setup = (props: Partial<WebloyaltyProps> = {}) =>
    render(<Webloyalty {...defaultProps} {...props} />)

  it('renders Webloyalty', () => {
    setup()
    expect(screen.getByTestId('webloyalty')).toBeInTheDocument()
  })

  it('does not push in the window.prodID.a array if it is undefined', () => {
    setup({ windowProdIDA: undefined })
    expect(window?.prodID?.a).toBeUndefined()
  })
})
