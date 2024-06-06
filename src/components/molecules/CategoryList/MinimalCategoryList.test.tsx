import { getAllByRole, render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import {
  MinimalCategoryList,
  MinimalCategoryListProps
} from './MinimalCategoryList'
import { categories } from './__mocks__/categories.mock'

describe('MinimalCategoryList', () => {
  const setup = (props: Partial<MinimalCategoryListProps> = {}) => {
    const { reset } = setupMatchMediaMock(false)
    const viewCategories = render(
      <MinimalCategoryList categories={categories} {...props} />
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
            title: 'Vitamines & supplements'
          }
        ]
      })
      expect(container).toBeInTheDocument()
    })
  })
})
