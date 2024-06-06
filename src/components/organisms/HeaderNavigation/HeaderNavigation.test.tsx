import { render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { HeaderNavigation } from '.'
import {
  headerNavigationLeft,
  headerNavigationRight
} from '~domains/contentful/__mocks__/menu'
import { categories } from '~components/molecules/CategoryList/__mocks__/categories.mock'

describe(HeaderNavigation, () => {
  const setup = (isLargeFormat = true) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = render(
      <HeaderNavigation
        categories={categories}
        closeMenu={jest.fn()}
        onClickCloseIcon={jest.fn()}
        removeFromMenuStack={jest.fn()}
        headerNavigationLeft={headerNavigationLeft}
        headerNavigationRight={headerNavigationRight}
      />
    )
    reset()
    return renderedComponent
  }

  it('renders as an accessible element', () => {
    setup()
    expect(screen.getByTestId('headerNavigation')).toBeInTheDocument()
    expect(screen.getByTestId('headerNavigationLeft')).toBeInTheDocument()
    expect(screen.getByTestId('headerNavigationRight')).toBeInTheDocument()
  })
})
