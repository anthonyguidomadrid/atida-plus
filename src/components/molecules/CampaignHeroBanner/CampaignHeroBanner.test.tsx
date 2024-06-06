import { screen } from '@testing-library/react'
import { CampaignHeroBanner, CampaignHeroBannerProps } from '.'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { renderWithStore } from '~test-helpers'

describe('CampaignHeroBanner', () => {
  const campaignPropsMock = {
    title: 'Black Friday Campaign',
    description: 'Everything you need to know about this campaign.',
    altTitle: 'Up to 35% discounts',
    finishingDate: '2021-10-09T00:00:00.000+02:00',
    image: {
      title: 'A sample image',
      url: 'https://source.unsplash.com/random/448x228?sig=0'
    },
    url: '/examplecampaign'
  }

  const setup = (
    props: Partial<CampaignHeroBannerProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <CampaignHeroBanner {...campaignPropsMock} {...props} />
    )
    reset()
    return renderedComponent
  }

  describe('campaign hero banner component', () => {
    it('renders campaign hero banner component', () => {
      setup()
      expect(screen.getByTestId('campaignHeroBanner')).toBeInTheDocument()
    })

    it('renders the CTA', () => {
      setup()
      expect(screen.getByTestId('campaignHeroBannerButton')).toBeInTheDocument()
    })

    it('renders the image', () => {
      setup()
      expect(screen.getByTestId('campaignHeroBannerImage')).toBeInTheDocument()
    })

    it("doesn't error if 'finishingDate' is not passed", () => {
      const { container } = setup({
        ...campaignPropsMock,
        finishingDate: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it('renders title', () => {
      setup()
      expect(screen.getByText('Black Friday Campaign')).toBeInTheDocument()
    })

    it('renders the images with correct src and alt', () => {
      setup()
      expect(screen.queryAllByRole('img')[0]).toBeInTheDocument()
      expect(screen.queryAllByRole('img')[0]).toHaveAttribute(
        'src',
        'https://source.unsplash.com/random/448x228?sig=0'
      )
      expect(screen.queryAllByRole('img')[0]).toHaveAttribute(
        'alt',
        'A sample image'
      )
    })
  })
})
