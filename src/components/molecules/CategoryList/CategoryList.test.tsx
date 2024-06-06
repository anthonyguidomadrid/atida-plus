import { getAllByRole, render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { CategoryList, CategoryListProps } from '.'
import { categories } from './__mocks__/categories.mock'

describe('CategoryList', () => {
  const setup = (props: Partial<CategoryListProps> = {}) => {
    const { reset } = setupMatchMediaMock(false)
    const viewCategories = render(
      <CategoryList
        categories={categories}
        addToMenuStack={jest.fn()}
        removeFromMenuStack={jest.fn()}
        {...props}
      />
    )

    reset()

    return viewCategories
  }

  describe('category list component', () => {
    it('renders category list root component', () => {
      setup()
      expect(screen.getByTestId('categoryList_root')).toBeInTheDocument()
    })

    it('renders category list items', () => {
      setup()
      expect(screen.getByText('Medicine')).toBeInTheDocument()
    })

    it('renders all categories and subcategories', () => {
      setup()
      const listItems = getAllByRole(
        screen.getByTestId('categoryList_root'),
        'listitem'
      )
      expect(listItems).toHaveLength(51)
    })

    it("doesn't error if categories are not passed", () => {
      const { container } = setup({
        categories: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if no subcategories are passed", () => {
      const { container } = setup({
        categories: [
          {
            id: 'vitamins-and-supplements',
            title: 'Vitamines & supplements',
            color: 'category-vitamins-and-supplements',
            level: 0,
            url: '/vitamins-supplements',
            image: {
              title: '',
              description: '',
              type: '',
              url:
                'https://images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
            }
          }
        ]
      })
      expect(container).toBeInTheDocument()
    })
  })
})
