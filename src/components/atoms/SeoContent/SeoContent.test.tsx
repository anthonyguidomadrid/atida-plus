import { render, screen } from '@testing-library/react'
import { SeoContent, SeoContentProps } from './index'

describe(SeoContent, () => {
  const defaultProps = {
    header: "I'm a header",
    children: (
      <>
        <p>I'm a paragraph.</p>
      </>
    )
  }

  const setup = (props: Partial<SeoContentProps> = {}) =>
    render(<SeoContent {...defaultProps} {...props} />)

  it('renders seo content header', () => {
    setup()
    expect(
      screen.getByRole('heading', {
        name: "I'm a header"
      })
    ).toBeInTheDocument()
  })

  it('renders seo content', () => {
    setup()
    expect(screen.getByText("I'm a paragraph.")).toBeInTheDocument()
  })

  it('does not crash when header is not passed', () => {
    const { container } = setup({ header: undefined })
    expect(container).toBeInTheDocument()
  })

  it('does not crash when children are not passed', () => {
    const { container } = setup({ children: undefined })
    expect(container).toBeInTheDocument()
  })
})
