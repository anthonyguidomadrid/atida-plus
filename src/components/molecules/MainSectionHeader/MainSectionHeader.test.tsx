import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { MainSectionHeader, MainSectionHeaderProps } from '.'
import { SimpleHeader } from '~components/molecules/SimpleHeader'
import { PromotionHeader } from '~components/molecules/PromotionHeader'
import { HeroHeader } from '~components/molecules/HeroHeader'
import { CmsContentTypes } from '~config/content-types'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { setupMatchMediaMock } from '~domains/breakpoints'

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

describe(MainSectionHeader, () => {
  const defaultProps = {
    backgroundColor: 'category-beauty'
  }
  const mockHeroBanner = {
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
  } as const
  const setup = (
    props: MainSectionHeaderProps = defaultProps,
    Component: typeof SimpleHeader | typeof PromotionHeader = SimpleHeader
  ) =>
    render(
      <MainSectionHeader {...props}>
        {childProps => <Component {...childProps} />}
      </MainSectionHeader>
    )
  const store = createStore(rootReducer, {})

  it('applies the correct color background', async () => {
    const { findByTestId } = setup()

    expect(await findByTestId('mainSectionHeader')).toHaveClass(
      'bg-category-beauty'
    )
  })

  it('renders the SimpleHeader', async () => {
    const { findByTestId, container } = setup()

    expect(await findByTestId('simpleHeader')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders the PromotionHeader', async () => {
    const { findByTestId, container } = setup(defaultProps, PromotionHeader)

    expect(await findByTestId('promotionHeader')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders the HeroHeader with a HeroBanner', async () => {
    const { reset } = setupMatchMediaMock(true)
    const { findByTestId, container } = setup(defaultProps, () => (
      <Provider store={store}>
        <HeroHeader contentBlock={mockHeroBanner} backFunction={jest.fn()} />
      </Provider>
    ))

    expect(await findByTestId('heroHeader')).toBeInTheDocument()
    expect(await findByTestId('heroBanner')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
    reset()
  })
})
