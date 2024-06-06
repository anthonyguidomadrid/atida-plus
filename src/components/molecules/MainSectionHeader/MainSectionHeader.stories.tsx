import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import { MainSectionHeader, MainSectionHeaderProps } from './MainSectionHeader'
import { SimpleHeader } from '~components/molecules/SimpleHeader'
import { PromotionHeader } from '~components/molecules/PromotionHeader'
import { InfoLabelEnum } from '~domains/product'
import { HeroHeader } from '~components/molecules/HeroHeader'
import { CmsContentTypes } from '~config/content-types'
import { rootReducer } from '~domains/redux'

const store = createStore(rootReducer, {})

export default {
  component: MainSectionHeader,
  title: 'molecules/MainSectionHeader',
  parameters: { layout: 'fullscreen' },
  args: {
    color: 'category-beauty'
  }
}

export const simpleHeader = (args: MainSectionHeaderProps): JSX.Element => (
  <MainSectionHeader {...args}>
    {props => <SimpleHeader {...props} title="Test title for simple header" />}
  </MainSectionHeader>
)

export const simpleHeaderWithImage = (
  args: MainSectionHeaderProps
): JSX.Element => (
  <MainSectionHeader {...args}>
    {props => (
      <SimpleHeader
        {...props}
        title="Test title for simple header"
        image={{ url: '/sample/category-header-sample.png' }}
      />
    )}
  </MainSectionHeader>
)

export const promotionHeader = (args: MainSectionHeaderProps): JSX.Element => (
  <MainSectionHeader {...args}>
    {props => (
      <PromotionHeader
        title="Test title for promotion header"
        description="Short description of this magnificent promotion"
        labels={[
          { label: 'Promotion', type: InfoLabelEnum.Promotion },
          { label: 'Discount', type: InfoLabelEnum.Discount }
        ]}
        image={{ url: '/sample/category-header-sample.png', title: 'Alt text' }}
        {...props}
      />
    )}
  </MainSectionHeader>
)

export const heroHeader = (args: MainSectionHeaderProps): JSX.Element => (
  <Provider store={store}>
    <MainSectionHeader {...args}>
      {props => (
        <HeroHeader
          contentBlock={{
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
              url: '/about-us'
            }
          }}
          {...props}
        />
      )}
    </MainSectionHeader>
  </Provider>
)
