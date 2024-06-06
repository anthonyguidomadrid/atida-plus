import { screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { SearchBar } from '.'

describe('SearchBar', () => {
  const setup = (isLargeFormat = false) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    renderWithStore(<SearchBar />)
    reset()
  }
  it('renders Search Bar component with a search icon and an input field', () => {
    setup()
    expect(
      screen.getByTestId('searchBarWrapper').querySelector('svg')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('searchBarWrapper').querySelector('input')
    ).toBeInTheDocument()
  })
})
