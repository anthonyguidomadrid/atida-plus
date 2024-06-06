import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FavouriteButton, FavouriteButtonProps } from '../FavouriteButton'
import { GetFavouritesResponse } from '~domains/favourites/types'
import {
  product,
  getItemsFound,
  getItemsNotFound,
  itemLoading,
  itemSuccess,
  otherItemsBeingRemoved
} from './FavouriteButton.mock'

type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  items?: {
    sku: string
    isLoading: boolean
    isSaved: boolean
    wasSuccess: boolean
    wasError: boolean
  }[]
}

describe(FavouriteButton, () => {
  const setup = (
    props: Partial<FavouriteButtonProps> = {},
    ff = true,
    getItems: GetFavouritesResponse,
    addItems: DataState = {
      isLoading: false,
      wasSuccess: false,
      wasError: false,
      items: []
    },
    removeItems: DataState = {
      isLoading: false,
      wasSuccess: false,
      wasError: false,
      items: []
    }
  ) => {
    renderWithStoreAndFeatureFlags(
      <FavouriteButton
        data-testid="saveToFavouritesButton"
        product={product}
        {...props}
      />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_FAVOURITES_ALL_PAGES]: ff
        },
        initialState: {
          client: {
            account: {
              customer: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                showNotification: false,
                reference: 'Test-reference'
              }
            },
            favourites: {
              get: {
                isLoading: false,
                isProductsLoading: false,
                wasSuccess: true,
                wasError: false,
                wasProductsSuccess: false,
                wasProductsError: false,
                forceRefresh: false,
                favouritesList: getItems
              },
              add: addItems,
              remove: removeItems
            }
          }
        }
      }
    )
  }

  it('The favourite button is NOT shown when the FF is OFF', () => {
    setup({}, false, getItemsNotFound)
    expect(screen.queryByTestId('saveToFavouritesButton')).toBeNull()
  })

  it('The favourite button is shown when the FF is ON', () => {
    setup({}, true, getItemsNotFound)
    expect(screen.getByTestId('saveToFavouritesButton')).toBeInTheDocument()
  })
  it('calls addToFavourites when save to favourites button is clicked', () => {
    const addToFavourites = jest.fn()
    setup({ addToFavourites }, true, getItemsNotFound)
    expect(addToFavourites).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('saveToFavouritesButton'))
    expect(addToFavourites).toHaveBeenCalledTimes(1)
  })
  it('calls removeFromFavourites when save to favourites button is clicked', () => {
    const removeFromFavourites = jest.fn()
    setup({ removeFromFavourites }, true, getItemsFound)
    expect(removeFromFavourites).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('saveToFavouritesButton'))
    expect(removeFromFavourites).toHaveBeenCalledTimes(1)
  })
  it('shows the loading icon when adding a product', () => {
    setup({}, true, getItemsNotFound, itemLoading)
    expect(screen.queryByTestId('saveToFavouritesButton')).toHaveClass(
      'favourite-icon--loading'
    )
  })
  it('shows the active icon when product added', () => {
    setup({}, true, getItemsFound, itemSuccess)
    expect(screen.queryByTestId('saveToFavouritesButton')).toHaveClass(
      'favourite-icon--active'
    )
  })
  it('shows the loading icon when removing a product', () => {
    setup({}, true, getItemsNotFound, undefined, itemLoading)
    expect(screen.queryByTestId('saveToFavouritesButton')).toHaveClass(
      'favourite-icon--loading'
    )
  })
  it('shows the default icon when product removed', () => {
    setup({}, true, getItemsNotFound, undefined, itemSuccess)
    expect(screen.queryByTestId('saveToFavouritesButton')).not.toHaveClass(
      'favourite-icon--active'
    )
  })
  it('hides the icon when other product is being removed from the list', () => {
    setup(
      { isFavouritesPage: true },
      true,
      getItemsFound,
      undefined,
      otherItemsBeingRemoved
    )
    expect(
      screen.queryByTestId('saveToFavouritesButton')
    ).not.toBeInTheDocument()
  })
})
