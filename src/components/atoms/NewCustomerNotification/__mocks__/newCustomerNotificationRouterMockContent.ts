import { PageContent, PageType } from '~domains/page'
import { CmsContentTypes } from '~config/content-types'

export const loginPagePageContent: PageContent = {
  type: PageType.Content,
  title: 'Login',
  slug: 'login',
  allSlugs: {
    'pt-pt': 'login'
  },
  contentBlocks: [
    {
      content:
        '<h2>Are you a new customer - ES</h2><p>Just few things to enjoy when you sign up.</p><ul><li><p>5% off on your first order</p></li><li><p>Free delivery over € 49</p></li><li><p>Easily track your orders</p></li></ul><p></p>',
      contentType: CmsContentTypes.STATIC_CONTENT_BLOCK,
      title: 'Create account static block'
    }
  ]
}
