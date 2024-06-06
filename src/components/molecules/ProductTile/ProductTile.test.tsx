import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductTile, ProductTileProps } from '.'
import { product } from './ProductTile.mock'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import {
  renderWithMockedStore,
  renderWithMockedStoreAndFeatureFlags,
  renderWithStoreAndFeatureFlags
} from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { triggerReportProductClicked } from '~domains/analytics'
import { changeItemQuantityTrigger } from '~domains/basket'

describe('productCard', () => {
  const setup = (props: Partial<ProductTileProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <ProductTile {...product} {...props} idx={1} />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_FAVOURITES_ALL_PAGES]: true,
          [FeatureFlag.PRODUCT_QUANTITY_SELECTOR]: true
        }
      }
    )

    reset()
    return renderedComponent
  }

  describe('test id and attributes', () => {
    it('renders with correct test id', () => {
      setup()
      expect(screen.getByTestId('productCard')).toBeInTheDocument()
    })

    it('renders title', () => {
      setup()
      expect(
        screen.getByText(
          'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas Kraftfahrzeug-Haftpflichtversicherung 2+1'
        )
      ).toBeInTheDocument()
    })

    it('renders the availability', () => {
      const { container } = setup({ ...product, availability: 'AVAILABLE' })
      expect(container).toBeInTheDocument()
    })

    it('renders the product tile as a link', () => {
      setup()
      const links = screen.getAllByTestId('productTileLink')
      links.map(link => {
        expect(link).toHaveAttribute('href', product.url)
      })
    })

    it('renders the product labels', () => {
      setup()
      expect(screen.getByTestId('productLabel')).toBeInTheDocument()
    })

    it('renders the add to favourites button', () => {
      setup()
      expect(screen.getByTestId('saveToFavouritesButton')).toBeInTheDocument()
    })

    it('renders the remove to favourites button on Favourites page', () => {
      setup({
        isFavouritesPage: true
      })
      expect(
        screen.getByTestId('removeFromFavouritesButton')
      ).toBeInTheDocument()
    })

    it('does NOT render the add to favourites button on Favourites Page', () => {
      setup({ isFavouritesPage: true })
      expect(
        screen.queryByTestId('saveToFavoritesButton')
      ).not.toBeInTheDocument()
    })

    it('renders with only required data', () => {
      const { container } = setup({
        brand: undefined,
        sku: undefined,
        pzn: undefined,
        format: undefined,
        availability: undefined,
        thumbnailImage: undefined,
        unitVolume: undefined,
        pricePerUnit: undefined,
        rrp: undefined,
        labels: undefined
      })
      expect(container).toBeInTheDocument()
      expect(
        screen.queryByTestId('basketProductTileLabels')
      ).not.toBeInTheDocument()
    })
  })

  describe('add to basket controls', () => {
    it('renders the add to basket controls', () => {
      setup({ basketQuantity: 0 })
      expect(screen.getByTestId('addToBasketControls')).toBeInTheDocument()
      expect(screen.getByTestId('screenReaderAddToBasket')).toBeInTheDocument()
    })

    it('renders the add to basket button when item is not in the basket', () => {
      setup()
      expect(screen.getByTestId('addToBasketButton')).not.toHaveClass('hidden')
    })
  })

  describe('when user interacts with the tile', () => {
    it('calls addToBasket when add to basket button is clicked', () => {
      const addToBasket = jest.fn()
      const openBasketModal = jest.fn()
      setup({ addToBasket, openBasketModal })
      expect(addToBasket).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('addToBasketButton'))
      expect(addToBasket).toHaveBeenCalledTimes(1)
    })

    it('add to basket button is disabled when a product is out of stock', () => {
      const { container } = setup({
        availability: 'NOT_AVAILABLE' || undefined
      })
      expect(container).toBeInTheDocument()
      expect(screen.getByTestId('addToBasketButton')).toBeDisabled()
    })

    it('addToBasket is not called when a disabled add to basket button is clicked', () => {
      const addToBasket = jest.fn()
      const openBasketModal = jest.fn()
      const { container } = setup({
        addToBasket,
        openBasketModal,
        availability: 'NOT_AVAILABLE' || undefined
      })
      expect(container).toBeInTheDocument()
      expect(addToBasket).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('addToBasketButton'))
      expect(addToBasket).toHaveBeenCalledTimes(0)
    })

    it('does not trigger a product clicked event when add to basket button is clicked', () => {
      const { reset } = setupMatchMediaMock(true)

      const { store } = renderWithMockedStore(
        <ProductTile {...product} idx={1} />,
        { initialState: { client: {} } }
      )

      reset()

      userEvent.click(
        screen.getByRole('button', { name: 'product.add-to-basket' })
      )
      expect(store.getActions()).not.toContainEqual(
        triggerReportProductClicked(expect.any(Object))
      )
    })

    it('does not trigger a product clicked event when customer presses a key on add to basket button', async () => {
      const { reset } = setupMatchMediaMock(true)

      const { store } = renderWithMockedStore(
        <ProductTile {...product} idx={1} />,
        { initialState: { client: {} } }
      )
      reset()

      await userEvent.type(
        screen.getByRole('button', { name: 'product.add-to-basket' }),
        '{enter}{space} something'
      )
      expect(store.getActions()).not.toContainEqual(
        triggerReportProductClicked(expect.any(Object))
      )
    })
  })

  describe('Quantity selector actions', () => {
    it('renders quantity selector when item is in the basket', () => {
      setup({ basketQuantity: 1 })
      expect(screen.queryByTestId('addToBasketButton')).not.toBeInTheDocument()
      expect(screen.queryByTestId('quantitySelector')).toBeInTheDocument()
    })

    it('QuantitySelector is not showed when quantity is 0', () => {
      setup({ basketQuantity: 0 })
      expect(screen.queryByTestId('addToBasketButton')).toBeInTheDocument()
      expect(screen.queryByTestId('quantitySelector')).not.toBeInTheDocument()
    })

    it('Show RemoveButton when the basketQuantity is 0', () => {
      setup({ basketQuantity: 1 })
      expect(screen.getByTestId('removeProductButton')).not.toHaveClass(
        'hidden'
      )
    })

    it('IncreaseButton is disabled when the quantity is at max', () => {
      setup({ basketQuantity: 50 })
      const increaseButtons = screen.getAllByTestId('increaseQuantityButton')
      increaseButtons.forEach(button => {
        expect(button).toBeDisabled()
      })
      expect(screen.getByTestId('alert')).toBeInTheDocument()
    })

    it('BasketQuantity is not the max Quantity not render alert message', () => {
      setup({ basketQuantity: 1 })
      expect(screen.queryByTestId('alert')).not.toBeInTheDocument()
    })

    it('DecreaseButton is disabled when the quantity is at max', () => {
      setup({ basketQuantity: 1 })
      const decreaseButtons = screen.getAllByTestId('decreaseQuantityButton')
      decreaseButtons.forEach(button => {
        expect(button).toHaveClass('hidden')
      })
    })

    it('ChangeItemQuantityTrigger is called when increaseQuantityButton is called', async () => {
      const { reset } = setupMatchMediaMock(true)

      const { store } = renderWithMockedStoreAndFeatureFlags(
        <ProductTile {...product} idx={1} basketQuantity={4} />,
        {
          initialState: { client: {} },
          featureFlags: { [FeatureFlag.PRODUCT_QUANTITY_SELECTOR]: true }
        }
      )

      reset()
      userEvent.click(screen.getByTestId('increaseQuantityButton'))

      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          changeItemQuantityTrigger(expect.any(Object))
        )
      )
    })

    it('ChangeItemQuantityTrigger is called when decreaseQuantityButton is called', async () => {
      const { reset } = setupMatchMediaMock(true)

      const { store } = renderWithMockedStoreAndFeatureFlags(
        <ProductTile {...product} idx={1} basketQuantity={2} />,
        {
          initialState: { client: {} },
          featureFlags: { [FeatureFlag.PRODUCT_QUANTITY_SELECTOR]: true }
        }
      )

      reset()
      userEvent.click(screen.getByTestId('decreaseQuantityButton'))
      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          changeItemQuantityTrigger(expect.any(Object))
        )
      )
    })

    it('ChangeItemQuantityTrigger is called when changeQuantity value is changed', async () => {
      const { reset } = setupMatchMediaMock(true)

      const { store } = renderWithMockedStoreAndFeatureFlags(
        <ProductTile {...product} idx={1} basketQuantity={2} />,
        {
          initialState: { client: {} },
          featureFlags: { [FeatureFlag.PRODUCT_QUANTITY_SELECTOR]: true }
        }
      )

      reset()
      userEvent.type(screen.getByTestId('quantityInput'), '3')
      await waitFor(() =>
        expect(store.getActions()).toContainEqual(
          changeItemQuantityTrigger(expect.any(Object))
        )
      )
    })

    it('addToBasket is not called when a disabled add to basket button is clicked', () => {
      const addToBasket = jest.fn()
      const openBasketModal = jest.fn()
      const { container } = setup({
        addToBasket,
        openBasketModal,
        availability: 'NOT_AVAILABLE' || undefined
      })
      expect(container).toBeInTheDocument()
      expect(addToBasket).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('addToBasketButton'))
      expect(addToBasket).toHaveBeenCalledTimes(0)
    })
  })
})
