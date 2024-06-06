import { render } from '@testing-library/react'
import { CanonicalLink } from './CanonicalLink'

describe(CanonicalLink, () => {
  it('renders a "canonical" link tag', () => {
    const { container } = render(<CanonicalLink href="/some-page" />)
    expect(container.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(
      container.querySelector('link[href="/some-page"]')
    ).toBeInTheDocument()
  })
})
