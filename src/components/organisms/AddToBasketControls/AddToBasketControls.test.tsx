import { screen } from '@testing-library/react'
import type { DeepPartial } from '@reduxjs/toolkit'
import { FeatureFlag } from '~config/constants/feature-flags'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { product } from '~domains/product/__mocks__/product'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { RootState } from '~domains/redux'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { AddToBasketControls, AddToBasketControlsProps } from '.'

describe('AddToBasketControls', () => {
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

  const defaultProps = {
    newQuantitySelectorValue: 1,
    setNewQuantitySelectorValue: jest.fn(),
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn()
  }

  const setup = (
    props: Partial<AddToBasketControlsProps> = {},
    initialState = {},
    isNewQuantitySelector = false
  ) => {
    const { reset } = setupMatchMediaMock()
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <AddToBasketControls {...defaultProps} {...props} />,
      {
        initialState:
          Object.keys(initialState).length > 0
            ? initialState
            : ({
                server: {
                  product: {
                    content: {
                      data: { ...product, sku: '100000001' }
                    }
                  }
                },
                client: {
                  basket: {
                    content: {
                      data: basketWithProducts
                    }
                  }
                }
              } as DeepPartial<RootState>),
        featureFlags: {
          [FeatureFlag.PRODUCT_PDP_SHOW_SAVINGS]: true,
          [FeatureFlag.PRODUCT_PDP_ADD_TO_BASKET_CONTROLS_NEW_QUANTITY_SELECTOR]: isNewQuantitySelector
        }
      }
    )
    reset()
    return renderedComponent
  }

  it('renders the component', () => {
    setup()
    expect(screen.getByTestId('addToBasketControls')).toBeInTheDocument()
  })

  describe("if it's sticky", () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')

    it('renders the Product Savings', () => {
      setup({ isSticky: true })
      jest.runOnlyPendingTimers()
      expect(screen.getByTestId('productSavings')).toBeInTheDocument()
    })
    it('renders the Add to basket button', () => {
      setup({ isSticky: true })
      jest.runOnlyPendingTimers()
      expect(screen.getByTestId('addToBasketButton')).toBeInTheDocument()
    })
    it('renders the Quantity selector', () => {
      setup({ isSticky: true })
      jest.runOnlyPendingTimers()
      expect(screen.getByTestId('quantitySelector')).toBeInTheDocument()
    })
  })

  describe("if it's the new quantity selector", () => {
    it('renders the Add to basket button', () => {
      setup({}, {}, true)
      expect(screen.getByTestId('addToBasketButton')).toBeInTheDocument()
    })
    it('renders the Quantity selector', () => {
      setup({}, {}, true)
      expect(screen.getByTestId('quantitySelector')).toBeInTheDocument()
    })
    it("the Quantity selector buttons are not filled (they don't have any background color)", () => {
      setup({}, {}, true)
      expect(screen.getByTestId('quantitySelector')).toHaveClass('border')
      expect(screen.getByTestId('quantitySelector')).toHaveClass(
        'border-ui-grey-light'
      )
      expect(screen.getByTestId('quantitySelector')).toHaveClass('rounded')
    })
  })
})
