import { removeUndefinedPropertiesFromObject } from '~helpers'
import { ContentfulPageRedirect, PageRedirect } from '~domains/page/types'
import { Entry, EntryCollection } from 'contentful'

export const normalizePageRedirect = (
  pageRedirect: Entry<ContentfulPageRedirect>
): PageRedirect => {
  return removeUndefinedPropertiesFromObject({
    slug: pageRedirect?.fields?.slug,
    redirectTo:
      pageRedirect?.fields?.redirectTo?.sys?.contentType?.sys?.id === 'link'
        ? pageRedirect?.fields?.redirectTo?.fields?.url ?? undefined
        : pageRedirect?.fields?.redirectTo?.fields?.slug ?? undefined,
    isLink:
      pageRedirect?.fields?.redirectTo?.sys?.contentType?.sys?.id === 'link' ??
      undefined
  })
}

export const normalizePageRedirects = (
  response: EntryCollection<ContentfulPageRedirect>
): PageRedirect[] => response?.items?.map(i => normalizePageRedirect(i)) ?? []
