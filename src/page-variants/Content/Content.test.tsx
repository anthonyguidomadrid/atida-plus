import { screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { contentfulPageContentNormalized } from '~domains/page/__mocks__/contentfulPageContent'
import { renderWithStore, renderWithStoreAndFeatureFlags } from '~test-helpers'
import { Content } from './Content'

describe(Content, () => {
  it('renders page content', () => {
    const { reset } = setupMatchMediaMock()
    renderWithStore(<Content />, {
      initialState: {
        server: {
          page: {
            'page-content': {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              content: contentfulPageContentNormalized
            }
          }
        }
      }
    })

    expect(screen.getAllByTestId('heroBanner')).toHaveLength(2)
    expect(screen.getByTestId('categoryTiles')).toBeInTheDocument()
    expect(screen.getByTestId('contentWithImage')).toBeInTheDocument()
    reset()
  })

  describe('alternate links', () => {
    it('homepage with empty slug: renders all enabled locale alternate links except for current locale', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        locale: 'pt-pt'
      }))
      const { reset } = setupMatchMediaMock()
      const { container } = renderWithStoreAndFeatureFlags(<Content />, {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: {
                  ...contentfulPageContentNormalized,
                  allSlugs: {
                    'pt-pt': '',
                    'es-es': '',
                    'de-de': ''
                  }
                }
              }
            }
          }
        },
        featureFlags: {}
      })

      const $alternateLinks = container.querySelectorAll(
        'link[rel="alternate"]'
      )

      expect($alternateLinks).toHaveLength(3)
      expect($alternateLinks[0]).toHaveAttribute('hreflang', 'pt-pt')
      expect($alternateLinks[0]).toHaveAttribute('href', 'somehost.com/pt-pt')
      expect($alternateLinks[1]).toHaveAttribute('hreflang', 'es-es')
      expect($alternateLinks[1]).toHaveAttribute('href', 'somehost.com/es-es')
      expect($alternateLinks[2]).toHaveAttribute('hreflang', 'de-de')
      expect($alternateLinks[2]).toHaveAttribute('href', 'somehost.com/de-de')

      reset()
    })

    it('homepage with slash slug: renders all enabled locale alternate links except for current locale', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        locale: 'pt-pt'
      }))
      const { reset } = setupMatchMediaMock()
      const { container } = renderWithStoreAndFeatureFlags(<Content />, {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: {
                  ...contentfulPageContentNormalized,
                  allSlugs: {
                    'pt-pt': '/',
                    'es-es': '/',
                    'de-de': '/'
                  }
                }
              }
            }
          }
        },
        featureFlags: {}
      })

      const $alternateLinks = container.querySelectorAll(
        'link[rel="alternate"]'
      )

      expect($alternateLinks).toHaveLength(3)
      expect($alternateLinks[0]).toHaveAttribute('hreflang', 'pt-pt')
      expect($alternateLinks[0]).toHaveAttribute('href', 'somehost.com/pt-pt')
      expect($alternateLinks[1]).toHaveAttribute('hreflang', 'es-es')
      expect($alternateLinks[1]).toHaveAttribute('href', 'somehost.com/es-es')
      expect($alternateLinks[2]).toHaveAttribute('hreflang', 'de-de')
      expect($alternateLinks[2]).toHaveAttribute('href', 'somehost.com/de-de')

      reset()
    })

    it('page with normal slug: renders all enabled locale alternate links except for current locale', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        locale: 'pt-pt'
      }))
      const { reset } = setupMatchMediaMock()
      const { container } = renderWithStoreAndFeatureFlags(<Content />, {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: {
                  ...contentfulPageContentNormalized,
                  allSlugs: {
                    'pt-pt': 'some-page-in-portuguese',
                    'es-es': 'some-page-in-spanish',
                    'de-de': 'some-page-in-german'
                  }
                }
              }
            }
          }
        },
        featureFlags: {}
      })

      const $alternateLinks = container.querySelectorAll(
        'link[rel="alternate"]'
      )

      expect($alternateLinks).toHaveLength(3)
      expect($alternateLinks[0]).toHaveAttribute('hreflang', 'pt-pt')
      expect($alternateLinks[0]).toHaveAttribute(
        'href',
        'somehost.com/pt-pt/some-page-in-portuguese'
      )
      expect($alternateLinks[1]).toHaveAttribute('hreflang', 'es-es')
      expect($alternateLinks[1]).toHaveAttribute(
        'href',
        'somehost.com/es-es/some-page-in-spanish'
      )
      expect($alternateLinks[2]).toHaveAttribute('hreflang', 'de-de')
      expect($alternateLinks[2]).toHaveAttribute(
        'href',
        'somehost.com/de-de/some-page-in-german'
      )

      reset()
    })
  })
})
