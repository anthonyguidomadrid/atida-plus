import { HeroHeader, HeroHeaderProps } from '.'
import { CmsContentTypes } from '~config/content-types'
import { renderWithStore } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe('HeroHeader', () => {
  const initialProps = {
    contentBlock: {
      contentType: CmsContentTypes.HERO_BANNER,
      image: {
        title: 'Some relevant image',
        alt: 'Some relevant image',
        url: 'https://picsum.photos/1000/200'
      },
      title: 'Your personal online pharmacy',
      richTextTitle: '<p>Your personal</p><p>online pharmacy</p>',
      text: 'Atida private label',
      searchPlaceholder: 'What are you looking for?',
      link: {
        label: 'view more',
        url: '/about-us'
      }
    } as const,
    backFunction: jest.fn()
  }

  const setup = (props: HeroHeaderProps = initialProps) =>
    renderWithStore(<HeroHeader {...props} />)

  it('renders the header wrapper with a HeroBanner', async () => {
    const { reset } = setupMatchMediaMock()
    const { findByTestId } = setup()

    expect(await findByTestId('heroHeader')).toBeInTheDocument()
    expect(await findByTestId('heroBanner')).toBeInTheDocument()
    reset()
  })

  it('fires the back function when the back button is clicked', async () => {
    const { reset } = setupMatchMediaMock()
    const { findByTestId } = setup()
    const button = await findByTestId('popBackButton')
    button.click()

    expect(initialProps.backFunction).toHaveBeenCalled()
    reset()
  })
})
