import { SeoBlockQuery } from '~generated-graphql'
import { Seo } from '~domains/contentful'

export const contentfulSeoBlockGraphQL: { data: SeoBlockQuery } = {
  data: {
    seoCollection: {
      items: [
        {
          title: 'This is the title',
          description: 'This is the description',
          copy: null,
          copyExpandable: null
        },
        {
          title: 'This is another title',
          description: 'This is another description',
          copy: null,
          copyExpandable: null
        }
      ]
    }
  }
}

export const contentfulSeoBlockNormalized: Partial<
  Seo & { contentType: string }
> = {
  contentType: 'Seo',
  title: 'This is the title',
  description: 'This is the description',
  copy: '',
  copyExpandable: ''
}
