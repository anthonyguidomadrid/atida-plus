import type { Entry } from 'contentful'
import { ContentfulIcon, Icon, normalizeIcon } from './icon'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { CmsContentTypes } from '~config/content-types'
import { VoucherCodeFragment, VoucherCodesFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'
import { normalizeRichText } from './rich-text'
import type { Document } from '@contentful/rich-text-types'

export type VoucherCodes = {
  title: string
  items?: VoucherCode[]
  contentType?: CmsContentTypes.VOUCHER_CODES
}
export type VoucherCode = {
  icon?: Icon
  voucherRichTextTitle?: string
  title?: string
  discount?: string
  code?: string
  description?: string
}

export type ContentfulVoucherCodes = Entry<{
  title?: string
  voucherCodes: ContentfulVoucherCode[]
}>

export type ContentfulVoucherCode = Entry<{
  title?: string
  voucherRichTextTitle?: Document
  discount?: string
  code?: string
  description?: string
  icon?: ContentfulIcon
}>

const normalizeVoucherCodesRest = (
  contentBlock?: ContentfulVoucherCodes
): VoucherCodes | undefined => {
  return removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.VOUCHER_CODES as const,
    title: contentBlock?.fields?.title ?? '',
    items: contentBlock?.fields?.voucherCodes
      ?.map(normalizeVoucherCode)
      ?.filter((voucherCode): voucherCode is VoucherCode => !!voucherCode)
  })
}

const normalizeVoucherCodeRest = (
  contentBlock?: ContentfulVoucherCode
): VoucherCode => {
  return removeUndefinedPropertiesFromObject({
    icon: normalizeIcon(contentBlock?.fields?.icon),
    voucherRichTextTitle:
      normalizeRichText(contentBlock?.fields?.voucherRichTextTitle) ?? null,
    title: contentBlock?.fields?.title ?? '',
    description: contentBlock?.fields?.description ?? '',
    code: contentBlock?.fields?.code ?? '',
    discount: contentBlock?.fields?.discount ?? ''
  })
}

const normalizeVoucherCodesGraphQL = (
  contentBlock?: VoucherCodesFragment
): VoucherCodes | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.VOUCHER_CODES as const,
        title: contentBlock?.title ?? '',
        items: (contentBlock?.voucherCodesCollection?.items ?? [])
          .filter(voucherCode => voucherCode !== null)
          .map(voucherCode => normalizeVoucherCode(voucherCode ?? undefined))
          .filter((voucherCode): voucherCode is VoucherCode => !!voucherCode)
      })
    : undefined

const normalizeVoucherCodeGraphQL = (
  contentBlock?: VoucherCodeFragment
): VoucherCode | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        icon: normalizeIcon(contentBlock?.icon ?? undefined),
        voucherRichTextTitle:
          normalizeRichText(contentBlock?.voucherRichTextTitle?.json) ??
          undefined,
        title: contentBlock?.title ?? '',
        description: contentBlock?.description ?? '',
        code: contentBlock?.code ?? '',
        discount: contentBlock?.discount ?? ''
      })
    : undefined

export const normalizeVoucherCode = (
  contentBlock?: ContentfulVoucherCode | VoucherCodeFragment
): VoucherCode | undefined => {
  if (checkIfGraphQLResponse(contentBlock)) {
    return normalizeVoucherCodeGraphQL(contentBlock ?? undefined)
  }

  return normalizeVoucherCodeRest(contentBlock ?? undefined)
}

export const normalizeVoucherCodes = (
  contentBlock?: ContentfulVoucherCodes | VoucherCodesFragment
): VoucherCodes | undefined => {
  if (checkIfGraphQLResponse(contentBlock)) {
    return normalizeVoucherCodesGraphQL(contentBlock)
  }

  return normalizeVoucherCodesRest(contentBlock)
}
