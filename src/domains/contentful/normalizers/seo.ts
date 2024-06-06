import type { Entry, Asset as ContentfulAsset } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { SeoFragment } from '~generated-graphql'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { Asset, normalizeAsset } from './asset'
import { normalizeRichText } from './rich-text'
import { CmsContentTypes } from '~config/content-types'

export type ContentfulSeo = Entry<{
  title: string
  description: string
  keywords: string
  image?: ContentfulAsset
  header: string
  copy: Document
  copyExpandable: Document
  noIndex?: boolean | null
  noFollow?: boolean | null
  link?: { slug?: string | null } | null
}>

export type Seo = {
  title?: string
  description?: string
  keywords?: string
  image?: Pick<Asset, 'url'>
  header?: string
  copy: string
  copyExpandable: string
  noIndex?: boolean | null
  noFollow?: boolean | null
  canonicalHrefOverride?: string | null
}

export const normalizeSeo = (seo?: SeoFragment): Seo | undefined => {
  return seo
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.SEO,
        title: seo?.title ?? undefined,
        description: seo?.description ?? undefined,
        keywords: seo?.keywords ?? undefined,
        image: normalizeAsset(seo?.image ?? undefined),
        header: seo?.header ?? undefined,
        copy: normalizeRichText(seo?.copy?.json),
        copyExpandable: normalizeRichText(seo?.copyExpandable?.json),
        noIndex: seo?.noIndex,
        noFollow: seo?.noFollow,
        canonicalHrefOverride: seo?.link?.slug
      })
    : undefined
}
