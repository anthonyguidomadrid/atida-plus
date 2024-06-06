import type { Entry, Asset as ContentfulAsset } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { CmsContentTypes } from '~config/content-types'
import { Asset, normalizeAsset } from './asset'
import { normalizeRichText } from './rich-text'
import { ContentfulLink, Link, normalizeLink } from './link'
import { Color, ContentfulColor, normalizeColor } from './color'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  ContentBlockWithImageFragment,
  Link as GraphQLLink
} from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'

export type ContentBlockWithImage = {
  contentType: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE
  header?: string
  title: string
  content: string
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  image?: Asset
  imageOnTheLeft?: boolean
  cta?: Link
  textLink?: Link
  backgroundColor?: Color
  textColor?: Color
  showDescription?: boolean
  buttonVariant?: 'primary' | 'tertiary'
  imageSize?: 'small' | 'large'
  buttonWidthForMobile?: 'auto' | 'full-width'
  buttonPositionForTablet?: 'right' | 'bottom'
  textAlignmentForMobile?: 'left' | 'center'
  titleTypography?: 'heading' | 'body'
}

export type ContentfulContentBlockWithImage = Entry<{
  header?: string
  title: string
  content: Document
  sponsored?: boolean
  image: ContentfulAsset
  imageLeft?: boolean
  cta: ContentfulLink
  textLink: ContentfulLink
  bgColor: ContentfulColor
  textColor: ContentfulColor
  showDesc?: boolean
  btnType?: string | null
  imageSize?: string | null
  btnWidthMobile?: string | null
  btnPosTablet?: string | null
  txtAlignMobile?: string | null
  typography?: string | null
}>

const normalizeContentBlockWithImageRest = (
  contentBlock?: ContentfulContentBlockWithImage
): ContentBlockWithImage =>
  removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE,
    header: contentBlock?.fields?.header ?? '',
    title: contentBlock?.fields?.title ?? '',
    isSponsoredContent: contentBlock?.fields?.sponsored ?? false,
    image: normalizeAsset(contentBlock?.fields?.image),
    imageOnTheLeft: contentBlock?.fields?.imageLeft ?? false,
    content: normalizeRichText(contentBlock?.fields?.content),
    cta: normalizeLink(contentBlock?.fields?.cta),
    textLink: normalizeLink(contentBlock?.fields?.textLink),
    backgroundColor: normalizeColor(contentBlock?.fields?.bgColor),
    textColor: normalizeColor(contentBlock?.fields?.textColor),
    showDescription:
      contentBlock?.fields?.showDesc === null ||
      contentBlock?.fields?.showDesc === undefined
        ? true
        : contentBlock?.fields?.showDesc,
    buttonVariant: contentBlock?.fields?.btnType
      ? (contentBlock?.fields?.btnType?.toLocaleLowerCase() as
          | 'primary'
          | 'tertiary')
      : 'primary',
    imageSize: contentBlock?.fields?.imageSize
      ? (contentBlock?.fields?.imageSize.toLocaleLowerCase() as
          | 'small'
          | 'large')
      : 'large',
    buttonWidthForMobile: contentBlock?.fields?.btnWidthMobile
      ? (contentBlock?.fields?.btnWidthMobile
          .toLocaleLowerCase()
          .split(' ')
          .join('-') as 'auto' | 'full-width')
      : 'auto',
    buttonPositionForTablet: contentBlock?.fields?.btnPosTablet
      ? (contentBlock?.fields?.btnPosTablet.toLocaleLowerCase() as
          | 'right'
          | 'bottom')
      : 'right',
    textAlignmentForMobile: contentBlock?.fields?.txtAlignMobile
      ? (contentBlock?.fields?.txtAlignMobile.toLocaleLowerCase() as
          | 'left'
          | 'center')
      : 'left',
    titleTypography: contentBlock?.fields?.typography
      ? (contentBlock?.fields?.typography.toLocaleLowerCase() as
          | 'heading'
          | 'body')
      : 'heading'
  })

export const normalizeContentBlockWithImageGraphQL = (
  contentBlock?: ContentBlockWithImageFragment
): ContentBlockWithImage =>
  removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE,
    header: contentBlock?.header ?? '',
    title: contentBlock?.title ?? '',
    isSponsoredContent: contentBlock?.sponsored ?? false,
    image: normalizeAsset(contentBlock?.image ?? undefined),
    imageOnTheLeft: contentBlock?.imageLeft ? true : false,
    content: normalizeRichText(contentBlock?.content?.json),
    cta: normalizeLink(contentBlock?.cta as GraphQLLink),
    textLink: normalizeLink(contentBlock?.textLink as GraphQLLink),
    backgroundColor: normalizeColor(contentBlock?.bgColor ?? undefined),
    textColor: normalizeColor(contentBlock?.textColor ?? undefined),
    showDescription:
      contentBlock?.showDesc === null || contentBlock?.showDesc === undefined
        ? true
        : contentBlock?.showDesc,
    buttonVariant: contentBlock?.btnType
      ? (contentBlock?.btnType?.toLocaleLowerCase() as 'primary' | 'tertiary')
      : 'primary',
    imageSize: contentBlock?.imageSize
      ? (contentBlock?.imageSize.toLocaleLowerCase() as 'small' | 'large')
      : 'large',
    buttonWidthForMobile: contentBlock?.btnWidthMobile
      ? (contentBlock?.btnWidthMobile
          .toLocaleLowerCase()
          .split(' ')
          .join('-') as 'auto' | 'full-width')
      : 'auto',
    buttonPositionForTablet: contentBlock?.btnPosTablet
      ? (contentBlock?.btnPosTablet.toLocaleLowerCase() as 'right' | 'bottom')
      : 'right',
    textAlignmentForMobile: contentBlock?.txtAlignMobile
      ? (contentBlock?.txtAlignMobile.toLocaleLowerCase() as 'left' | 'center')
      : 'left',
    titleTypography: contentBlock?.typography
      ? (contentBlock?.typography.toLocaleLowerCase() as 'heading' | 'body')
      : 'heading'
  })

export const normalizeContentBlockWithImage = (
  contentBlock?: ContentfulContentBlockWithImage | ContentBlockWithImageFragment
): ContentBlockWithImage => {
  if (checkIfGraphQLResponse(contentBlock)) {
    return normalizeContentBlockWithImageGraphQL(contentBlock)
  }

  return normalizeContentBlockWithImageRest(contentBlock)
}
