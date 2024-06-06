import { screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import * as content from '~domains/product/selectors/content'
import { product } from '~domains/product/__mocks__/product'
import { PDPGallery } from '../PDPGallery'

describe(PDPGallery, () => {
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

  const setup = () =>
    renderWithStore(<PDPGallery />, {
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

  it('renders the product labels', () => {
    jest.spyOn(content, 'selectShowLabels').mockReturnValue(true)
    setup()
    expect(screen.getByTestId('productLabels')).toBeInTheDocument()
  })

  it('renders the favourites button', () => {
    setup()
    expect(screen.getByTestId('saveToFavouritesButton')).toBeInTheDocument()
  })
})
