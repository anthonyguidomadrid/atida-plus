import { ContentBlocksLayout, ContentBlocksLayoutProps } from '.'
import { CmsContentTypes } from '~config/content-types'
import { InfoLabelEnum } from '~domains/product'
import { renderWithStore } from '~test-helpers'
import { testInitialState } from '~components/organisms/ExponeaRecommendationBlock/ExponeaRecommendationBlock.mock'

describe(ContentBlocksLayout, () => {
  const setup = (props: ContentBlocksLayoutProps) =>
    renderWithStore(<ContentBlocksLayout {...props} />, {
      initialState: testInitialState
    })

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

  it("doesn't error when there are no content blocks", async () => {
    const { getByTestId } = setup({ contentBlocks: [] })

    expect(await getByTestId('contentBlocksLayout')).toBeInTheDocument()
  })

  it('adds container rules and consistent spacing between content blocks', async () => {
    const { getByTestId } = setup({ contentBlocks: [] })

    expect(await getByTestId('contentBlocksLayout')).toHaveClass(
      ...[
        'gap-5',
        'sm:gap-6',
        'md:gap-7',
        'lg:gap-9',
        'container',
        'container-fixed',
        'mx-auto'
      ]
    )
  })

  it('renders HeroBanner content type as <HeroBanner />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.HERO_BANNER,
          image: {
            title: 'Some relevant image',
            alt: 'Some relevant image',
            url: 'https://picsum.photos/1000/200'
          },
          title: 'Your personal online pharmacy',
          text: 'Atida private label',
          searchPlaceholder: 'What are you looking for?',
          link: {
            label: 'view more',
            url: 'about-us',
            content: ''
          }
        }
      ]
    })

    expect(await getByTestId('heroBanner')).toBeInTheDocument()
  })

  it('renders CampaignHeroBanner content type as <CampaignHeroBanner />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.CAMPAIGN_HERO_BANNER,
          title: '<p>Your personal</p><p>online pharmacy</p>',
          description: 'Description of the campaign',
          altTitle: 'campaign',
          finishingDate: '',
          backgroundColor: 'ui-black',
          image: {
            title: 'Some relevant image',
            url: 'https://picsum.photos/1000/200'
          },
          url: '/test-url'
        }
      ]
    })

    expect(await getByTestId('campaignHeroBanner')).toBeInTheDocument()
  })

  it('renders CategoryGrid content type as <CategoryGrid />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.CATEGORY_GRID,
          title: 'Shop by category',
          items: [
            {
              title: 'Cosmetics & Beauty',
              color: 'bg-category-beauty',
              image: {
                title: 'Cosmetics & Beauty',
                alt: 'Cosmetics & Beauty',
                url:
                  '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
              },
              url: 'https://google.de'
            },
            {
              title: 'Personal care',
              color: 'bg-category-personal-care',
              image: {
                title: 'Personal care',
                alt: 'Personal care',
                url:
                  '//images.ctfassets.net/7g2w796onies/6lL3GTSipzBGf3K67argHx/d929e7d3cc7163336e68524a1ac8fa8f/Personal_care.png'
              },
              url: '/'
            },
            {
              title: 'Promotions',
              color: 'bg-secondary-portland-orange',
              url: '/'
            }
          ],
          viewType: 'Slider'
        }
      ]
    })

    expect(await getByTestId('categoryTiles')).toBeInTheDocument()
  })

  it('renders ContentBlockWithImage content type as <ContentWithImage />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE,
          title: 'Any questions?',
          image: {
            title: 'Contact image',
            description: 'Person looking at a tablet',
            url: 'adam-winger-iirbrh939yc-unsplash_1.jpg',
            type: 'image/jpeg'
          },
          content:
            '<p>We&#39;re here to help. Ask about our products or get expert medical advice.</p>',
          cta: {
            label: 'Chat with an expert',
            url: '/contact',
            icon: 'NavAdvice24',
            content: ''
          },
          textLink: {
            label: 'Read our FAQ',
            url: '/faq',
            content: ''
          },
          backgroundColor: 'secondary-dark-sky-blue',
          textColor: 'primary-white'
        }
      ]
    })

    expect(await getByTestId('contentWithImage')).toBeInTheDocument()
  })

  it('renders UspsCard content type as <USPCard />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.USPS_CARD,
          title: 'Usp title',
          items: [
            {
              icon: 'icon name',
              text: 'usp text'
            }
          ]
        }
      ]
    })

    expect(await getByTestId('breakOutOfContainer-USP')).toBeInTheDocument()
  })

  it('renders Promotion content type as <PromotionTeaser />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.PROMOTION,
          title: 'Delete account',
          labels: [
            {
              type: InfoLabelEnum.Promotion,
              label: 'Promo 20%'
            }
          ],
          color: 'bg-category-beauty',
          teaserImage: {
            title: 'Contact image',
            description: 'Person looking at a tablet',
            url: 'adam-winger-iirbrh939yc-unsplash_1.jpg',
            type: 'image/jpeg'
          },
          isContentWithImage: true,
          teaserDescription: 'Promotion',
          url: 'https://www.atida.com/pt-pt/promo-test',
          validFrom: '2021-01-01T00:00:01',
          validTo: '2024-01-01T00:00:01'
        }
      ]
    })

    expect(await getByTestId('promotionTeaser')).toBeInTheDocument()
  })

  it('renders StaticContentBlock content type as <StaticContentBlock />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.STATIC_CONTENT_BLOCK,
          title: 'Static content',
          content: 'Text that is content'
        }
      ]
    })

    expect(await getByTestId('staticContentBlock')).toBeInTheDocument()
  })

  it('renders StaticHeaderBlock content type as <StaticHeaderBlock />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.STATIC_HEADER_BLOCK,
          title: 'Static Header Title'
        }
      ]
    })

    expect(await getByTestId('staticHeaderBlock')).toBeInTheDocument()
  })

  it('renders ExponeaRecommendation content type as <ExponeaRecommendationBlock />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.EXPONEA_RECOMMENDATION,
          title: 'Exponea Recommendation Block',
          recommendationId: 'someRecommendationId'
        }
      ]
    })

    expect(await getByTestId('exponeaRecommendationBlock')).toBeInTheDocument()
  })

  it('renders ContainerOfContentBlocks content type as <ContainerOfContentBlocks />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS,
          title: 'Container of content blocks',
          displayTitle: true,
          blocks: [],
          hasSmallMargin: false
        }
      ]
    })

    expect(await getByTestId('containerOfContentBlocks')).toBeInTheDocument()
  })

  it('renders TopBrands content type as <TopBrands />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.TOP_BRANDS,
          title: 'Top brands title',
          items: []
        }
      ]
    })

    expect(await getByTestId('topBrands')).toBeInTheDocument()
  })

  it('renders LinkBlock content type as <LinkBlock />', async () => {
    const { getByTestId } = setup({
      contentBlocks: [
        {
          contentType: CmsContentTypes.LINK_BLOCK,
          label: 'Link block label',
          url: '/test-url',
          icon: 'icon name'
        }
      ]
    })

    expect(await getByTestId('LinkBlock')).toBeInTheDocument()
  })
})
