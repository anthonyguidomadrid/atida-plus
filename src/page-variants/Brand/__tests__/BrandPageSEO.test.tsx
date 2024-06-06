import { render } from '@testing-library/react'
import { BrandPageSEO } from '../BrandPageSEO'

describe(BrandPageSEO, () => {
  it('renders script tag with json-ld data', () => {
    const { container } = render(
      <BrandPageSEO
        name="Some brand"
        description="A description of the brand"
        url="brand/some-brand"
        image="some-brand-logo.png"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
