import type { Entry } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import type {
  Brand,
  ContentBlockWithImage,
  ContentfulIcon,
  ContentfulMenu,
  Slider,
  HeroBanner,
  CategoryGrid,
  Icon,
  Menu,
  USPsCard,
  ContentfulVoucherCodes,
  VoucherCodes,
  Category,
  ContentfulCategoryGrid,
  ContentfulContentBlockWithImage,
  ContentfulHeroBanner,
  ContentfulUSPsCard,
  ContentfulSeo,
  Seo,
  ContentfulCategory,
  StaticContentBlock,
  ContentfulStaticContentBlock,
  StaticHeaderBlock,
  ContentfulStaticHeaderBlock,
  ExponeaRecommendation,
  ContentfulExponeaRecommendation,
  ContentfulBrand,
  ContainerOfContentBlocks,
  ContentfulContainerOfContentBlocks,
  MarketingTeaser,
  TopBrands,
  CampaignHeroBanner,
  LinkBlock
} from '~domains/contentful'
import { ContentfulMenuItem } from '~domains/contentful/normalizers/menu-item'
import {
  ContentfulPromotion,
  Promotion
} from '~domains/contentful/normalizers/promotion'
import { CmsPageTypes } from '~config/page-types'
import {
  CategoryCop,
  ContentfulCategoryCop,
  ContentfulStaticRecommendationBlock,
  GroupOfStaticContentBlocks,
  StaticRecommendationBlock
} from '~domains/contentful/normalizers'
import { TranslationInfoLabel } from '~domains/contentful/normalizers/translationInfoLabel'
import { ContentfulLink, Link } from '~domains/contentful/normalizers/link'
import { CmsContentTypes } from '~config/content-types'

export type ContentfulFooterProviderBlock = Entry<{
  title: string
  content: Document
  icons: ContentfulIcon[]
  links: ContentfulLink[]
}>

export type FooterProviderBlock = {
  title: string
  content: string
  icons?: Icon[]
  links?: Link[]
}

export type Selector = { value: string; label: string }

export type ContentfulFooter = {
  importantLinks: ContentfulMenu
  serviceContactLinks: ContentfulMenu
  providerBlocks: ContentfulFooterProviderBlock[]
  newsletterBlockTitle: string
  newsletterSellingPoints: string[]
  termsConditionsLinks: ContentfulMenu
  copyright: Document
  socialMediaLinks: ContentfulFooterProviderBlock
}

type ContentfulContentBlock =
  | ContentfulCategoryGrid
  | ContentfulContentBlockWithImage
  | ContentfulHeroBanner
  | ContentfulUSPsCard
  | ContentfulVoucherCodes
  | ContentfulSeo
  | ContentfulPromotion
  | ContentfulStaticContentBlock
  | ContentfulStaticHeaderBlock
  | ContentfulExponeaRecommendation
  | ContentfulContainerOfContentBlocks
  | ContentfulStaticRecommendationBlock

type ContentfulReferencedContent =
  | ContentfulBrand
  | ContentfulCategory
  | ContentfulPromotion
  | ContentfulCategoryCop

export type ContentfulPage = {
  title: string
  slug: string
  pageType?: CmsPageTypes
  referencedContent?: ContentfulReferencedContent
  contentBlocks: ContentfulContentBlock[]
  category?: ContentfulCategory
  promotion?: ContentfulPromotion
  brand?: ContentfulBrand
}

export type ContentfulHeaderNavigationMenu = {
  title: string
  items?: ContentfulMenuItem[]
  id?: string
}

export type Footer = {
  importantLinks?: Menu
  serviceContactLinks?: Menu
  providerBlocks: FooterProviderBlock[]
  newsletterBlockTitle: string
  newsletterSellingPoints: string[]
  termsConditionsLinks?: Menu
  copyright: string
  socialMediaLinks: FooterProviderBlock[]
}

export type ContentfulPageRedirect = {
  slug?: string
  redirectTo?: ContentfulLink & Entry<ContentfulPage>
}

export type PageRedirect = {
  slug?: string
  redirectTo?: string
  isLink?: boolean
}

export type HeaderNavigationMenu = Menu

export type OrganizationAddress = {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export type Organization = {
  name: string
  description: string
  telephone: string
  email: string
  sameAs: string[]
  imageUrl: string
  id: string
  address?: OrganizationAddress
}

export type ContentfulOrganization = Organization & {
  address?: Entry<OrganizationAddress>
}

export type Common = {
  headerNavigationLeft?: HeaderNavigationMenu
  headerNavigationRight?: HeaderNavigationMenu
  footer: Footer
  organization?: Organization
  campaignLabels: TranslationInfoLabel[]
}

export type ContentBlock =
  | Slider
  | HeroBanner
  | CategoryGrid
  | ContentBlockWithImage
  | USPsCard
  | VoucherCodes
  | Promotion
  | StaticContentBlock
  | StaticHeaderBlock
  | ExponeaRecommendation
  | ContainerOfContentBlocks
  | GroupOfStaticContentBlocks
  | TopBrands
  | CampaignHeroBanner
  | LinkBlock
  | StaticRecommendationBlock

export const BLOCKS_WITHOUT_IMAGES = [
  CmsContentTypes.USPS_CARD,
  CmsContentTypes.VOUCHER_CODES,
  CmsContentTypes.LINK_BLOCK,
  CmsContentTypes.STATIC_CONTENT_BLOCK,
  CmsContentTypes.STATIC_HEADER_BLOCK
]

export type ContainerContentBlock = Promotion | MarketingTeaser

export type ReferencedContent = Brand | Category | Promotion | CategoryCop

export type PageContent = {
  type: PageType
  title: string | null
  altTitle?: string | null
  slug?: string
  allSlugs?: {
    [key: string]: string | undefined
  }
  isCampaignPage?: boolean
  pageType?: string
  referencedContent?: ReferencedContent
  heroHeader?: HeroBanner | CampaignHeroBanner
  contentBlocks: ContentBlock[]
  seo?: Seo
  brand?: Brand
  category?: Category
  promotion?: Promotion
  categoryCop?: CategoryCop
}

export enum PageType {
  Brand = 'brand',
  Content = 'content',
  POP = 'pop',
  Search = 'search',
  PromoDP = 'promodp',
  Product = 'product',
  COP = 'cop'
}

export type ElasticSearchUrlMapRecord = {
  type: PageType
  identifier: string
}
