import { fireEvent, screen } from '@testing-library/react'
import { mockedProducts } from '../../../__mocks__/pop/productsAndContentBlocks'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import {
  MinifiedProductTile,
  MinifiedProductTileProps
} from './MinifiedProductTile'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe(MinifiedProductTile, () => {
  const defaultProps = {
    product: mockedProducts[0],
    isMainProduct: false,
    onSelect: jest.fn(),
    isSelected: false,
    showCheckbox: true
  }

  const setup = (props: Partial<MinifiedProductTileProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    renderWithStoreAndFeatureFlags(
      <RouterContext.Provider value={routerMock}>
        <MinifiedProductTile {...defaultProps} {...props} />
      </RouterContext.Provider>,
      {
        featureFlags: {
          [FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER]: true
        }
      }
    )
    reset()
  }

  it('renders the component', () => {
    setup()
    expect(
      screen.getByTestId('minifiedProductTile-983615796546')
    ).toBeInTheDocument()
  })

  it('renders the product name', () => {
    setup()
    expect(screen.getByText(mockedProducts[0].name)).toBeInTheDocument()
  })

  it('renders the product image', () => {
    setup()
    expect(screen.getByTestId('MinifiedProductTileImage')).toBeInTheDocument()
  })

  it('render label when it is the principal product', () => {
    setup({
      isMainProduct: true,
      product: {
        ...mockedProducts[0],
        availability: 'AVAILABLE'
      }
    })
    expect(
      screen.getByTestId('MinifiedProductTilePrincipalProduct')
    ).toBeInTheDocument()
  })

  it('render notification when the product is out of stock', () => {
    setup({
      isMainProduct: true,
      product: {
        ...mockedProducts[0],
        availability: 'NOT_AVAILABLE'
      }
    })
    expect(
      screen.getByTestId('MinifiedProductTileOutStock')
    ).toBeInTheDocument()
  })

  it('selected product', () => {
    setup()
    const input = screen.getByTestId('MinifiedProductTileInput')
    fireEvent.click(input)
    expect(defaultProps.onSelect).toHaveBeenCalled()
  })

  it('Dont show checkbox when ', () => {
    setup({ showCheckbox: false })
    expect(
      screen.queryByTestId('MinifiedProductTileInput')
    ).not.toBeInTheDocument()
  })
})
