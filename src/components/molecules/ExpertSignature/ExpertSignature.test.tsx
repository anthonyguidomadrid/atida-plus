import { screen } from '@testing-library/react'
import { FeatureFlag } from '~config/constants/feature-flags'
import { expertSignature as expertSignatureMock } from '~domains/expert-signature/__mocks__/expert-signature'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { ExpertSignature } from '.'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe('ExpertSignature', () => {
  const setup = () => {
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <ExpertSignature />,
      {
        initialState: {
          server: {
            product: {
              content: {
                data: {
                  categories: {
                    lvl0: ['beauty', 'beauty']
                  }
                }
              }
            } as any,
            expertSignature: {
              content: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                ...expertSignatureMock
              }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.PDP_ENABLE_EXPERT_SIGNATURE]: true
        }
      }
    )
    return renderedComponent
  }

  describe('expertSignature component', () => {
    it('renders expertSignature Component', () => {
      setup()
      expect(screen.getByTestId('expertSignature')).toBeInTheDocument()
    })
    it('renders the component', () => {
      setup()
      expect(screen.getByTestId('expertSignature')).toBeInTheDocument()
    })
    it('renders the expert name', () => {
      setup()
      expect(screen.getByText('some name')).toBeInTheDocument()
    })
    it('renders the job title', () => {
      setup()
      expect(screen.getByText('some job title')).toBeInTheDocument()
    })
    it('renders the job description', () => {
      setup()
      expect(screen.getByText('some job description')).toBeInTheDocument()
    })
    it('renders the image', () => {
      setup()
      expect(screen.getByAltText('some image title')).toBeInTheDocument()
    })
    it('renders the icon', () => {
      setup()
      expect(screen.getByTestId('expertSignatureIcon')).toBeInTheDocument()
    })
  })
})
