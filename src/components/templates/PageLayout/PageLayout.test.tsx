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
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { PageLayout } from './PageLayout'
import {
  headerNavigationLeft,
  headerNavigationRight
} from '~domains/contentful/__mocks__/menu'
import { FeatureFlag } from '~config/constants/feature-flags'

describe(PageLayout, () => {
  beforeEach(() => {
    const { reset } = setupMatchMediaMock()
    renderWithStoreAndFeatureFlags(
      <PageLayout>
        <main>Some page content</main>
      </PageLayout>,
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
                  copyright,
                  socialMediaLinks
                },
                headerNavigationLeft,
                headerNavigationRight
              }
            }
          },
          client: {
            account: {
              customer: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                showNotification: true
              }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.FOOTER_TRUSTED_SHOPS]: true
        }
      }
    )
    reset()
  })

  it('renders the page content', () => {
    expect(screen.getByRole('main')).toHaveTextContent('Some page content')
  })

  it('renders the header', () => {
    expect(screen.getByTestId('page-layout-header')).toBeInTheDocument()
  })
  it('renders the footer', () => {
    expect(screen.getByTestId('page-layout-footer')).toBeInTheDocument()
  })
})
