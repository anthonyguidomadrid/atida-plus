import { render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { CategoryGrid, CategoryGridProps } from '.'
import { categoryTiles } from './CategoryGrid.mock'

describe('CategoryGrid', () => {
  const setup = (
    props: Partial<CategoryGridProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = render(
      <CategoryGrid {...(categoryTiles as CategoryGridProps)} {...props} />
    )
    reset()
    return renderedComponent
  }

  describe('category grid component', () => {
    it('renders category grid component', () => {
      setup()
      expect(screen.getByTestId('categoryTiles')).toBeInTheDocument()
    })

    it('renders tiles', () => {
      setup()
      expect(screen.getByText('Cosmetics & Beauty')).toBeInTheDocument()
    })

    it('renders promotion tile as the last', () => {
      setup()
      expect(screen.getByText('%')).toBeInTheDocument()
      expect(
        screen.getByTestId('categoryGrid').lastChild?.textContent
      ).toContain('%')
    })

    it("doesn't error if tiles are not passed", () => {
      const { container } = setup({
        ...(categoryTiles as CategoryGridProps),
        items: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it('renders title', () => {
      setup()
      expect(screen.getByText('Shop by category')).toBeInTheDocument()
    })

    it("doesn't error if no title is passed", () => {
      const { container } = setup({
        ...(categoryTiles as CategoryGridProps),
        title: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if no block data is passed", () => {
      const { container } = setup({
        ...(categoryTiles as CategoryGridProps),
        items: [
          ...categoryTiles.items,
          {
            title: undefined,
            color: undefined,
            image: undefined,
            url: undefined
          }
        ]
      })
      expect(container).toBeInTheDocument()
    })

    it('renders the images with correct src and alt', () => {
      setup()
      expect(screen.queryAllByRole('img')[0]).toBeInTheDocument()
      expect(screen.queryAllByRole('img')[0]).toHaveAttribute(
        'src',
        'https://source.unsplash.com/random/25x91?sig=0'
      )
      expect(screen.queryAllByRole('img')[0]).toHaveAttribute(
        'alt',
        'Random Image 1'
      )
    })
  })
})
