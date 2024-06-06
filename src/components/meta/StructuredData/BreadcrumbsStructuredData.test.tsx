import { renderWithStore } from '~test-helpers'
import { BreadcrumbsStructuredData } from './BreadcrumbsStructuredData'

describe(BreadcrumbsStructuredData, () => {
  it('renders first level breadcrumb structured data script tag with json-ld data', () => {
    const { container } = renderWithStore(
      <BreadcrumbsStructuredData
        breadcrumbs={[
          {
            title: 'Rosto'
          }
        ]}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders second level breadcrumb structured data script tag with json-ld data', () => {
    const { container } = renderWithStore(
      <BreadcrumbsStructuredData
        breadcrumbs={[
          {
            title: 'Beleza',
            slug: 'beleza'
          },
          {
            title: 'Rosto'
          }
        ]}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders third level breadcrumb structured data script tag with json-ld data', () => {
    const { container } = renderWithStore(
      <BreadcrumbsStructuredData
        breadcrumbs={[
          {
            title: 'Beleza',
            slug: 'beleza'
          },
          {
            title: 'Rosto',
            slug: 'beleza/rosto'
          },
          {
            title: 'Acne'
          }
        ]}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
