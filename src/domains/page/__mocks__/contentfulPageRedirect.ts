import type { DeepPartial } from '@reduxjs/toolkit'
import { ContentfulLink } from '~domains/contentful'
import { ContentfulPageRedirect, PageRedirect } from '../types'

export const contentfulPageRedirect: {
  items: { fields: DeepPartial<ContentfulPageRedirect> }[]
} = {
  items: [
    {
      fields: {
        slug: 'marca/nuk',
        //@ts-ignore
        redirectTo: ({
          sys: {
            contentType: {
              sys: {
                id: 'link'
              }
            }
          },
          fields: {
            label: 'Ler FAQ',
            url: 'https://support.atida.com/pt-PT/support/home'
          }
        } as unknown) as ContentfulLink
      }
    }
  ]
}

export const contentfulPageRedirectNormalized: PageRedirect = {
  slug: 'marca/nuk',
  redirectTo: 'https://support.atida.com/pt-PT/support/home',
  isLink: true
}
