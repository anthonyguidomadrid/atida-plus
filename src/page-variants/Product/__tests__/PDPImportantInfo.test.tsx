import { render, screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import {
  PDPInfoLayout,
  PDPInfoLayoutProps,
  PDPInfoDescription,
  PDPInfoDescriptionProps,
  PDPInfoDetails
} from '../PDPImportantInfo'
import { product } from '~domains/product/__mocks__/product'

describe(PDPInfoLayout, () => {
  const defaultProps = {
    children: 'Some important info'
  } as PDPInfoLayoutProps

  const setup = (props: Partial<PDPInfoLayoutProps> = defaultProps) =>
    render(<PDPInfoLayout {...props} />)

  it('renders the product info layout component', () => {
    setup()
    expect(screen.getByTestId('PDPInfoLayout')).toBeInTheDocument()
  })

  it('renders the children', () => {
    setup()
    expect(screen.getByText('Some important info')).toBeInTheDocument()
  })
})

describe(PDPInfoDescription, () => {
  const defaultProps = {
    children: 'Some important info description',
    data: {
      description: 'Some description'
    }
  } as PDPInfoDescriptionProps

  const setup = (props: Partial<PDPInfoDescriptionProps> = defaultProps) =>
    render(<PDPInfoDescription {...props} />)

  it('renders the product info description component', () => {
    setup()
    expect(screen.getByTestId('PDPInfoDescription')).toBeInTheDocument()
  })

  it('render the product info description component title', () => {
    setup()
    expect(screen.getByText('pdp.important-info-title')).toBeInTheDocument()
  })

  it('renders the description', () => {
    setup()
    expect(
      screen.getByText('Some important info description')
    ).toBeInTheDocument()
  })
})

describe(PDPInfoDetails, () => {
  const setup = () =>
    renderWithStore(<PDPInfoDetails />, {
      initialState: {
        server: {
          product: {
            content: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              data: product
            }
          }
        }
      }
    })

  it('renders the product info details component', () => {
    setup()
    expect(screen.getByTestId('PDPInfoDetails')).toBeInTheDocument()
  })

  it('renders the product info details component pzn', () => {
    setup()
    expect(screen.getByTestId('pdpInfoDetailPzn')).toBeInTheDocument()
    expect(screen.getByText('pdp.info-detail-title-pzn')).toBeInTheDocument()
    expect(screen.getByText('1234567')).toBeInTheDocument()
  })

  it('renders the product info details component supplier', () => {
    setup()
    expect(screen.getByTestId('pdpInfoDetailSupplier')).toBeInTheDocument()
    expect(
      screen.getByText('pdp.info-detail-title-supplier')
    ).toBeInTheDocument()
    expect(screen.getByText('LOreal Deutschland')).toBeInTheDocument()
  })

  it('renders the product info details component dosage', () => {
    setup()
    expect(screen.getByTestId('pdpInfoDetailDosage')).toBeInTheDocument()
    expect(screen.getByText('Shampoo')).toBeInTheDocument()
  })

  it('renders the product info details component size', () => {
    setup()
    expect(screen.getByTestId('pdpInfoDetailSize')).toBeInTheDocument()
    expect(screen.getByText('100 ml')).toBeInTheDocument()
  })

  it('renders the product info details component weight', () => {
    setup()
    expect(screen.getByTestId('pdpInfoDetailWeight')).toBeInTheDocument()
    expect(screen.getByText('100 g')).toBeInTheDocument()
  })

  it('renders the product info details component brand', () => {
    setup()
    expect(screen.getByTestId('pdpInfoDetailBrand')).toBeInTheDocument()
    expect(screen.getByText('Atida')).toBeInTheDocument()
  })
})
