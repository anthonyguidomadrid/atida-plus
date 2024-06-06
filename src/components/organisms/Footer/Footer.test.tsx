import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  importantLinks,
  serviceContactLinks,
  providerBlocks,
  countries,
  languages,
  termsConditionsLinks,
  copyright,
  newsletterBlockTitle,
  newsletterSellingPoints,
  socialMediaLinks
} from './Footer.mock'
import { Footer } from '.'
import { FooterProps } from './Footer'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { testInitialState } from '~components/organisms/ExponeaRecommendationBlock/ExponeaRecommendationBlock.mock'

describe('Footer', () => {
  const setup = (
    props: Partial<FooterProps> = {},
    isLargeFormat = true,
    isFooterCountrySelectorFeatureEnabled = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <Footer
        importantLinks={importantLinks}
        serviceContactLinks={serviceContactLinks}
        providerBlocks={providerBlocks}
        newsletterBlockTitle={newsletterBlockTitle}
        newsletterSellingPoints={newsletterSellingPoints}
        countries={countries}
        languages={languages}
        termsConditionsLinks={termsConditionsLinks}
        copyright={copyright}
        socialMediaLinks={socialMediaLinks}
        hasAdditionalBottomPadding={false}
        {...props}
      />,
      {
        initialState: testInitialState,
        featureFlags: {
          [FeatureFlag.FOOTER_COUNTRY_SELECTOR]: isFooterCountrySelectorFeatureEnabled
        }
      }
    )
    reset()
    return renderedComponent
  }

  it('renders as an accessible element', () => {
    setup()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  // links
  describe('important links', () => {
    it("doesn't error if no important links are passed", () => {
      const { container } = setup({ importantLinks: undefined })
      expect(container).toBeInTheDocument()
    })

    it('renders all important links', () => {
      setup()
      importantLinks.items?.forEach(({ link: { url, label } = {} }) => {
        expect(screen.getByText(label as string)).toHaveAttribute('href', url)
      })
    })
  })

  // service & contact
  describe('service & contact information', () => {
    it('the title is in an accordion panel for small width devices', () => {
      const { getByText } = setup({}, false)
      expect(
        getByText('Service & contact').closest('summary')
      ).toBeInTheDocument()
    })

    it('the title is not in an accordion panel for large width devices', () => {
      const { getByText } = setup({}, true)
      expect(
        getByText('Service & contact').closest('summary')
      ).not.toBeInTheDocument()
    })

    it('displays contact information content when title is clicked', () => {
      const { getByText } = setup({}, false)
      expect(screen.getByTestId('contactInformationContent')).not.toBeVisible()
      userEvent.click(getByText('Service & contact'))
      expect(screen.getByTestId('contactInformationContent')).toBeVisible()
    })

    it("doesn't error if no contact information is passed", () => {
      const { container } = setup({ serviceContactLinks: undefined })
      expect(container).toBeInTheDocument()
    })

    describe('contact information blocks', () => {
      it("doesn't error if no title or block data are passed in", () => {
        const { container } = setup({
          serviceContactLinks: {
            ...serviceContactLinks,
            title: undefined,
            items: undefined
          }
        })
        expect(container).toBeInTheDocument()
      })

      it("doesn't error if no title or block data are passed in", () => {
        const { container } = setup({
          serviceContactLinks: {
            ...serviceContactLinks,
            items: [
              // @ts-expect-error
              ...serviceContactLinks.items,
              {
                id: undefined,
                link: {
                  label: undefined,
                  url: undefined,
                  content: undefined,
                  icon: undefined
                }
              }
            ]
          }
        })
        expect(container).toBeInTheDocument()
      })

      it('renders all contact information block links with icons', () => {
        setup()
        serviceContactLinks.items?.forEach(({ link: { url, label } = {} }) => {
          expect(screen.getByText(label as string)).toHaveAttribute('href', url)
          expect(
            screen
              .getByText(label as string)
              .querySelector('[data-testid="dynamic component"]')
          ).toBeInTheDocument()
        })
      })
    })
  })

  // locale switchers
  describe('locale switchers component', () => {
    it('renders locale switchers component', () => {
      setup()
      expect(screen.getByTestId('localeSwitchersBlock')).toBeInTheDocument()
    })

    it("doesn't error if countries are not passed", () => {
      const { container } = setup({
        countries: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if isFooterCountrySelectorFeatureEnabled is false (countries won't be passed)", () => {
      const { container } = setup(
        {},
        undefined,
        false // isFooterCountrySelectorFeatureEnabled
      )
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if languages are not passed", () => {
      const { container } = setup({
        languages: undefined
      })
      expect(container).toBeInTheDocument()
    })
  })

  // terms and conditions links
  describe('terms and conditions links', () => {
    it("doesn't error if no terms and conditions are passed", () => {
      const { container } = setup({ termsConditionsLinks: undefined })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if no terms and conditions links are passed", () => {
      const { container } = setup({
        termsConditionsLinks: {
          ...termsConditionsLinks,
          items: undefined
        }
      })
      expect(container).toBeInTheDocument()
    })

    it('renders all terms and conditions links', () => {
      setup()
      termsConditionsLinks.items?.forEach(({ link: { url, label } = {} }) => {
        expect(screen.getByText(label as string)).toHaveAttribute('href', url)
      })
    })
  })

  // copyright
  describe('copyright', () => {
    it("doesn't error if copyright is not passed", () => {
      const { container } = setup({
        copyright: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it('renders copyright text', () => {
      setup()
      expect(screen.getByText('© Atida').tagName).toBe('A')
      expect(screen.getByText('© Atida')).toHaveAttribute(
        'href',
        'https://atida.com/'
      )
    })
  })

  // providers
  describe('block text with icons of our partners', () => {
    it("doesn't error if no block data is passed", () => {
      const { container } = setup({ providerBlocks: undefined })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if no title, description, text or icons are passed in", () => {
      const { container } = setup({
        providerBlocks: [
          ...providerBlocks,
          {
            title: (undefined as unknown) as string,
            content: (undefined as unknown) as string,
            icons: (undefined as unknown) as string[]
          }
        ]
      })
      expect(container).toBeInTheDocument()
    })

    it('renders svg icons', () => {
      setup()
      const iconBadge = screen.getAllByTestId('iconBadge')
      expect(iconBadge).toHaveLength(9)
    })
  })

  //social media links
  describe('social icons', () => {
    it('renders the social icons in a footer section on small screen', () => {
      setup({}, false)
      expect(screen.getByTestId('socialIconsSection')).toBeInTheDocument()
    })
    it('renders the social icons on larger screen', () => {
      setup()
      expect(screen.getByTestId('socialIcons')).toBeInTheDocument()
    })
    it('renders social icons as links', () => {
      setup()
      socialMediaLinks.forEach(({ links }) => {
        links.forEach(({ label, url }) => {
          expect(
            screen.getByTestId(`socialIconLink${label}` as string)
          ).toHaveAttribute('href', url)
        })
      })
    })
    it('opens the links in a new tab', () => {
      setup()
      socialMediaLinks.forEach(({ links }) => {
        links.forEach(({ label }) => {
          expect(
            screen.getByTestId(`socialIconLink${label}` as string)
          ).toHaveAttribute('target', '_blank')
        })
      })
    })
  })

  // newsletter
  describe('newsletter', () => {
    it("doesn't error if no newsletter data is passed", () => {
      const { container } = setup({
        newsletterBlockTitle: undefined,
        newsletterSellingPoints: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it('renders newsletter block title', () => {
      const { getByText } = setup({}, false)
      expect(getByText('Newsletter')).toBeInTheDocument()
    })

    it('renders newsletter form', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'shared.email-address' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'newsletter.subscribe-action' })
      ).toBeInTheDocument()
    })

    it('adds padding to the bottom of the footer when hasAdditionalBottomPadding is true, the feature flag is on and there are items in the basket', () => {
      setup(
        {
          hasAdditionalBottomPadding: true
        },
        true,
        true
      )
      expect(screen.getByTestId('footer')).toHaveClass('xs-only:pb-20')
    })
  })
})
