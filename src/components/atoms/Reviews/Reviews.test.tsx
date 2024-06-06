import { render, screen } from '@testing-library/react'
import { Reviews } from '.'

describe(Reviews, () => {
  describe('Renders the correct stars according to the rating', () => {
    it('rating - 0', () => {
      render(<Reviews numberOfReviews={10} rating={0} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-0')
    })
    it('rating - 0.5', () => {
      render(<Reviews numberOfReviews={10} rating={0.5} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-0-5')
    })
    it('rating - 1', () => {
      render(<Reviews numberOfReviews={10} rating={1} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-1')
    })
    it('rating - 1.5', () => {
      render(<Reviews numberOfReviews={10} rating={1.5} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-1-5')
    })
    it('rating - 2', () => {
      render(<Reviews numberOfReviews={10} rating={2} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-2')
    })
    it('rating - 2.5', () => {
      render(<Reviews numberOfReviews={10} rating={2.5} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-2-5')
    })
    it('rating - 3', () => {
      render(<Reviews numberOfReviews={10} rating={3} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-3')
    })
    it('rating - 3.5', () => {
      render(<Reviews numberOfReviews={10} rating={3.5} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-3-5')
    })
    it('rating - 4', () => {
      render(<Reviews numberOfReviews={10} rating={4} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-4')
    })
    it('rating - 4.5', () => {
      render(<Reviews numberOfReviews={10} rating={4.5} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-4-5')
    })
    it('rating - 5', () => {
      render(<Reviews numberOfReviews={10} rating={5} />)
      expect(screen.getByTestId('stars')).toHaveClass('icon-stars-5')
    })
  })

  describe('Renders the correct number according numberOfReviews of reviews', () => {
    it('renders the right number of reviews', () => {
      render(<Reviews numberOfReviews={10} rating={3.5} />)
      expect(screen.getByText('(10)')).toBeInTheDocument()
    })
  })
})
