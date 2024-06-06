import type { Entry } from 'contentful'

import { ContentfulPage, PageContent } from '~domains/page/types'
import { Link } from '~domains/contentful/normalizers/link'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { normalizeCategory } from './category'
import { CmsPageTypes } from '~config/page-types'
import {
  checkIfGraphQLResponse,
  normalizeCategoryCop
} from '~domains/contentful'
import { CategoryCopFragment, CategoryFragment } from '~generated-graphql'

const normalizePageLinkRest = (contentBlock?: Entry<ContentfulPage>): Link => {
  return removeUndefinedPropertiesFromObject({
    label: contentBlock?.fields?.title ?? undefined,
    url: prependURLWithSlash(contentBlock?.fields?.slug) ?? undefined,
    category:
      contentBlock?.fields?.pageType === CmsPageTypes.CATEGORY &&
      contentBlock?.fields?.referencedContent
        ? //@ts-ignore
          normalizeCategory(contentBlock?.fields?.referencedContent)
        : contentBlock?.fields?.pageType === CmsPageTypes.CATEGORY_COP &&
          contentBlock?.fields?.referencedContent
        ? normalizeCategoryCop(contentBlock?.fields?.referencedContent, true)
        : undefined
  })
}

const normalizePageLinkGraphql = (page?: PageContent): Link | undefined =>
  page
    ? removeUndefinedPropertiesFromObject({
        label: page?.title ?? undefined,
        url: page?.slug ?? undefined,
        category:
          page?.pageType === CmsPageTypes.CATEGORY && page?.referencedContent
            ? normalizeCategory(page?.referencedContent as CategoryFragment)
            : page?.pageType === CmsPageTypes.CATEGORY_COP &&
              page?.referencedContent
            ? normalizeCategoryCop(
                page?.referencedContent as CategoryCopFragment,
                true
              )
            : undefined
      })
    : undefined

export const normalizePageLink = (
  link?: PageContent | Entry<ContentfulPage>
): Link | undefined =>
  checkIfGraphQLResponse(link)
    ? normalizePageLinkGraphql(link)
    : normalizePageLinkRest(link)
