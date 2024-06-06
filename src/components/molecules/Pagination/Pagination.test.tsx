import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { Pagination, PaginationProps } from './index'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'

describe(Pagination, () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    route: '/account/order-history?page=1',
    query: { page: '1' },
    locale: 'es-es'
  }))
  const defaultProps = {
    pages: 10,
    maxShownPages: 3
  }

  const setup = (
    props: Partial<PaginationProps> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const pagination = render(<Pagination {...defaultProps} {...props} />)

    reset()
    return pagination
  }

  it('renders the arrows when there is more than on page', () => {
    setup()
    expect(screen.getByTestId('paginationLeftArrow')).toBeInTheDocument()
    expect(screen.getByTestId('paginationRightArrow')).toBeInTheDocument()
  })

  it('render dissabled arrows when there is only one page', () => {
    setup({ pages: 1 })
    expect(screen.queryByTestId('paginationLeftArrow')).toBeInTheDocument()
    expect(screen.queryByTestId('paginationRightArrow')).toBeInTheDocument()
    expect(screen.getByTestId('paginationLeftArrow')).toHaveClass(
      'bg-primary-oxford-blue-20 pointer-events-none'
    )
    expect(screen.queryByTestId('paginationRightArrow')).toHaveClass(
      'bg-primary-oxford-blue-20 pointer-events-none'
    )
  })

  it('does not render the pages on mobile', () => {
    setup({}, false)
    expect(screen.queryByTestId('paginationPage-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('paginationMobile')).toBeInTheDocument()
  })

  it('disbales the left arrow button when on first page', () => {
    setup()
    expect(screen.getByTestId('paginationLeftArrow')).toHaveClass(
      'pointer-events-none'
    )
  })

  it('disbales the right arrow button when on last page', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      route: '/account/order-history?page=5100',
      query: { page: '10' },
      locale: 'es-es'
    }))
    setup()
    expect(screen.getByTestId('paginationRightArrow')).toHaveClass(
      'pointer-events-none'
    )
  })

  describe('On each page it renders the correct pages ', () => {
    it('First page', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=1',
        query: { page: '1' },
        locale: 'es-es'
      }))
      setup()
      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-2')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-3')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })
    it('Second page', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=2',
        query: { page: '2' },
        locale: 'es-es'
      }))
      setup()
      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-2')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-3')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })

    it('Third page', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=3',
        query: { page: '3' },
        locale: 'es-es'
      }))
      setup()
      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-2')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-3')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-4')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })

    it('Forth page', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=4',
        query: { page: '4' },
        locale: 'es-es'
      }))
      setup()
      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-3')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-4')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-5')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })

    it('Last page', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=10',
        query: { page: '10' },
        locale: 'es-es'
      }))
      setup()

      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-8')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-9')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })

    it('Penultimate page', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=9',
        query: { page: '9' },
        locale: 'es-es'
      }))
      setup()

      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-8')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-9')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })

    it('Antepenultimate page', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=8',
        query: { page: '8' },
        locale: 'es-es'
      }))
      setup()

      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-8')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-9')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })

    it('Renders the correct amount of pages according to the maxShownPages prop', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        route: '/account/order-history?page=5',
        query: { page: '5' },
        locale: 'es-es'
      }))
      setup({ maxShownPages: 5 })

      expect(screen.getByTestId('paginationPage-1')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-3')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-4')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-5')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-6')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-7')).toBeInTheDocument()
      expect(screen.getByTestId('paginationPage-10')).toBeInTheDocument()
    })
  })
})
