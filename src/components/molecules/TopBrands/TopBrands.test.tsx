import { render, screen } from '@testing-library/react'
import { TopBrands, TopBrandsProps } from '.'
import { brandTiles } from './TopBrands.mock'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe('TopBrands', () => {
  const setup = (
    props: Partial<TopBrandsProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = render(<TopBrands {...brandTiles} {...props} />)
    reset()
    return renderedComponent
  }

  describe('top brands component', () => {
    it('renders top brands component', () => {
      setup()
      expect(screen.getByTestId('topBrands')).toBeInTheDocument()
    })

    it('renders brand tiles', () => {
      setup()
      expect(screen.getByAltText('Estée Lauder')).toBeInTheDocument()
    })

    it("doesn't error if brand tiles are not passed", () => {
      const { container } = setup({
        ...brandTiles,
        items: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it('renders title', () => {
      setup()
      expect(screen.getByText('Our top brands')).toBeInTheDocument()
    })

    it("doesn't error if no title is passed", () => {
      const { container } = setup({
        ...brandTiles,
        title: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if no block data is passed", () => {
      const { container } = setup({
        ...brandTiles,
        items: [
          ...brandTiles.items,
          {
            title: undefined,
            image: { title: undefined, url: undefined },
            url: undefined
          }
        ]
      })
      expect(container).toBeInTheDocument()
    })
  })
})
