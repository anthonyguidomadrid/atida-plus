import { render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { categoryTiles } from '../CategoryGrid/CategoryGrid.mock'
import { CategoryGridProps } from '../CategoryGrid'
import { CategorySlider } from '.'

describe('CategorySlider', () => {
  const setup = (
    props: Partial<CategoryGridProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = render(
      <CategorySlider
        {...{ ...(categoryTiles as CategoryGridProps), viewType: 'Slider' }}
        {...props}
      />
    )
    reset()
    return renderedComponent
  }

  describe('category slider component', () => {
    it('renders category slider component', () => {
      setup()
      expect(screen.getByTestId('categorySlider')).toBeInTheDocument()
    })

    it('renders tiles', () => {
      setup()
      expect(screen.getByText('Cosmetics & Beauty')).toBeInTheDocument()
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

    it('renders arrow buttons', () => {
      setup()
      expect(
        screen.getByTestId('slider-navigation-left-arrow')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('slider-navigation-right-arrow')
      ).toBeInTheDocument()
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
