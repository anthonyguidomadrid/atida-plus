import { render } from '@testing-library/react'
import { AlternateLinks } from './AlternateLinks'

describe(AlternateLinks, () => {
  const links = [
    { hrefLang: 'en', href: '/some-page-in-english' },
    { hrefLang: 'de', href: '/some-page-in-german' }
  ]

  it('renders an "alternate" link tag for each link', () => {
    const { container } = render(<AlternateLinks links={links} />)
    expect(container.querySelectorAll('link[rel="alternate"]')).toHaveLength(2)
    expect(
      container.querySelector(
        'link[href="somehost.com/some-page-in-english"][hreflang="en"]'
      )
    ).toBeInTheDocument()
    expect(
      container.querySelector(
        'link[href="somehost.com/some-page-in-german"][hreflang="de"]'
      )
    ).toBeInTheDocument()
  })
})
