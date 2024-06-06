import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SeoContentExpandable, SeoContentExpandableProps } from './index'

describe(SeoContentExpandable, () => {
  const defaultProps = {
    children: (
      <>
        <p>I'm a paragraph.</p>
        <p>
          We can't compete with my Mom. Her company is big and famous. Checking
          all the water in this area: there's an escaped fish. Saving the world
          with meals on wheels. The way I see it, every life is a pile of good
          things and bad things. The good things don't always soften the bad
          things; but vice-versa the bad things don't necessarily spoil the good
          things and make them unimportant. I am the first of my species, and I
          know how that weighs on the heart so don't lie to me. Did I mention we
          have comfy chairs?
        </p>
      </>
    )
  }

  const setup = (props: Partial<SeoContentExpandableProps> = {}) =>
    render(<SeoContentExpandable {...defaultProps} {...props} />)

  it('renders seo content', () => {
    setup()
    expect(screen.getByText("I'm a paragraph.")).toBeInTheDocument()
  })

  it('does not crash when children are not passed', () => {
    const { container } = setup({ children: undefined })
    expect(container).toBeInTheDocument()
  })

  it('expands the content when the button is clicked', () => {
    setup()
    expect(
      screen.getByRole('button', { name: 'seo.read-more' })
    ).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: 'seo.read-more' }))
    expect(
      screen.getByRole('button', { name: 'seo.show-less' })
    ).toBeInTheDocument()
  })
})
