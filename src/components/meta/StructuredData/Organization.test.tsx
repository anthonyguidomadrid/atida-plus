import { renderWithStore } from '~test-helpers'
import { Organization } from './Organization'

describe(Organization, () => {
  it('renders script tag with json-ld data', () => {
    const { container } = renderWithStore(<Organization />, {
      initialState: {
        server: {
          page: {
            common: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              organization: {
                name: 'Atida',
                description: 'Farmácia Online de Confiança',
                telephone: '+34 967115501',
                email: 'https://support.atida.com/pt-PT/support/home',
                sameAs: [
                  'https://twitter.com/atida_pt,',
                  'https://www.facebook.com/AtidaPT/',
                  'https://www.instagram.com/atida_pt/'
                ],
                imageUrl:
                  'https://www.atida.com/pt-pt/blog/wp-content/uploads/2021/08/atida-mifarma-logo.png',
                id: 'atida-pt',
                address: {
                  streetAddress: '10 Downing Street',
                  addressLocality: 'London',
                  addressRegion: 'London',
                  postalCode: 'SW1A 2AA',
                  addressCountry: 'UK'
                }
              }
            }
          }
        }
      }
    })
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders nothing when organization data is not found', () => {
    const { container } = renderWithStore(<Organization />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
