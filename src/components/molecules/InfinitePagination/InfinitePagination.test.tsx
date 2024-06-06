import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InfinitePagination, InfinitePaginationProps } from '.'

describe(InfinitePagination, () => {
  describe('when there are no more products to load', () => {
    const setup = (props: Partial<InfinitePaginationProps> = {}) =>
      render(<InfinitePagination current={5} total={5} {...props} />)

    it('renders the progress bar at 100%', () => {
      setup()
      expect(screen.getByTestId('progressBarValue')).toHaveStyle({
        width: '100%'
      })
    })

    it('renders the correct amount of current/total products', () => {
      setup()
      expect(
        screen.getByTestId('infinitePaginationProductCount')
      ).toBeInTheDocument()
    })

    it('does not render a load more button', () => {
      setup()
      expect(screen.queryByRole('loadMoreButton')).not.toBeInTheDocument()
    })
  })

  describe('when there are more products to load', () => {
    const setup = (props: Partial<InfinitePaginationProps> = {}) =>
      render(<InfinitePagination current={5} total={20} hasMore {...props} />)

    it('renders the progress bar at the correct %', () => {
      setup()
      expect(screen.getByTestId('progressBarValue')).toHaveStyle({
        width: '25%'
      })
    })

    it('renders the correct amount of current/total products', () => {
      setup()
      expect(
        screen.getByTestId('infinitePaginationProductCount')
      ).toBeInTheDocument()
    })

    it('renders a load more button', () => {
      setup()
      expect(screen.getByTestId('loadMoreButton')).toBeInTheDocument()
    })

    describe('when load more button is clicked', () => {
      it('calls loadMore', () => {
        const loadMore = jest.fn()
        setup({ loadMore })
        expect(loadMore).not.toHaveBeenCalled()
        userEvent.click(screen.getByTestId('loadMoreButton'))
        expect(loadMore).toHaveBeenCalledTimes(1)
      })
    })
  })
})
