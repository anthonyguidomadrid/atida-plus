import { render, screen } from '@testing-library/react'
import { BusinessDetails, BusinessDetailsProps } from './index'
import { useRouter } from 'next/router'

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

describe('Business Details page - PT', () => {
  const defaultProps = {
    companyName: 'Company Name',
    taxReference: '12345678A',
    equivalenceSurcharge: true
  }

  const setup = (props: Partial<BusinessDetailsProps> = {}) =>
    render(<BusinessDetails {...defaultProps} {...props} />)

  it('renders BusinessDetails component', () => {
    setup()
    expect(screen.getByTestId('businessDetails')).toBeInTheDocument()
  })
  it('renders business name field', () => {
    setup()
    expect(screen.getByTestId('businessDetailsCompanyName')).toBeInTheDocument()
  })
  it('renders the tax reference field', () => {
    setup()
    expect(
      screen.getByTestId('businessDetailsTaxReference')
    ).toBeInTheDocument()
  })
  it('does not render the equivalence surcharge field', () => {
    setup()
    expect(
      screen.queryByText('shared.equivalence-surcharge')
    ).not.toBeInTheDocument()
  })

  it('renders edit business details field', () => {
    setup()
    expect(
      screen.getByTestId('preferencePanelUpdateBusinessDetails')
    ).toBeInTheDocument()
  })
})

describe('Business Details page - ES', () => {
  const defaultProps = {
    companyName: 'Company Name',
    taxReference: '12345678A',
    equivalenceSurcharge: true
  }

  const setup = (props: Partial<BusinessDetailsProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: undefined,
      locale: 'es-es'
    }))

    render(<BusinessDetails {...defaultProps} {...props} />)
  }

  it('renders BusinessDetails component', () => {
    setup()
    expect(screen.getByTestId('businessDetails')).toBeInTheDocument()
  })
  it('renders business name field', () => {
    setup()
    expect(screen.getByTestId('businessDetailsCompanyName')).toBeInTheDocument()
  })
  it('renders the tax reference field', () => {
    setup()
    expect(
      screen.getByTestId('businessDetailsTaxReference')
    ).toBeInTheDocument()
  })
  it('renders the equivalence surcharge field', () => {
    setup()
    expect(
      screen.getByTestId('businessDetailsEquivalenceSurcharge')
    ).toBeInTheDocument()
  })

  it('renders edit business details field', () => {
    setup()
    expect(
      screen.getByTestId('preferencePanelUpdateBusinessDetails')
    ).toBeInTheDocument()
  })
})
