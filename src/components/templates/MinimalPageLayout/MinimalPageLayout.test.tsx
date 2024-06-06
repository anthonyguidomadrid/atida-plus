import { screen } from '@testing-library/react'
import {
  importantLinks,
  serviceContactLinks,
  providerBlocks,
  newsletterBlockTitle,
  newsletterSellingPoints,
  termsConditionsLinks,
  copyright,
  socialMediaLinks
} from '~components/organisms/Footer/Footer.mock'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { renderWithStore } from '~test-helpers'
import { MinimalPageLayout } from './MinimalPageLayout'
import {
  headerNavigationLeft,
  headerNavigationRight
} from '~domains/contentful/__mocks__/menu'

describe(MinimalPageLayout, () => {
  beforeEach(() => {
    const { reset } = setupMatchMediaMock()
    renderWithStore(
      <MinimalPageLayout>
        <main>Some minimal page content</main>
      </MinimalPageLayout>,
      {
        initialState: {
          server: {
            page: {
              common: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                footer: {
                  importantLinks,
                  serviceContactLinks,
                  providerBlocks,
                  newsletterBlockTitle,
                  newsletterSellingPoints,
                  termsConditionsLinks,
                  socialMediaLinks,
                  copyright
                },
                headerNavigationLeft,
                headerNavigationRight
              }
            }
          }
        }
      }
    )
    reset()
  })

  it('renders the header', () => {
    expect(screen.getByTestId('MinimalHeader')).toBeInTheDocument()
  })

  it('renders the page content', () => {
    expect(screen.getByRole('main')).toHaveTextContent(
      'Some minimal page content'
    )
  })

  it('renders the footer', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByTestId('MinimalFooter')).toBeInTheDocument()
  })
})
