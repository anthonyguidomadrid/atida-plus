import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Dimension: any;
  HexColor: any;
  JSON: any;
  Quality: any;
};

export type Address = Entry & {
  readonly __typename?: 'Address';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<AddressLinkingCollections>;
  readonly streetAddress?: Maybe<Scalars['String']>;
  readonly addressLocality?: Maybe<Scalars['String']>;
  readonly addressRegion?: Maybe<Scalars['String']>;
  readonly postalCode?: Maybe<Scalars['String']>;
  readonly addressCountry?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
};


export type AddressLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type AddressStreetAddressArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AddressAddressLocalityArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AddressAddressRegionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AddressPostalCodeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AddressAddressCountryArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AddressIdArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type AddressCollection = {
  readonly __typename?: 'AddressCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Address>>;
};

export type AddressFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly streetAddress_exists?: Maybe<Scalars['Boolean']>;
  readonly streetAddress?: Maybe<Scalars['String']>;
  readonly streetAddress_not?: Maybe<Scalars['String']>;
  readonly streetAddress_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly streetAddress_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly streetAddress_contains?: Maybe<Scalars['String']>;
  readonly streetAddress_not_contains?: Maybe<Scalars['String']>;
  readonly addressLocality_exists?: Maybe<Scalars['Boolean']>;
  readonly addressLocality?: Maybe<Scalars['String']>;
  readonly addressLocality_not?: Maybe<Scalars['String']>;
  readonly addressLocality_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressLocality_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressLocality_contains?: Maybe<Scalars['String']>;
  readonly addressLocality_not_contains?: Maybe<Scalars['String']>;
  readonly addressRegion_exists?: Maybe<Scalars['Boolean']>;
  readonly addressRegion?: Maybe<Scalars['String']>;
  readonly addressRegion_not?: Maybe<Scalars['String']>;
  readonly addressRegion_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressRegion_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressRegion_contains?: Maybe<Scalars['String']>;
  readonly addressRegion_not_contains?: Maybe<Scalars['String']>;
  readonly postalCode_exists?: Maybe<Scalars['Boolean']>;
  readonly postalCode?: Maybe<Scalars['String']>;
  readonly postalCode_not?: Maybe<Scalars['String']>;
  readonly postalCode_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly postalCode_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly postalCode_contains?: Maybe<Scalars['String']>;
  readonly postalCode_not_contains?: Maybe<Scalars['String']>;
  readonly addressCountry_exists?: Maybe<Scalars['Boolean']>;
  readonly addressCountry?: Maybe<Scalars['String']>;
  readonly addressCountry_not?: Maybe<Scalars['String']>;
  readonly addressCountry_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressCountry_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressCountry_contains?: Maybe<Scalars['String']>;
  readonly addressCountry_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<AddressFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<AddressFilter>>>;
};

export type AddressLinkingCollections = {
  readonly __typename?: 'AddressLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly organizationCollection?: Maybe<OrganizationCollection>;
};


export type AddressLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AddressLinkingCollectionsOrganizationCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum AddressOrder {
  StreetAddressAsc = 'streetAddress_ASC',
  StreetAddressDesc = 'streetAddress_DESC',
  AddressLocalityAsc = 'addressLocality_ASC',
  AddressLocalityDesc = 'addressLocality_DESC',
  AddressRegionAsc = 'addressRegion_ASC',
  AddressRegionDesc = 'addressRegion_DESC',
  PostalCodeAsc = 'postalCode_ASC',
  PostalCodeDesc = 'postalCode_DESC',
  AddressCountryAsc = 'addressCountry_ASC',
  AddressCountryDesc = 'addressCountry_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Asset = {
  readonly __typename?: 'Asset';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly title?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly contentType?: Maybe<Scalars['String']>;
  readonly fileName?: Maybe<Scalars['String']>;
  readonly size?: Maybe<Scalars['Int']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly width?: Maybe<Scalars['Int']>;
  readonly height?: Maybe<Scalars['Int']>;
  readonly linkedFrom?: Maybe<AssetLinkingCollections>;
};


export type AssetTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AssetDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AssetContentTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AssetFileNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AssetSizeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetWidthArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AssetHeightArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};

export type AssetCollection = {
  readonly __typename?: 'AssetCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Asset>>;
};

export type AssetFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly description_exists?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly description_not?: Maybe<Scalars['String']>;
  readonly description_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_contains?: Maybe<Scalars['String']>;
  readonly description_not_contains?: Maybe<Scalars['String']>;
  readonly url_exists?: Maybe<Scalars['Boolean']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly url_not?: Maybe<Scalars['String']>;
  readonly url_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_contains?: Maybe<Scalars['String']>;
  readonly url_not_contains?: Maybe<Scalars['String']>;
  readonly size_exists?: Maybe<Scalars['Boolean']>;
  readonly size?: Maybe<Scalars['Int']>;
  readonly size_not?: Maybe<Scalars['Int']>;
  readonly size_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly size_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly size_gt?: Maybe<Scalars['Int']>;
  readonly size_gte?: Maybe<Scalars['Int']>;
  readonly size_lt?: Maybe<Scalars['Int']>;
  readonly size_lte?: Maybe<Scalars['Int']>;
  readonly contentType_exists?: Maybe<Scalars['Boolean']>;
  readonly contentType?: Maybe<Scalars['String']>;
  readonly contentType_not?: Maybe<Scalars['String']>;
  readonly contentType_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly contentType_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly contentType_contains?: Maybe<Scalars['String']>;
  readonly contentType_not_contains?: Maybe<Scalars['String']>;
  readonly fileName_exists?: Maybe<Scalars['Boolean']>;
  readonly fileName?: Maybe<Scalars['String']>;
  readonly fileName_not?: Maybe<Scalars['String']>;
  readonly fileName_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly fileName_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly fileName_contains?: Maybe<Scalars['String']>;
  readonly fileName_not_contains?: Maybe<Scalars['String']>;
  readonly width_exists?: Maybe<Scalars['Boolean']>;
  readonly width?: Maybe<Scalars['Int']>;
  readonly width_not?: Maybe<Scalars['Int']>;
  readonly width_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly width_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly width_gt?: Maybe<Scalars['Int']>;
  readonly width_gte?: Maybe<Scalars['Int']>;
  readonly width_lt?: Maybe<Scalars['Int']>;
  readonly width_lte?: Maybe<Scalars['Int']>;
  readonly height_exists?: Maybe<Scalars['Boolean']>;
  readonly height?: Maybe<Scalars['Int']>;
  readonly height_not?: Maybe<Scalars['Int']>;
  readonly height_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly height_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly height_gt?: Maybe<Scalars['Int']>;
  readonly height_gte?: Maybe<Scalars['Int']>;
  readonly height_lt?: Maybe<Scalars['Int']>;
  readonly height_lte?: Maybe<Scalars['Int']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<AssetFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<AssetFilter>>>;
};

export type AssetLinkingCollections = {
  readonly __typename?: 'AssetLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly brandCollection?: Maybe<BrandCollection>;
  readonly categoryCollection?: Maybe<CategoryCollection>;
  readonly promotionCollection?: Maybe<PromotionCollection>;
  readonly expertSignatureCollection?: Maybe<ExpertSignatureCollection>;
  readonly heroBannerCollection?: Maybe<HeroBannerCollection>;
  readonly categoryTileCollection?: Maybe<CategoryTileCollection>;
  readonly seoCollection?: Maybe<SeoCollection>;
  readonly contentBlockWithImageCollection?: Maybe<ContentBlockWithImageCollection>;
  readonly marketingTeaserCollection?: Maybe<MarketingTeaserCollection>;
  readonly campaignHeroBannerCollection?: Maybe<CampaignHeroBannerCollection>;
  readonly mediaCollection?: Maybe<MediaCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsBrandCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsPromotionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsExpertSignatureCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsHeroBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsCategoryTileCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsSeoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsContentBlockWithImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsMarketingTeaserCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsCampaignHeroBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum AssetOrder {
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Brand = Entry & {
  readonly __typename?: 'Brand';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<BrandLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly image?: Maybe<Asset>;
  readonly logoImage?: Maybe<Asset>;
  readonly slug?: Maybe<Scalars['String']>;
};


export type BrandLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type BrandTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type BrandIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type BrandImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type BrandLogoImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type BrandSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type BrandCollection = {
  readonly __typename?: 'BrandCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Brand>>;
};

export type BrandFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly logoImage_exists?: Maybe<Scalars['Boolean']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<BrandFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<BrandFilter>>>;
};

export type BrandLinkingCollections = {
  readonly __typename?: 'BrandLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
  readonly topBrandsCollection?: Maybe<TopBrandsCollection>;
};


export type BrandLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type BrandLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type BrandLinkingCollectionsTopBrandsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum BrandOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CampaignHeroBanner = Entry & {
  readonly __typename?: 'CampaignHeroBanner';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<CampaignHeroBannerLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly altTitle?: Maybe<Scalars['String']>;
  readonly description?: Maybe<CampaignHeroBannerDescription>;
  readonly isSponsoredContent?: Maybe<Scalars['Boolean']>;
  readonly finishingDate?: Maybe<Scalars['DateTime']>;
  readonly image?: Maybe<Asset>;
  readonly url?: Maybe<Scalars['String']>;
  readonly backgroundColor?: Maybe<Color>;
};


export type CampaignHeroBannerLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type CampaignHeroBannerTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerAltTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerIsSponsoredContentArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerFinishingDateArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerBackgroundColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type CampaignHeroBannerCollection = {
  readonly __typename?: 'CampaignHeroBannerCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<CampaignHeroBanner>>;
};

export type CampaignHeroBannerDescription = {
  readonly __typename?: 'CampaignHeroBannerDescription';
  readonly json: Scalars['JSON'];
  readonly links: CampaignHeroBannerDescriptionLinks;
};

export type CampaignHeroBannerDescriptionAssets = {
  readonly __typename?: 'CampaignHeroBannerDescriptionAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type CampaignHeroBannerDescriptionEntries = {
  readonly __typename?: 'CampaignHeroBannerDescriptionEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type CampaignHeroBannerDescriptionLinks = {
  readonly __typename?: 'CampaignHeroBannerDescriptionLinks';
  readonly entries: CampaignHeroBannerDescriptionEntries;
  readonly assets: CampaignHeroBannerDescriptionAssets;
};

export type CampaignHeroBannerFilter = {
  readonly backgroundColor?: Maybe<CfColorNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly altTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly altTitle?: Maybe<Scalars['String']>;
  readonly altTitle_not?: Maybe<Scalars['String']>;
  readonly altTitle_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly altTitle_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly altTitle_contains?: Maybe<Scalars['String']>;
  readonly altTitle_not_contains?: Maybe<Scalars['String']>;
  readonly description_exists?: Maybe<Scalars['Boolean']>;
  readonly description_contains?: Maybe<Scalars['String']>;
  readonly description_not_contains?: Maybe<Scalars['String']>;
  readonly isSponsoredContent_exists?: Maybe<Scalars['Boolean']>;
  readonly isSponsoredContent?: Maybe<Scalars['Boolean']>;
  readonly isSponsoredContent_not?: Maybe<Scalars['Boolean']>;
  readonly finishingDate_exists?: Maybe<Scalars['Boolean']>;
  readonly finishingDate?: Maybe<Scalars['DateTime']>;
  readonly finishingDate_not?: Maybe<Scalars['DateTime']>;
  readonly finishingDate_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly finishingDate_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly finishingDate_gt?: Maybe<Scalars['DateTime']>;
  readonly finishingDate_gte?: Maybe<Scalars['DateTime']>;
  readonly finishingDate_lt?: Maybe<Scalars['DateTime']>;
  readonly finishingDate_lte?: Maybe<Scalars['DateTime']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly url_exists?: Maybe<Scalars['Boolean']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly url_not?: Maybe<Scalars['String']>;
  readonly url_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_contains?: Maybe<Scalars['String']>;
  readonly url_not_contains?: Maybe<Scalars['String']>;
  readonly backgroundColor_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CampaignHeroBannerFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CampaignHeroBannerFilter>>>;
};

export type CampaignHeroBannerLinkingCollections = {
  readonly __typename?: 'CampaignHeroBannerLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type CampaignHeroBannerLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CampaignHeroBannerLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum CampaignHeroBannerOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  AltTitleAsc = 'altTitle_ASC',
  AltTitleDesc = 'altTitle_DESC',
  IsSponsoredContentAsc = 'isSponsoredContent_ASC',
  IsSponsoredContentDesc = 'isSponsoredContent_DESC',
  FinishingDateAsc = 'finishingDate_ASC',
  FinishingDateDesc = 'finishingDate_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Category = Entry & {
  readonly __typename?: 'Category';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<CategoryLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly subcategoriesCollection?: Maybe<CategorySubcategoriesCollection>;
  readonly color?: Maybe<Color>;
  readonly image?: Maybe<Asset>;
  readonly slug?: Maybe<Scalars['String']>;
};


export type CategoryLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type CategoryTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategoryLevelArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategoryIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategorySubcategoriesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategorySlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type CategoryCollection = {
  readonly __typename?: 'CategoryCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Category>>;
};

export type CategoryCop = Entry & {
  readonly __typename?: 'CategoryCop';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<CategoryCopLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly linkedCategory?: Maybe<Category>;
  readonly linkedPromotionsCollection?: Maybe<CategoryCopLinkedPromotionsCollection>;
  readonly slug?: Maybe<Scalars['String']>;
};


export type CategoryCopLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type CategoryCopTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategoryCopLinkedCategoryArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryCopLinkedPromotionsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryCopSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type CategoryCopCollection = {
  readonly __typename?: 'CategoryCopCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<CategoryCop>>;
};

export type CategoryCopFilter = {
  readonly linkedCategory?: Maybe<CfCategoryNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly linkedCategory_exists?: Maybe<Scalars['Boolean']>;
  readonly linkedPromotionsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CategoryCopFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CategoryCopFilter>>>;
};

export type CategoryCopLinkedPromotionsCollection = {
  readonly __typename?: 'CategoryCopLinkedPromotionsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Promotion>>;
};

export type CategoryCopLinkingCollections = {
  readonly __typename?: 'CategoryCopLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type CategoryCopLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryCopLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum CategoryCopOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CategoryFilter = {
  readonly color?: Maybe<CfColorNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly level_exists?: Maybe<Scalars['Boolean']>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly level_not?: Maybe<Scalars['Int']>;
  readonly level_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly level_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly level_gt?: Maybe<Scalars['Int']>;
  readonly level_gte?: Maybe<Scalars['Int']>;
  readonly level_lt?: Maybe<Scalars['Int']>;
  readonly level_lte?: Maybe<Scalars['Int']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly subcategoriesCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly color_exists?: Maybe<Scalars['Boolean']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CategoryFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CategoryFilter>>>;
};

export type CategoryGrid = Entry & {
  readonly __typename?: 'CategoryGrid';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<CategoryGridLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly itemsCollection?: Maybe<CategoryGridItemsCollection>;
  readonly viewType?: Maybe<Scalars['String']>;
};


export type CategoryGridLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type CategoryGridTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategoryGridItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryGridViewTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type CategoryGridCollection = {
  readonly __typename?: 'CategoryGridCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<CategoryGrid>>;
};

export type CategoryGridFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly itemsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly viewType_exists?: Maybe<Scalars['Boolean']>;
  readonly viewType?: Maybe<Scalars['String']>;
  readonly viewType_not?: Maybe<Scalars['String']>;
  readonly viewType_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly viewType_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly viewType_contains?: Maybe<Scalars['String']>;
  readonly viewType_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CategoryGridFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CategoryGridFilter>>>;
};

export type CategoryGridItemsCollection = {
  readonly __typename?: 'CategoryGridItemsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<CategoryTile>>;
};

export type CategoryGridLinkingCollections = {
  readonly __typename?: 'CategoryGridLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type CategoryGridLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryGridLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum CategoryGridOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ViewTypeAsc = 'viewType_ASC',
  ViewTypeDesc = 'viewType_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CategoryLinkingCollections = {
  readonly __typename?: 'CategoryLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
  readonly categoryCopCollection?: Maybe<CategoryCopCollection>;
  readonly categoryCollection?: Maybe<CategoryCollection>;
  readonly promotionCollection?: Maybe<PromotionCollection>;
  readonly expertSignatureCollection?: Maybe<ExpertSignatureCollection>;
  readonly filterItemCollection?: Maybe<FilterItemCollection>;
};


export type CategoryLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsCategoryCopCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsPromotionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsExpertSignatureCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryLinkingCollectionsFilterItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum CategoryOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  LevelAsc = 'level_ASC',
  LevelDesc = 'level_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CategorySubcategoriesCollection = {
  readonly __typename?: 'CategorySubcategoriesCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Category>>;
};

export type CategoryTile = Entry & {
  readonly __typename?: 'CategoryTile';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<CategoryTileLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly color?: Maybe<Scalars['String']>;
  readonly imageAsset?: Maybe<Asset>;
  readonly url?: Maybe<Scalars['String']>;
  readonly titleColor?: Maybe<Color>;
};


export type CategoryTileLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type CategoryTileTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategoryTileColorArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategoryTileImageAssetArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryTileUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type CategoryTileTitleColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type CategoryTileCollection = {
  readonly __typename?: 'CategoryTileCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<CategoryTile>>;
};

export type CategoryTileFilter = {
  readonly titleColor?: Maybe<CfColorNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly color_exists?: Maybe<Scalars['Boolean']>;
  readonly color?: Maybe<Scalars['String']>;
  readonly color_not?: Maybe<Scalars['String']>;
  readonly color_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly color_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly color_contains?: Maybe<Scalars['String']>;
  readonly color_not_contains?: Maybe<Scalars['String']>;
  readonly imageAsset_exists?: Maybe<Scalars['Boolean']>;
  readonly url_exists?: Maybe<Scalars['Boolean']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly url_not?: Maybe<Scalars['String']>;
  readonly url_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_contains?: Maybe<Scalars['String']>;
  readonly url_not_contains?: Maybe<Scalars['String']>;
  readonly titleColor_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CategoryTileFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CategoryTileFilter>>>;
};

export type CategoryTileLinkingCollections = {
  readonly __typename?: 'CategoryTileLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly categoryGridCollection?: Maybe<CategoryGridCollection>;
};


export type CategoryTileLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type CategoryTileLinkingCollectionsCategoryGridCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum CategoryTileOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Color = Entry & {
  readonly __typename?: 'Color';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<ColorLinkingCollections>;
  readonly ref?: Maybe<Scalars['String']>;
};


export type ColorLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type ColorRefArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ColorCollection = {
  readonly __typename?: 'ColorCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Color>>;
};

export type ColorFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly ref_exists?: Maybe<Scalars['Boolean']>;
  readonly ref?: Maybe<Scalars['String']>;
  readonly ref_not?: Maybe<Scalars['String']>;
  readonly ref_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_contains?: Maybe<Scalars['String']>;
  readonly ref_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<ColorFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<ColorFilter>>>;
};

export type ColorLinkingCollections = {
  readonly __typename?: 'ColorLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly categoryCollection?: Maybe<CategoryCollection>;
  readonly promotionCollection?: Maybe<PromotionCollection>;
  readonly categoryTileCollection?: Maybe<CategoryTileCollection>;
  readonly contentBlockWithImageCollection?: Maybe<ContentBlockWithImageCollection>;
  readonly marketingTeaserCollection?: Maybe<MarketingTeaserCollection>;
  readonly campaignHeroBannerCollection?: Maybe<CampaignHeroBannerCollection>;
  readonly translationInfoLabelCollection?: Maybe<TranslationInfoLabelCollection>;
};


export type ColorLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ColorLinkingCollectionsCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ColorLinkingCollectionsPromotionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ColorLinkingCollectionsCategoryTileCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ColorLinkingCollectionsContentBlockWithImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ColorLinkingCollectionsMarketingTeaserCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ColorLinkingCollectionsCampaignHeroBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ColorLinkingCollectionsTranslationInfoLabelCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ColorOrder {
  RefAsc = 'ref_ASC',
  RefDesc = 'ref_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ContainerOfContentBlocks = Entry & {
  readonly __typename?: 'ContainerOfContentBlocks';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<ContainerOfContentBlocksLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly contentCollection?: Maybe<ContainerOfContentBlocksContentCollection>;
  readonly showTitle?: Maybe<Scalars['Boolean']>;
  readonly hasMargin?: Maybe<Scalars['Boolean']>;
};


export type ContainerOfContentBlocksLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type ContainerOfContentBlocksTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContainerOfContentBlocksContentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContainerOfContentBlocksShowTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContainerOfContentBlocksHasMarginArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ContainerOfContentBlocksCollection = {
  readonly __typename?: 'ContainerOfContentBlocksCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<ContainerOfContentBlocks>>;
};

export type ContainerOfContentBlocksContentCollection = {
  readonly __typename?: 'ContainerOfContentBlocksContentCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<ContainerOfContentBlocksContentItem>>;
};

export type ContainerOfContentBlocksContentItem = MarketingTeaser | Promotion;

export type ContainerOfContentBlocksFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly contentCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly showTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly showTitle?: Maybe<Scalars['Boolean']>;
  readonly showTitle_not?: Maybe<Scalars['Boolean']>;
  readonly hasMargin_exists?: Maybe<Scalars['Boolean']>;
  readonly hasMargin?: Maybe<Scalars['Boolean']>;
  readonly hasMargin_not?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<ContainerOfContentBlocksFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<ContainerOfContentBlocksFilter>>>;
};

export type ContainerOfContentBlocksLinkingCollections = {
  readonly __typename?: 'ContainerOfContentBlocksLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type ContainerOfContentBlocksLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContainerOfContentBlocksLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ContainerOfContentBlocksOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  HasMarginAsc = 'hasMargin_ASC',
  HasMarginDesc = 'hasMargin_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ContentBlockWithImage = Entry & {
  readonly __typename?: 'ContentBlockWithImage';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<ContentBlockWithImageLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly content?: Maybe<ContentBlockWithImageContent>;
  readonly image?: Maybe<Asset>;
  readonly cta?: Maybe<Link>;
  readonly textLink?: Maybe<Link>;
  readonly textColor?: Maybe<Color>;
  readonly header?: Maybe<Scalars['String']>;
  readonly imageSize?: Maybe<Scalars['String']>;
  readonly btnPosTablet?: Maybe<Scalars['String']>;
  readonly sponsored?: Maybe<Scalars['Boolean']>;
  readonly imageLeft?: Maybe<Scalars['Boolean']>;
  readonly bgColor?: Maybe<Color>;
  readonly typography?: Maybe<Scalars['String']>;
  readonly txtAlignMobile?: Maybe<Scalars['String']>;
  readonly showDesc?: Maybe<Scalars['Boolean']>;
  readonly btnType?: Maybe<Scalars['String']>;
  readonly btnWidthMobile?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type ContentBlockWithImageTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageContentArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageCtaArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageTextLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageTextColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageHeaderArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageImageSizeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageBtnPosTabletArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageSponsoredArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageImageLeftArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageBgColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageTypographyArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageTxtAlignMobileArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageShowDescArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageBtnTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageBtnWidthMobileArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ContentBlockWithImageCollection = {
  readonly __typename?: 'ContentBlockWithImageCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<ContentBlockWithImage>>;
};

export type ContentBlockWithImageContent = {
  readonly __typename?: 'ContentBlockWithImageContent';
  readonly json: Scalars['JSON'];
  readonly links: ContentBlockWithImageContentLinks;
};

export type ContentBlockWithImageContentAssets = {
  readonly __typename?: 'ContentBlockWithImageContentAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type ContentBlockWithImageContentEntries = {
  readonly __typename?: 'ContentBlockWithImageContentEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type ContentBlockWithImageContentLinks = {
  readonly __typename?: 'ContentBlockWithImageContentLinks';
  readonly entries: ContentBlockWithImageContentEntries;
  readonly assets: ContentBlockWithImageContentAssets;
};

export type ContentBlockWithImageFilter = {
  readonly cta?: Maybe<CfLinkNestedFilter>;
  readonly textLink?: Maybe<CfLinkNestedFilter>;
  readonly textColor?: Maybe<CfColorNestedFilter>;
  readonly bgColor?: Maybe<CfColorNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly content_exists?: Maybe<Scalars['Boolean']>;
  readonly content_contains?: Maybe<Scalars['String']>;
  readonly content_not_contains?: Maybe<Scalars['String']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly cta_exists?: Maybe<Scalars['Boolean']>;
  readonly textLink_exists?: Maybe<Scalars['Boolean']>;
  readonly textColor_exists?: Maybe<Scalars['Boolean']>;
  readonly header_exists?: Maybe<Scalars['Boolean']>;
  readonly header?: Maybe<Scalars['String']>;
  readonly header_not?: Maybe<Scalars['String']>;
  readonly header_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly header_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly header_contains?: Maybe<Scalars['String']>;
  readonly header_not_contains?: Maybe<Scalars['String']>;
  readonly imageSize_exists?: Maybe<Scalars['Boolean']>;
  readonly imageSize?: Maybe<Scalars['String']>;
  readonly imageSize_not?: Maybe<Scalars['String']>;
  readonly imageSize_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly imageSize_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly imageSize_contains?: Maybe<Scalars['String']>;
  readonly imageSize_not_contains?: Maybe<Scalars['String']>;
  readonly btnPosTablet_exists?: Maybe<Scalars['Boolean']>;
  readonly btnPosTablet?: Maybe<Scalars['String']>;
  readonly btnPosTablet_not?: Maybe<Scalars['String']>;
  readonly btnPosTablet_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly btnPosTablet_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly btnPosTablet_contains?: Maybe<Scalars['String']>;
  readonly btnPosTablet_not_contains?: Maybe<Scalars['String']>;
  readonly sponsored_exists?: Maybe<Scalars['Boolean']>;
  readonly sponsored?: Maybe<Scalars['Boolean']>;
  readonly sponsored_not?: Maybe<Scalars['Boolean']>;
  readonly imageLeft_exists?: Maybe<Scalars['Boolean']>;
  readonly imageLeft?: Maybe<Scalars['Boolean']>;
  readonly imageLeft_not?: Maybe<Scalars['Boolean']>;
  readonly bgColor_exists?: Maybe<Scalars['Boolean']>;
  readonly typography_exists?: Maybe<Scalars['Boolean']>;
  readonly typography?: Maybe<Scalars['String']>;
  readonly typography_not?: Maybe<Scalars['String']>;
  readonly typography_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly typography_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly typography_contains?: Maybe<Scalars['String']>;
  readonly typography_not_contains?: Maybe<Scalars['String']>;
  readonly txtAlignMobile_exists?: Maybe<Scalars['Boolean']>;
  readonly txtAlignMobile?: Maybe<Scalars['String']>;
  readonly txtAlignMobile_not?: Maybe<Scalars['String']>;
  readonly txtAlignMobile_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly txtAlignMobile_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly txtAlignMobile_contains?: Maybe<Scalars['String']>;
  readonly txtAlignMobile_not_contains?: Maybe<Scalars['String']>;
  readonly showDesc_exists?: Maybe<Scalars['Boolean']>;
  readonly showDesc?: Maybe<Scalars['Boolean']>;
  readonly showDesc_not?: Maybe<Scalars['Boolean']>;
  readonly btnType_exists?: Maybe<Scalars['Boolean']>;
  readonly btnType?: Maybe<Scalars['String']>;
  readonly btnType_not?: Maybe<Scalars['String']>;
  readonly btnType_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly btnType_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly btnType_contains?: Maybe<Scalars['String']>;
  readonly btnType_not_contains?: Maybe<Scalars['String']>;
  readonly btnWidthMobile_exists?: Maybe<Scalars['Boolean']>;
  readonly btnWidthMobile?: Maybe<Scalars['String']>;
  readonly btnWidthMobile_not?: Maybe<Scalars['String']>;
  readonly btnWidthMobile_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly btnWidthMobile_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly btnWidthMobile_contains?: Maybe<Scalars['String']>;
  readonly btnWidthMobile_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<ContentBlockWithImageFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<ContentBlockWithImageFilter>>>;
};

export type ContentBlockWithImageLinkingCollections = {
  readonly __typename?: 'ContentBlockWithImageLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
  readonly groupOfStaticContentBlocksCollection?: Maybe<GroupOfStaticContentBlocksCollection>;
};


export type ContentBlockWithImageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentBlockWithImageLinkingCollectionsGroupOfStaticContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ContentBlockWithImageOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  HeaderAsc = 'header_ASC',
  HeaderDesc = 'header_DESC',
  ImageSizeAsc = 'imageSize_ASC',
  ImageSizeDesc = 'imageSize_DESC',
  BtnPosTabletAsc = 'btnPosTablet_ASC',
  BtnPosTabletDesc = 'btnPosTablet_DESC',
  SponsoredAsc = 'sponsored_ASC',
  SponsoredDesc = 'sponsored_DESC',
  ImageLeftAsc = 'imageLeft_ASC',
  ImageLeftDesc = 'imageLeft_DESC',
  TypographyAsc = 'typography_ASC',
  TypographyDesc = 'typography_DESC',
  TxtAlignMobileAsc = 'txtAlignMobile_ASC',
  TxtAlignMobileDesc = 'txtAlignMobile_DESC',
  ShowDescAsc = 'showDesc_ASC',
  ShowDescDesc = 'showDesc_DESC',
  BtnTypeAsc = 'btnType_ASC',
  BtnTypeDesc = 'btnType_DESC',
  BtnWidthMobileAsc = 'btnWidthMobile_ASC',
  BtnWidthMobileDesc = 'btnWidthMobile_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ContentfulMetadata = {
  readonly __typename?: 'ContentfulMetadata';
  readonly tags: ReadonlyArray<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  readonly tags_exists?: Maybe<Scalars['Boolean']>;
  readonly tags?: Maybe<ContentfulMetadataTagsFilter>;
};

export type ContentfulMetadataTagsFilter = {
  readonly id_contains_all?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains_some?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains_none?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};

export type ContentfulTag = {
  readonly __typename?: 'ContentfulTag';
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};


export type DeliverySteps = Entry & {
  readonly __typename?: 'DeliverySteps';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<DeliveryStepsLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly text?: Maybe<DeliveryStepsText>;
  readonly subtext?: Maybe<DeliveryStepsSubtext>;
  readonly icon?: Maybe<Icon>;
};


export type DeliveryStepsLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type DeliveryStepsTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type DeliveryStepsTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type DeliveryStepsSubtextArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type DeliveryStepsIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type DeliveryStepsCollection = {
  readonly __typename?: 'DeliveryStepsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<DeliverySteps>>;
};

export type DeliveryStepsFilter = {
  readonly icon?: Maybe<CfIconNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly text_exists?: Maybe<Scalars['Boolean']>;
  readonly text_contains?: Maybe<Scalars['String']>;
  readonly text_not_contains?: Maybe<Scalars['String']>;
  readonly subtext_exists?: Maybe<Scalars['Boolean']>;
  readonly subtext_contains?: Maybe<Scalars['String']>;
  readonly subtext_not_contains?: Maybe<Scalars['String']>;
  readonly icon_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<DeliveryStepsFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<DeliveryStepsFilter>>>;
};

export type DeliveryStepsLinkingCollections = {
  readonly __typename?: 'DeliveryStepsLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type DeliveryStepsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum DeliveryStepsOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type DeliveryStepsSubtext = {
  readonly __typename?: 'DeliveryStepsSubtext';
  readonly json: Scalars['JSON'];
  readonly links: DeliveryStepsSubtextLinks;
};

export type DeliveryStepsSubtextAssets = {
  readonly __typename?: 'DeliveryStepsSubtextAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type DeliveryStepsSubtextEntries = {
  readonly __typename?: 'DeliveryStepsSubtextEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type DeliveryStepsSubtextLinks = {
  readonly __typename?: 'DeliveryStepsSubtextLinks';
  readonly entries: DeliveryStepsSubtextEntries;
  readonly assets: DeliveryStepsSubtextAssets;
};

export type DeliveryStepsText = {
  readonly __typename?: 'DeliveryStepsText';
  readonly json: Scalars['JSON'];
  readonly links: DeliveryStepsTextLinks;
};

export type DeliveryStepsTextAssets = {
  readonly __typename?: 'DeliveryStepsTextAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type DeliveryStepsTextEntries = {
  readonly __typename?: 'DeliveryStepsTextEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type DeliveryStepsTextLinks = {
  readonly __typename?: 'DeliveryStepsTextLinks';
  readonly entries: DeliveryStepsTextEntries;
  readonly assets: DeliveryStepsTextAssets;
};


export type Entry = {
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
};

export type EntryCollection = {
  readonly __typename?: 'EntryCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Entry>>;
};

export type EntryFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<EntryFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<EntryFilter>>>;
};

export enum EntryOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ExpertSignature = Entry & {
  readonly __typename?: 'ExpertSignature';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<ExpertSignatureLinkingCollections>;
  readonly categories?: Maybe<Category>;
  readonly image?: Maybe<Asset>;
  readonly name?: Maybe<Scalars['String']>;
  readonly jobTitle?: Maybe<Scalars['String']>;
  readonly jobDescription?: Maybe<Scalars['String']>;
};


export type ExpertSignatureLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type ExpertSignatureCategoriesArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ExpertSignatureImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ExpertSignatureNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExpertSignatureJobTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExpertSignatureJobDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ExpertSignatureCollection = {
  readonly __typename?: 'ExpertSignatureCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<ExpertSignature>>;
};

export type ExpertSignatureFilter = {
  readonly categories?: Maybe<CfCategoryNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly categories_exists?: Maybe<Scalars['Boolean']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly name_exists?: Maybe<Scalars['Boolean']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly name_not?: Maybe<Scalars['String']>;
  readonly name_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly name_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly name_contains?: Maybe<Scalars['String']>;
  readonly name_not_contains?: Maybe<Scalars['String']>;
  readonly jobTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly jobTitle?: Maybe<Scalars['String']>;
  readonly jobTitle_not?: Maybe<Scalars['String']>;
  readonly jobTitle_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly jobTitle_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly jobTitle_contains?: Maybe<Scalars['String']>;
  readonly jobTitle_not_contains?: Maybe<Scalars['String']>;
  readonly jobDescription_exists?: Maybe<Scalars['Boolean']>;
  readonly jobDescription?: Maybe<Scalars['String']>;
  readonly jobDescription_not?: Maybe<Scalars['String']>;
  readonly jobDescription_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly jobDescription_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly jobDescription_contains?: Maybe<Scalars['String']>;
  readonly jobDescription_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<ExpertSignatureFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<ExpertSignatureFilter>>>;
};

export type ExpertSignatureLinkingCollections = {
  readonly __typename?: 'ExpertSignatureLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type ExpertSignatureLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ExpertSignatureLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ExpertSignatureOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  JobTitleAsc = 'jobTitle_ASC',
  JobTitleDesc = 'jobTitle_DESC',
  JobDescriptionAsc = 'jobDescription_ASC',
  JobDescriptionDesc = 'jobDescription_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ExponeaRecommendation = Entry & {
  readonly __typename?: 'ExponeaRecommendation';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<ExponeaRecommendationLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly shouldDisplayTitle?: Maybe<Scalars['Boolean']>;
  readonly altTitle?: Maybe<Scalars['String']>;
  readonly type?: Maybe<Scalars['String']>;
  readonly quantity?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly isSlider?: Maybe<Scalars['Boolean']>;
};


export type ExponeaRecommendationLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type ExponeaRecommendationTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExponeaRecommendationShouldDisplayTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExponeaRecommendationAltTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExponeaRecommendationTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExponeaRecommendationQuantityArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExponeaRecommendationIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type ExponeaRecommendationIsSliderArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ExponeaRecommendationCollection = {
  readonly __typename?: 'ExponeaRecommendationCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<ExponeaRecommendation>>;
};

export type ExponeaRecommendationFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly shouldDisplayTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly shouldDisplayTitle?: Maybe<Scalars['Boolean']>;
  readonly shouldDisplayTitle_not?: Maybe<Scalars['Boolean']>;
  readonly altTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly altTitle?: Maybe<Scalars['String']>;
  readonly altTitle_not?: Maybe<Scalars['String']>;
  readonly altTitle_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly altTitle_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly altTitle_contains?: Maybe<Scalars['String']>;
  readonly altTitle_not_contains?: Maybe<Scalars['String']>;
  readonly type_exists?: Maybe<Scalars['Boolean']>;
  readonly type?: Maybe<Scalars['String']>;
  readonly type_not?: Maybe<Scalars['String']>;
  readonly type_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly type_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly type_contains?: Maybe<Scalars['String']>;
  readonly type_not_contains?: Maybe<Scalars['String']>;
  readonly quantity_exists?: Maybe<Scalars['Boolean']>;
  readonly quantity?: Maybe<Scalars['String']>;
  readonly quantity_not?: Maybe<Scalars['String']>;
  readonly quantity_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly quantity_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly quantity_contains?: Maybe<Scalars['String']>;
  readonly quantity_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly isSlider_exists?: Maybe<Scalars['Boolean']>;
  readonly isSlider?: Maybe<Scalars['Boolean']>;
  readonly isSlider_not?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<ExponeaRecommendationFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<ExponeaRecommendationFilter>>>;
};

export type ExponeaRecommendationLinkingCollections = {
  readonly __typename?: 'ExponeaRecommendationLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type ExponeaRecommendationLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ExponeaRecommendationLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ExponeaRecommendationOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ShouldDisplayTitleAsc = 'shouldDisplayTitle_ASC',
  ShouldDisplayTitleDesc = 'shouldDisplayTitle_DESC',
  AltTitleAsc = 'altTitle_ASC',
  AltTitleDesc = 'altTitle_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  QuantityAsc = 'quantity_ASC',
  QuantityDesc = 'quantity_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsSliderAsc = 'isSlider_ASC',
  IsSliderDesc = 'isSlider_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type FilterCollection = Entry & {
  readonly __typename?: 'FilterCollection';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<FilterCollectionLinkingCollections>;
  readonly filterCollectionName?: Maybe<Scalars['String']>;
  readonly filterItemsCollection?: Maybe<FilterCollectionFilterItemsCollection>;
};


export type FilterCollectionLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type FilterCollectionFilterCollectionNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type FilterCollectionFilterItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FilterCollectionCollection = {
  readonly __typename?: 'FilterCollectionCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<FilterCollection>>;
};

export type FilterCollectionFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly filterCollectionName_exists?: Maybe<Scalars['Boolean']>;
  readonly filterCollectionName?: Maybe<Scalars['String']>;
  readonly filterCollectionName_not?: Maybe<Scalars['String']>;
  readonly filterCollectionName_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly filterCollectionName_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly filterCollectionName_contains?: Maybe<Scalars['String']>;
  readonly filterCollectionName_not_contains?: Maybe<Scalars['String']>;
  readonly filterItemsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<FilterCollectionFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<FilterCollectionFilter>>>;
};

export type FilterCollectionFilterItemsCollection = {
  readonly __typename?: 'FilterCollectionFilterItemsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<FilterItem>>;
};

export type FilterCollectionLinkingCollections = {
  readonly __typename?: 'FilterCollectionLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly filterPageTypeCollection?: Maybe<FilterPageTypeCollection>;
};


export type FilterCollectionLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FilterCollectionLinkingCollectionsFilterPageTypeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum FilterCollectionOrder {
  FilterCollectionNameAsc = 'filterCollectionName_ASC',
  FilterCollectionNameDesc = 'filterCollectionName_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type FilterItem = Entry & {
  readonly __typename?: 'FilterItem';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<FilterItemLinkingCollections>;
  readonly filterItemName?: Maybe<Scalars['String']>;
  readonly itemToFilterBy?: Maybe<FilterItemItemToFilterBy>;
};


export type FilterItemLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type FilterItemFilterItemNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type FilterItemItemToFilterByArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FilterItemCollection = {
  readonly __typename?: 'FilterItemCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<FilterItem>>;
};

export type FilterItemFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly filterItemName_exists?: Maybe<Scalars['Boolean']>;
  readonly filterItemName?: Maybe<Scalars['String']>;
  readonly filterItemName_not?: Maybe<Scalars['String']>;
  readonly filterItemName_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly filterItemName_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly filterItemName_contains?: Maybe<Scalars['String']>;
  readonly filterItemName_not_contains?: Maybe<Scalars['String']>;
  readonly itemToFilterBy_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<FilterItemFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<FilterItemFilter>>>;
};

export type FilterItemItemToFilterBy = Category | Translation | TranslationInfoLabel;

export type FilterItemLinkingCollections = {
  readonly __typename?: 'FilterItemLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly filterCollectionCollection?: Maybe<FilterCollectionCollection>;
};


export type FilterItemLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FilterItemLinkingCollectionsFilterCollectionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum FilterItemOrder {
  FilterItemNameAsc = 'filterItemName_ASC',
  FilterItemNameDesc = 'filterItemName_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type FilterPageType = Entry & {
  readonly __typename?: 'FilterPageType';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<FilterPageTypeLinkingCollections>;
  readonly pageTypeName?: Maybe<Scalars['String']>;
  readonly pageSlug?: Maybe<Scalars['String']>;
  readonly pageFiltersCollection?: Maybe<FilterPageTypePageFiltersCollection>;
};


export type FilterPageTypeLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type FilterPageTypePageTypeNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type FilterPageTypePageSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type FilterPageTypePageFiltersCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FilterPageTypeCollection = {
  readonly __typename?: 'FilterPageTypeCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<FilterPageType>>;
};

export type FilterPageTypeFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly pageTypeName_exists?: Maybe<Scalars['Boolean']>;
  readonly pageTypeName?: Maybe<Scalars['String']>;
  readonly pageTypeName_not?: Maybe<Scalars['String']>;
  readonly pageTypeName_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageTypeName_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageTypeName_contains?: Maybe<Scalars['String']>;
  readonly pageTypeName_not_contains?: Maybe<Scalars['String']>;
  readonly pageSlug_exists?: Maybe<Scalars['Boolean']>;
  readonly pageSlug?: Maybe<Scalars['String']>;
  readonly pageSlug_not?: Maybe<Scalars['String']>;
  readonly pageSlug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageSlug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageSlug_contains?: Maybe<Scalars['String']>;
  readonly pageSlug_not_contains?: Maybe<Scalars['String']>;
  readonly pageFiltersCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<FilterPageTypeFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<FilterPageTypeFilter>>>;
};

export type FilterPageTypeLinkingCollections = {
  readonly __typename?: 'FilterPageTypeLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type FilterPageTypeLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum FilterPageTypeOrder {
  PageTypeNameAsc = 'pageTypeName_ASC',
  PageTypeNameDesc = 'pageTypeName_DESC',
  PageSlugAsc = 'pageSlug_ASC',
  PageSlugDesc = 'pageSlug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type FilterPageTypePageFiltersCollection = {
  readonly __typename?: 'FilterPageTypePageFiltersCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<FilterCollection>>;
};

export type FooterProvidersBlock = Entry & {
  readonly __typename?: 'FooterProvidersBlock';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<FooterProvidersBlockLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly content?: Maybe<FooterProvidersBlockContent>;
  readonly iconsCollection?: Maybe<FooterProvidersBlockIconsCollection>;
  readonly linksCollection?: Maybe<FooterProvidersBlockLinksCollection>;
};


export type FooterProvidersBlockLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type FooterProvidersBlockTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type FooterProvidersBlockContentArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type FooterProvidersBlockIconsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterProvidersBlockLinksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FooterProvidersBlockCollection = {
  readonly __typename?: 'FooterProvidersBlockCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<FooterProvidersBlock>>;
};

export type FooterProvidersBlockContent = {
  readonly __typename?: 'FooterProvidersBlockContent';
  readonly json: Scalars['JSON'];
  readonly links: FooterProvidersBlockContentLinks;
};

export type FooterProvidersBlockContentAssets = {
  readonly __typename?: 'FooterProvidersBlockContentAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type FooterProvidersBlockContentEntries = {
  readonly __typename?: 'FooterProvidersBlockContentEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type FooterProvidersBlockContentLinks = {
  readonly __typename?: 'FooterProvidersBlockContentLinks';
  readonly entries: FooterProvidersBlockContentEntries;
  readonly assets: FooterProvidersBlockContentAssets;
};

export type FooterProvidersBlockFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly content_exists?: Maybe<Scalars['Boolean']>;
  readonly content_contains?: Maybe<Scalars['String']>;
  readonly content_not_contains?: Maybe<Scalars['String']>;
  readonly iconsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly linksCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<FooterProvidersBlockFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<FooterProvidersBlockFilter>>>;
};

export type FooterProvidersBlockIconsCollection = {
  readonly __typename?: 'FooterProvidersBlockIconsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Icon>>;
};

export type FooterProvidersBlockLinkingCollections = {
  readonly __typename?: 'FooterProvidersBlockLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageFooterCollection?: Maybe<PageFooterCollection>;
};


export type FooterProvidersBlockLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterProvidersBlockLinkingCollectionsPageFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FooterProvidersBlockLinksCollection = {
  readonly __typename?: 'FooterProvidersBlockLinksCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Link>>;
};

export enum FooterProvidersBlockOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type GroupOfStaticContentBlocks = Entry & {
  readonly __typename?: 'GroupOfStaticContentBlocks';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<GroupOfStaticContentBlocksLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly staticContentBlocksCollection?: Maybe<GroupOfStaticContentBlocksStaticContentBlocksCollection>;
  readonly type?: Maybe<Scalars['String']>;
};


export type GroupOfStaticContentBlocksLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type GroupOfStaticContentBlocksTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type GroupOfStaticContentBlocksStaticContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type GroupOfStaticContentBlocksTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type GroupOfStaticContentBlocksCollection = {
  readonly __typename?: 'GroupOfStaticContentBlocksCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<GroupOfStaticContentBlocks>>;
};

export type GroupOfStaticContentBlocksFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly staticContentBlocksCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly type_exists?: Maybe<Scalars['Boolean']>;
  readonly type?: Maybe<Scalars['String']>;
  readonly type_not?: Maybe<Scalars['String']>;
  readonly type_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly type_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly type_contains?: Maybe<Scalars['String']>;
  readonly type_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<GroupOfStaticContentBlocksFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<GroupOfStaticContentBlocksFilter>>>;
};

export type GroupOfStaticContentBlocksLinkingCollections = {
  readonly __typename?: 'GroupOfStaticContentBlocksLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type GroupOfStaticContentBlocksLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type GroupOfStaticContentBlocksLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum GroupOfStaticContentBlocksOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type GroupOfStaticContentBlocksStaticContentBlocksCollection = {
  readonly __typename?: 'GroupOfStaticContentBlocksStaticContentBlocksCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<GroupOfStaticContentBlocksStaticContentBlocksItem>>;
};

export type GroupOfStaticContentBlocksStaticContentBlocksItem = StaticContentBlock | ContentBlockWithImage;

export type HeroBanner = Entry & {
  readonly __typename?: 'HeroBanner';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<HeroBannerLinkingCollections>;
  readonly newTitle?: Maybe<Scalars['String']>;
  readonly searchPlaceholder?: Maybe<Scalars['String']>;
  readonly isSponsoredContent?: Maybe<Scalars['Boolean']>;
  readonly imageAsset?: Maybe<Asset>;
  readonly link?: Maybe<Link>;
  readonly text?: Maybe<HeroBannerText>;
  readonly id?: Maybe<Scalars['String']>;
};


export type HeroBannerLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type HeroBannerNewTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerSearchPlaceholderArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerIsSponsoredContentArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerImageAssetArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerIdArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type HeroBannerCollection = {
  readonly __typename?: 'HeroBannerCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<HeroBanner>>;
};

export type HeroBannerFilter = {
  readonly link?: Maybe<CfLinkNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly newTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly newTitle?: Maybe<Scalars['String']>;
  readonly newTitle_not?: Maybe<Scalars['String']>;
  readonly newTitle_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly newTitle_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly newTitle_contains?: Maybe<Scalars['String']>;
  readonly newTitle_not_contains?: Maybe<Scalars['String']>;
  readonly searchPlaceholder_exists?: Maybe<Scalars['Boolean']>;
  readonly searchPlaceholder?: Maybe<Scalars['String']>;
  readonly searchPlaceholder_not?: Maybe<Scalars['String']>;
  readonly searchPlaceholder_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly searchPlaceholder_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly searchPlaceholder_contains?: Maybe<Scalars['String']>;
  readonly searchPlaceholder_not_contains?: Maybe<Scalars['String']>;
  readonly isSponsoredContent_exists?: Maybe<Scalars['Boolean']>;
  readonly isSponsoredContent?: Maybe<Scalars['Boolean']>;
  readonly isSponsoredContent_not?: Maybe<Scalars['Boolean']>;
  readonly imageAsset_exists?: Maybe<Scalars['Boolean']>;
  readonly link_exists?: Maybe<Scalars['Boolean']>;
  readonly text_exists?: Maybe<Scalars['Boolean']>;
  readonly text_contains?: Maybe<Scalars['String']>;
  readonly text_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<HeroBannerFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<HeroBannerFilter>>>;
};

export type HeroBannerLinkingCollections = {
  readonly __typename?: 'HeroBannerLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
  readonly sliderCollection?: Maybe<SliderCollection>;
};


export type HeroBannerLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type HeroBannerLinkingCollectionsSliderCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum HeroBannerOrder {
  NewTitleAsc = 'newTitle_ASC',
  NewTitleDesc = 'newTitle_DESC',
  SearchPlaceholderAsc = 'searchPlaceholder_ASC',
  SearchPlaceholderDesc = 'searchPlaceholder_DESC',
  IsSponsoredContentAsc = 'isSponsoredContent_ASC',
  IsSponsoredContentDesc = 'isSponsoredContent_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type HeroBannerText = {
  readonly __typename?: 'HeroBannerText';
  readonly json: Scalars['JSON'];
  readonly links: HeroBannerTextLinks;
};

export type HeroBannerTextAssets = {
  readonly __typename?: 'HeroBannerTextAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type HeroBannerTextEntries = {
  readonly __typename?: 'HeroBannerTextEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type HeroBannerTextLinks = {
  readonly __typename?: 'HeroBannerTextLinks';
  readonly entries: HeroBannerTextEntries;
  readonly assets: HeroBannerTextAssets;
};


export type Icon = Entry & {
  readonly __typename?: 'Icon';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<IconLinkingCollections>;
  readonly ref?: Maybe<Scalars['String']>;
};


export type IconLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type IconRefArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type IconCollection = {
  readonly __typename?: 'IconCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Icon>>;
};

export type IconFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly ref_exists?: Maybe<Scalars['Boolean']>;
  readonly ref?: Maybe<Scalars['String']>;
  readonly ref_not?: Maybe<Scalars['String']>;
  readonly ref_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_contains?: Maybe<Scalars['String']>;
  readonly ref_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<IconFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<IconFilter>>>;
};

export type IconLinkingCollections = {
  readonly __typename?: 'IconLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly voucherCodeCollection?: Maybe<VoucherCodeCollection>;
  readonly uspCollection?: Maybe<UspCollection>;
  readonly staticContentBlockCollection?: Maybe<StaticContentBlockCollection>;
  readonly footerProvidersBlockCollection?: Maybe<FooterProvidersBlockCollection>;
  readonly deliveryStepsCollection?: Maybe<DeliveryStepsCollection>;
  readonly translationInfoLabelCollection?: Maybe<TranslationInfoLabelCollection>;
  readonly linkCollection?: Maybe<LinkCollection>;
};


export type IconLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconLinkingCollectionsVoucherCodeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconLinkingCollectionsUspCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconLinkingCollectionsStaticContentBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconLinkingCollectionsFooterProvidersBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconLinkingCollectionsDeliveryStepsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconLinkingCollectionsTranslationInfoLabelCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconLinkingCollectionsLinkCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum IconOrder {
  RefAsc = 'ref_ASC',
  RefDesc = 'ref_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Jpg = 'JPG',
  JpgProgressive = 'JPG_PROGRESSIVE',
  Png = 'PNG',
  Png8 = 'PNG8',
  Webp = 'WEBP',
  Avif = 'AVIF'
}

export enum ImageResizeFocus {
  Center = 'CENTER',
  Top = 'TOP',
  TopRight = 'TOP_RIGHT',
  Right = 'RIGHT',
  BottomRight = 'BOTTOM_RIGHT',
  Bottom = 'BOTTOM',
  BottomLeft = 'BOTTOM_LEFT',
  Left = 'LEFT',
  TopLeft = 'TOP_LEFT',
  Face = 'FACE',
  Faces = 'FACES'
}

export enum ImageResizeStrategy {
  Fit = 'FIT',
  Pad = 'PAD',
  Fill = 'FILL',
  Scale = 'SCALE',
  Crop = 'CROP',
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  readonly width?: Maybe<Scalars['Dimension']>;
  readonly height?: Maybe<Scalars['Dimension']>;
  readonly quality?: Maybe<Scalars['Quality']>;
  readonly cornerRadius?: Maybe<Scalars['Int']>;
  readonly resizeStrategy?: Maybe<ImageResizeStrategy>;
  readonly resizeFocus?: Maybe<ImageResizeFocus>;
  readonly backgroundColor?: Maybe<Scalars['HexColor']>;
  readonly format?: Maybe<ImageFormat>;
};


export type Link = Entry & {
  readonly __typename?: 'Link';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<LinkLinkingCollections>;
  readonly label?: Maybe<Scalars['String']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly icon?: Maybe<Icon>;
  readonly content?: Maybe<LinkContent>;
};


export type LinkLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type LinkLabelArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type LinkUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type LinkIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkContentArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type LinkBlock = Entry & {
  readonly __typename?: 'LinkBlock';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<LinkBlockLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly link?: Maybe<Link>;
  readonly isCta?: Maybe<Scalars['Boolean']>;
};


export type LinkBlockLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type LinkBlockTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type LinkBlockLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkBlockIsCtaArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type LinkBlockCollection = {
  readonly __typename?: 'LinkBlockCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<LinkBlock>>;
};

export type LinkBlockFilter = {
  readonly link?: Maybe<CfLinkNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly link_exists?: Maybe<Scalars['Boolean']>;
  readonly isCTA_exists?: Maybe<Scalars['Boolean']>;
  readonly isCTA?: Maybe<Scalars['Boolean']>;
  readonly isCTA_not?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<LinkBlockFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<LinkBlockFilter>>>;
};

export type LinkBlockLinkingCollections = {
  readonly __typename?: 'LinkBlockLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type LinkBlockLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkBlockLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum LinkBlockOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  IsCtaAsc = 'isCTA_ASC',
  IsCtaDesc = 'isCTA_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type LinkCollection = {
  readonly __typename?: 'LinkCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Link>>;
};

export type LinkContent = {
  readonly __typename?: 'LinkContent';
  readonly json: Scalars['JSON'];
  readonly links: LinkContentLinks;
};

export type LinkContentAssets = {
  readonly __typename?: 'LinkContentAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type LinkContentEntries = {
  readonly __typename?: 'LinkContentEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type LinkContentLinks = {
  readonly __typename?: 'LinkContentLinks';
  readonly entries: LinkContentEntries;
  readonly assets: LinkContentAssets;
};

export type LinkFilter = {
  readonly icon?: Maybe<CfIconNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly label_exists?: Maybe<Scalars['Boolean']>;
  readonly label?: Maybe<Scalars['String']>;
  readonly label_not?: Maybe<Scalars['String']>;
  readonly label_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly label_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly label_contains?: Maybe<Scalars['String']>;
  readonly label_not_contains?: Maybe<Scalars['String']>;
  readonly url_exists?: Maybe<Scalars['Boolean']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly url_not?: Maybe<Scalars['String']>;
  readonly url_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_contains?: Maybe<Scalars['String']>;
  readonly url_not_contains?: Maybe<Scalars['String']>;
  readonly icon_exists?: Maybe<Scalars['Boolean']>;
  readonly content_exists?: Maybe<Scalars['Boolean']>;
  readonly content_contains?: Maybe<Scalars['String']>;
  readonly content_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<LinkFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<LinkFilter>>>;
};

export type LinkLinkingCollections = {
  readonly __typename?: 'LinkLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageRedirectCollection?: Maybe<PageRedirectCollection>;
  readonly heroBannerCollection?: Maybe<HeroBannerCollection>;
  readonly contentBlockWithImageCollection?: Maybe<ContentBlockWithImageCollection>;
  readonly menuItemCollection?: Maybe<MenuItemCollection>;
  readonly linkBlockCollection?: Maybe<LinkBlockCollection>;
  readonly footerProvidersBlockCollection?: Maybe<FooterProvidersBlockCollection>;
};


export type LinkLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkLinkingCollectionsPageRedirectCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkLinkingCollectionsHeroBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkLinkingCollectionsContentBlockWithImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkLinkingCollectionsMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkLinkingCollectionsLinkBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type LinkLinkingCollectionsFooterProvidersBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum LinkOrder {
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type MarketingTeaser = Entry & {
  readonly __typename?: 'MarketingTeaser';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<MarketingTeaserLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly teaserDescription?: Maybe<Scalars['String']>;
  readonly logo?: Maybe<Asset>;
  readonly image?: Maybe<Asset>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly sponsored?: Maybe<Scalars['Boolean']>;
  readonly text?: Maybe<Scalars['String']>;
  readonly color?: Maybe<Color>;
  readonly fullWidth?: Maybe<Scalars['Boolean']>;
  readonly bgColor?: Maybe<Color>;
  readonly button?: Maybe<Scalars['Boolean']>;
};


export type MarketingTeaserLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type MarketingTeaserTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserTeaserDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserLogoArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserSponsoredArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserFullWidthArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserBgColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserButtonArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type MarketingTeaserCollection = {
  readonly __typename?: 'MarketingTeaserCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<MarketingTeaser>>;
};

export type MarketingTeaserFilter = {
  readonly color?: Maybe<CfColorNestedFilter>;
  readonly bgColor?: Maybe<CfColorNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly teaserDescription_exists?: Maybe<Scalars['Boolean']>;
  readonly teaserDescription?: Maybe<Scalars['String']>;
  readonly teaserDescription_not?: Maybe<Scalars['String']>;
  readonly teaserDescription_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly teaserDescription_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly teaserDescription_contains?: Maybe<Scalars['String']>;
  readonly teaserDescription_not_contains?: Maybe<Scalars['String']>;
  readonly logo_exists?: Maybe<Scalars['Boolean']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly sponsored_exists?: Maybe<Scalars['Boolean']>;
  readonly sponsored?: Maybe<Scalars['Boolean']>;
  readonly sponsored_not?: Maybe<Scalars['Boolean']>;
  readonly text_exists?: Maybe<Scalars['Boolean']>;
  readonly text?: Maybe<Scalars['String']>;
  readonly text_not?: Maybe<Scalars['String']>;
  readonly text_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly text_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly text_contains?: Maybe<Scalars['String']>;
  readonly text_not_contains?: Maybe<Scalars['String']>;
  readonly color_exists?: Maybe<Scalars['Boolean']>;
  readonly fullWidth_exists?: Maybe<Scalars['Boolean']>;
  readonly fullWidth?: Maybe<Scalars['Boolean']>;
  readonly fullWidth_not?: Maybe<Scalars['Boolean']>;
  readonly bgColor_exists?: Maybe<Scalars['Boolean']>;
  readonly button_exists?: Maybe<Scalars['Boolean']>;
  readonly button?: Maybe<Scalars['Boolean']>;
  readonly button_not?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<MarketingTeaserFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<MarketingTeaserFilter>>>;
};

export type MarketingTeaserLinkingCollections = {
  readonly __typename?: 'MarketingTeaserLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly containerOfContentBlocksCollection?: Maybe<ContainerOfContentBlocksCollection>;
};


export type MarketingTeaserLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MarketingTeaserLinkingCollectionsContainerOfContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum MarketingTeaserOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TeaserDescriptionAsc = 'teaserDescription_ASC',
  TeaserDescriptionDesc = 'teaserDescription_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SponsoredAsc = 'sponsored_ASC',
  SponsoredDesc = 'sponsored_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  FullWidthAsc = 'fullWidth_ASC',
  FullWidthDesc = 'fullWidth_DESC',
  ButtonAsc = 'button_ASC',
  ButtonDesc = 'button_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Media = Entry & {
  readonly __typename?: 'Media';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<MediaLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly alt?: Maybe<Scalars['String']>;
  readonly asset?: Maybe<Asset>;
};


export type MediaLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type MediaTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MediaAltArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MediaAssetArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type MediaCollection = {
  readonly __typename?: 'MediaCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Media>>;
};

export type MediaFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly alt_exists?: Maybe<Scalars['Boolean']>;
  readonly alt?: Maybe<Scalars['String']>;
  readonly alt_not?: Maybe<Scalars['String']>;
  readonly alt_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly alt_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly alt_contains?: Maybe<Scalars['String']>;
  readonly alt_not_contains?: Maybe<Scalars['String']>;
  readonly asset_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<MediaFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<MediaFilter>>>;
};

export type MediaLinkingCollections = {
  readonly __typename?: 'MediaLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type MediaLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum MediaOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  AltAsc = 'alt_ASC',
  AltDesc = 'alt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Menu = Entry & {
  readonly __typename?: 'Menu';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<MenuLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly itemsCollection?: Maybe<MenuItemsCollection>;
  readonly id?: Maybe<Scalars['String']>;
};


export type MenuLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type MenuTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MenuItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MenuIdArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type MenuCollection = {
  readonly __typename?: 'MenuCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Menu>>;
};

export type MenuFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly itemsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<MenuFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<MenuFilter>>>;
};

export type MenuItem = Entry & {
  readonly __typename?: 'MenuItem';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<MenuItemLinkingCollections>;
  readonly id?: Maybe<Scalars['String']>;
  readonly link?: Maybe<MenuItemLink>;
  readonly submenu?: Maybe<Menu>;
  readonly title?: Maybe<Scalars['String']>;
};


export type MenuItemLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type MenuItemIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MenuItemLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MenuItemSubmenuArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MenuItemTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type MenuItemCollection = {
  readonly __typename?: 'MenuItemCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<MenuItem>>;
};

export type MenuItemFilter = {
  readonly submenu?: Maybe<CfMenuNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly link_exists?: Maybe<Scalars['Boolean']>;
  readonly submenu_exists?: Maybe<Scalars['Boolean']>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<MenuItemFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<MenuItemFilter>>>;
};

export type MenuItemLink = Link | Page;

export type MenuItemLinkingCollections = {
  readonly __typename?: 'MenuItemLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly menuCollection?: Maybe<MenuCollection>;
};


export type MenuItemLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MenuItemLinkingCollectionsMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum MenuItemOrder {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type MenuItemsCollection = {
  readonly __typename?: 'MenuItemsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<MenuItem>>;
};

export type MenuLinkingCollections = {
  readonly __typename?: 'MenuLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageFooterCollection?: Maybe<PageFooterCollection>;
  readonly menuItemCollection?: Maybe<MenuItemCollection>;
};


export type MenuLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MenuLinkingCollectionsPageFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MenuLinkingCollectionsMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum MenuOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Organization = Entry & {
  readonly __typename?: 'Organization';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<OrganizationLinkingCollections>;
  readonly name?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly telephone?: Maybe<Scalars['String']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly sameAs?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly imageUrl?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly address?: Maybe<Address>;
};


export type OrganizationLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type OrganizationNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type OrganizationDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type OrganizationTelephoneArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type OrganizationEmailArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type OrganizationSameAsArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type OrganizationImageUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type OrganizationIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type OrganizationAddressArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type OrganizationCollection = {
  readonly __typename?: 'OrganizationCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Organization>>;
};

export type OrganizationFilter = {
  readonly address?: Maybe<CfAddressNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly name_exists?: Maybe<Scalars['Boolean']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly name_not?: Maybe<Scalars['String']>;
  readonly name_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly name_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly name_contains?: Maybe<Scalars['String']>;
  readonly name_not_contains?: Maybe<Scalars['String']>;
  readonly description_exists?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly description_not?: Maybe<Scalars['String']>;
  readonly description_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_contains?: Maybe<Scalars['String']>;
  readonly description_not_contains?: Maybe<Scalars['String']>;
  readonly telephone_exists?: Maybe<Scalars['Boolean']>;
  readonly telephone?: Maybe<Scalars['String']>;
  readonly telephone_not?: Maybe<Scalars['String']>;
  readonly telephone_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly telephone_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly telephone_contains?: Maybe<Scalars['String']>;
  readonly telephone_not_contains?: Maybe<Scalars['String']>;
  readonly email_exists?: Maybe<Scalars['Boolean']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly email_not?: Maybe<Scalars['String']>;
  readonly email_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly email_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly email_contains?: Maybe<Scalars['String']>;
  readonly email_not_contains?: Maybe<Scalars['String']>;
  readonly sameAs_exists?: Maybe<Scalars['Boolean']>;
  readonly sameAs_contains_all?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly sameAs_contains_some?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly sameAs_contains_none?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly imageUrl_exists?: Maybe<Scalars['Boolean']>;
  readonly imageUrl?: Maybe<Scalars['String']>;
  readonly imageUrl_not?: Maybe<Scalars['String']>;
  readonly imageUrl_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly imageUrl_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly imageUrl_contains?: Maybe<Scalars['String']>;
  readonly imageUrl_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly address_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<OrganizationFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<OrganizationFilter>>>;
};

export type OrganizationLinkingCollections = {
  readonly __typename?: 'OrganizationLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type OrganizationLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum OrganizationOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TelephoneAsc = 'telephone_ASC',
  TelephoneDesc = 'telephone_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  ImageUrlAsc = 'imageUrl_ASC',
  ImageUrlDesc = 'imageUrl_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Page = Entry & {
  readonly __typename?: 'Page';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<PageLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly isCampaignPage?: Maybe<Scalars['Boolean']>;
  readonly pageType?: Maybe<Scalars['String']>;
  readonly referencedContent?: Maybe<PageReferencedContent>;
  readonly heroHeader?: Maybe<PageHeroHeader>;
  readonly contentBlocksCollection?: Maybe<PageContentBlocksCollection>;
  readonly seo?: Maybe<Seo>;
};


export type PageLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type PageTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageIsCampaignPageArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PagePageTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageReferencedContentArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageHeroHeaderArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageSeoArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type PageCollection = {
  readonly __typename?: 'PageCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Page>>;
};

export type PageContentBlocksCollection = {
  readonly __typename?: 'PageContentBlocksCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<PageContentBlocksItem>>;
};

export type PageContentBlocksItem = CampaignHeroBanner | Category | CategoryGrid | ContainerOfContentBlocks | ContentBlockWithImage | ExponeaRecommendation | GroupOfStaticContentBlocks | HeroBanner | LinkBlock | Promotion | Slider | StaticContentBlock | StaticHeaderBlock | TopBrands | UspsCard | VoucherCodes | StaticRecommendationBlock | ExpertSignature;

export type PageFilter = {
  readonly seo?: Maybe<CfSeoNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly isCampaignPage_exists?: Maybe<Scalars['Boolean']>;
  readonly isCampaignPage?: Maybe<Scalars['Boolean']>;
  readonly isCampaignPage_not?: Maybe<Scalars['Boolean']>;
  readonly pageType_exists?: Maybe<Scalars['Boolean']>;
  readonly pageType?: Maybe<Scalars['String']>;
  readonly pageType_not?: Maybe<Scalars['String']>;
  readonly pageType_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageType_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageType_contains?: Maybe<Scalars['String']>;
  readonly pageType_not_contains?: Maybe<Scalars['String']>;
  readonly referencedContent_exists?: Maybe<Scalars['Boolean']>;
  readonly heroHeader_exists?: Maybe<Scalars['Boolean']>;
  readonly contentBlocksCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly seo_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<PageFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<PageFilter>>>;
};

export type PageFooter = Entry & {
  readonly __typename?: 'PageFooter';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<PageFooterLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly importantLinks?: Maybe<Menu>;
  readonly serviceContactLinks?: Maybe<Menu>;
  readonly providerBlocksCollection?: Maybe<PageFooterProviderBlocksCollection>;
  readonly newsletterBlockTitle?: Maybe<Scalars['String']>;
  readonly newsletterSellingPoints?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly socialMediaLinks?: Maybe<FooterProvidersBlock>;
  readonly termsConditionsLinks?: Maybe<Menu>;
  readonly copyright?: Maybe<PageFooterCopyright>;
};


export type PageFooterLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type PageFooterTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterImportantLinksArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterServiceContactLinksArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterProviderBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterNewsletterBlockTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterNewsletterSellingPointsArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterSocialMediaLinksArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterTermsConditionsLinksArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageFooterCopyrightArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type PageFooterCollection = {
  readonly __typename?: 'PageFooterCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<PageFooter>>;
};

export type PageFooterCopyright = {
  readonly __typename?: 'PageFooterCopyright';
  readonly json: Scalars['JSON'];
  readonly links: PageFooterCopyrightLinks;
};

export type PageFooterCopyrightAssets = {
  readonly __typename?: 'PageFooterCopyrightAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type PageFooterCopyrightEntries = {
  readonly __typename?: 'PageFooterCopyrightEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type PageFooterCopyrightLinks = {
  readonly __typename?: 'PageFooterCopyrightLinks';
  readonly entries: PageFooterCopyrightEntries;
  readonly assets: PageFooterCopyrightAssets;
};

export type PageFooterFilter = {
  readonly importantLinks?: Maybe<CfMenuNestedFilter>;
  readonly serviceContactLinks?: Maybe<CfMenuNestedFilter>;
  readonly socialMediaLinks?: Maybe<CfFooterProvidersBlockNestedFilter>;
  readonly termsConditionsLinks?: Maybe<CfMenuNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly importantLinks_exists?: Maybe<Scalars['Boolean']>;
  readonly serviceContactLinks_exists?: Maybe<Scalars['Boolean']>;
  readonly providerBlocksCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly newsletterBlockTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly newsletterBlockTitle?: Maybe<Scalars['String']>;
  readonly newsletterBlockTitle_not?: Maybe<Scalars['String']>;
  readonly newsletterBlockTitle_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly newsletterBlockTitle_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly newsletterBlockTitle_contains?: Maybe<Scalars['String']>;
  readonly newsletterBlockTitle_not_contains?: Maybe<Scalars['String']>;
  readonly newsletterSellingPoints_exists?: Maybe<Scalars['Boolean']>;
  readonly newsletterSellingPoints_contains_all?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly newsletterSellingPoints_contains_some?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly newsletterSellingPoints_contains_none?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly socialMediaLinks_exists?: Maybe<Scalars['Boolean']>;
  readonly termsConditionsLinks_exists?: Maybe<Scalars['Boolean']>;
  readonly copyright_exists?: Maybe<Scalars['Boolean']>;
  readonly copyright_contains?: Maybe<Scalars['String']>;
  readonly copyright_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<PageFooterFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<PageFooterFilter>>>;
};

export type PageFooterLinkingCollections = {
  readonly __typename?: 'PageFooterLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type PageFooterLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum PageFooterOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NewsletterBlockTitleAsc = 'newsletterBlockTitle_ASC',
  NewsletterBlockTitleDesc = 'newsletterBlockTitle_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PageFooterProviderBlocksCollection = {
  readonly __typename?: 'PageFooterProviderBlocksCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<FooterProvidersBlock>>;
};

export type PageHeroHeader = HeroBanner | CampaignHeroBanner;

export type PageLinkingCollections = {
  readonly __typename?: 'PageLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly seoCollection?: Maybe<SeoCollection>;
  readonly menuItemCollection?: Maybe<MenuItemCollection>;
};


export type PageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageLinkingCollectionsSeoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PageLinkingCollectionsMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum PageOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  IsCampaignPageAsc = 'isCampaignPage_ASC',
  IsCampaignPageDesc = 'isCampaignPage_DESC',
  PageTypeAsc = 'pageType_ASC',
  PageTypeDesc = 'pageType_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PageRedirect = Entry & {
  readonly __typename?: 'PageRedirect';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<PageRedirectLinkingCollections>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly redirectTo?: Maybe<Link>;
};


export type PageRedirectLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type PageRedirectSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PageRedirectRedirectToArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type PageRedirectCollection = {
  readonly __typename?: 'PageRedirectCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<PageRedirect>>;
};

export type PageRedirectFilter = {
  readonly redirectTo?: Maybe<CfLinkNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly redirectTo_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<PageRedirectFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<PageRedirectFilter>>>;
};

export type PageRedirectLinkingCollections = {
  readonly __typename?: 'PageRedirectLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type PageRedirectLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum PageRedirectOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PageReferencedContent = Brand | Category | CategoryCop | Promotion;

export type Promotion = Entry & {
  readonly __typename?: 'Promotion';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<PromotionLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly description?: Maybe<PromotionDescription>;
  readonly sponsored?: Maybe<Scalars['Boolean']>;
  readonly teaserType?: Maybe<Scalars['Boolean']>;
  readonly teaserImage?: Maybe<Asset>;
  readonly teaserDescription?: Maybe<Scalars['String']>;
  readonly color?: Maybe<Color>;
  readonly image?: Maybe<Asset>;
  readonly promoInformation?: Maybe<PromotionPromoInformation>;
  readonly validFrom?: Maybe<Scalars['DateTime']>;
  readonly validTo?: Maybe<Scalars['DateTime']>;
  readonly weight?: Maybe<Scalars['Int']>;
  readonly categoriesCollection?: Maybe<PromotionCategoriesCollection>;
  readonly itemsToFilterBy?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly labelsCollection?: Maybe<PromotionLabelsCollection>;
  readonly slug?: Maybe<Scalars['String']>;
};


export type PromotionLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type PromotionTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionSponsoredArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionTeaserTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionTeaserImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionTeaserDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionPromoInformationArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionValidFromArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionValidToArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionWeightArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionCategoriesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionItemsToFilterByArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type PromotionLabelsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type PromotionCategoriesCollection = {
  readonly __typename?: 'PromotionCategoriesCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Category>>;
};

export type PromotionCollection = {
  readonly __typename?: 'PromotionCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Promotion>>;
};

export type PromotionDescription = {
  readonly __typename?: 'PromotionDescription';
  readonly json: Scalars['JSON'];
  readonly links: PromotionDescriptionLinks;
};

export type PromotionDescriptionAssets = {
  readonly __typename?: 'PromotionDescriptionAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type PromotionDescriptionEntries = {
  readonly __typename?: 'PromotionDescriptionEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type PromotionDescriptionLinks = {
  readonly __typename?: 'PromotionDescriptionLinks';
  readonly entries: PromotionDescriptionEntries;
  readonly assets: PromotionDescriptionAssets;
};

export type PromotionFilter = {
  readonly color?: Maybe<CfColorNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly description_exists?: Maybe<Scalars['Boolean']>;
  readonly description_contains?: Maybe<Scalars['String']>;
  readonly description_not_contains?: Maybe<Scalars['String']>;
  readonly sponsored_exists?: Maybe<Scalars['Boolean']>;
  readonly sponsored?: Maybe<Scalars['Boolean']>;
  readonly sponsored_not?: Maybe<Scalars['Boolean']>;
  readonly teaserType_exists?: Maybe<Scalars['Boolean']>;
  readonly teaserType?: Maybe<Scalars['Boolean']>;
  readonly teaserType_not?: Maybe<Scalars['Boolean']>;
  readonly teaserImage_exists?: Maybe<Scalars['Boolean']>;
  readonly teaserDescription_exists?: Maybe<Scalars['Boolean']>;
  readonly teaserDescription?: Maybe<Scalars['String']>;
  readonly teaserDescription_not?: Maybe<Scalars['String']>;
  readonly teaserDescription_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly teaserDescription_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly teaserDescription_contains?: Maybe<Scalars['String']>;
  readonly teaserDescription_not_contains?: Maybe<Scalars['String']>;
  readonly color_exists?: Maybe<Scalars['Boolean']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly promoInformation_exists?: Maybe<Scalars['Boolean']>;
  readonly promoInformation_contains?: Maybe<Scalars['String']>;
  readonly promoInformation_not_contains?: Maybe<Scalars['String']>;
  readonly validFrom_exists?: Maybe<Scalars['Boolean']>;
  readonly validFrom?: Maybe<Scalars['DateTime']>;
  readonly validFrom_not?: Maybe<Scalars['DateTime']>;
  readonly validFrom_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly validFrom_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly validFrom_gt?: Maybe<Scalars['DateTime']>;
  readonly validFrom_gte?: Maybe<Scalars['DateTime']>;
  readonly validFrom_lt?: Maybe<Scalars['DateTime']>;
  readonly validFrom_lte?: Maybe<Scalars['DateTime']>;
  readonly validTo_exists?: Maybe<Scalars['Boolean']>;
  readonly validTo?: Maybe<Scalars['DateTime']>;
  readonly validTo_not?: Maybe<Scalars['DateTime']>;
  readonly validTo_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly validTo_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly validTo_gt?: Maybe<Scalars['DateTime']>;
  readonly validTo_gte?: Maybe<Scalars['DateTime']>;
  readonly validTo_lt?: Maybe<Scalars['DateTime']>;
  readonly validTo_lte?: Maybe<Scalars['DateTime']>;
  readonly weight_exists?: Maybe<Scalars['Boolean']>;
  readonly weight?: Maybe<Scalars['Int']>;
  readonly weight_not?: Maybe<Scalars['Int']>;
  readonly weight_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly weight_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly weight_gt?: Maybe<Scalars['Int']>;
  readonly weight_gte?: Maybe<Scalars['Int']>;
  readonly weight_lt?: Maybe<Scalars['Int']>;
  readonly weight_lte?: Maybe<Scalars['Int']>;
  readonly categoriesCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly itemsToFilterBy_exists?: Maybe<Scalars['Boolean']>;
  readonly itemsToFilterBy_contains_all?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly itemsToFilterBy_contains_some?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly itemsToFilterBy_contains_none?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly labelsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<PromotionFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<PromotionFilter>>>;
};

export type PromotionLabelsCollection = {
  readonly __typename?: 'PromotionLabelsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<PromotionLabelsItem>>;
};

export type PromotionLabelsItem = Translation | TranslationInfoLabel;

export type PromotionLinkingCollections = {
  readonly __typename?: 'PromotionLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
  readonly categoryCopCollection?: Maybe<CategoryCopCollection>;
  readonly containerOfContentBlocksCollection?: Maybe<ContainerOfContentBlocksCollection>;
};


export type PromotionLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionLinkingCollectionsCategoryCopCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type PromotionLinkingCollectionsContainerOfContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum PromotionOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SponsoredAsc = 'sponsored_ASC',
  SponsoredDesc = 'sponsored_DESC',
  TeaserTypeAsc = 'teaserType_ASC',
  TeaserTypeDesc = 'teaserType_DESC',
  TeaserDescriptionAsc = 'teaserDescription_ASC',
  TeaserDescriptionDesc = 'teaserDescription_DESC',
  ValidFromAsc = 'validFrom_ASC',
  ValidFromDesc = 'validFrom_DESC',
  ValidToAsc = 'validTo_ASC',
  ValidToDesc = 'validTo_DESC',
  WeightAsc = 'weight_ASC',
  WeightDesc = 'weight_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type PromotionPromoInformation = {
  readonly __typename?: 'PromotionPromoInformation';
  readonly json: Scalars['JSON'];
  readonly links: PromotionPromoInformationLinks;
};

export type PromotionPromoInformationAssets = {
  readonly __typename?: 'PromotionPromoInformationAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type PromotionPromoInformationEntries = {
  readonly __typename?: 'PromotionPromoInformationEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type PromotionPromoInformationLinks = {
  readonly __typename?: 'PromotionPromoInformationLinks';
  readonly entries: PromotionPromoInformationEntries;
  readonly assets: PromotionPromoInformationAssets;
};


export type Query = {
  readonly __typename?: 'Query';
  readonly asset?: Maybe<Asset>;
  readonly assetCollection?: Maybe<AssetCollection>;
  readonly page?: Maybe<Page>;
  readonly pageCollection?: Maybe<PageCollection>;
  readonly brand?: Maybe<Brand>;
  readonly brandCollection?: Maybe<BrandCollection>;
  readonly categoryCop?: Maybe<CategoryCop>;
  readonly categoryCopCollection?: Maybe<CategoryCopCollection>;
  readonly category?: Maybe<Category>;
  readonly categoryCollection?: Maybe<CategoryCollection>;
  readonly promotion?: Maybe<Promotion>;
  readonly promotionCollection?: Maybe<PromotionCollection>;
  readonly staticRecommendationBlock?: Maybe<StaticRecommendationBlock>;
  readonly staticRecommendationBlockCollection?: Maybe<StaticRecommendationBlockCollection>;
  readonly pageRedirect?: Maybe<PageRedirect>;
  readonly pageRedirectCollection?: Maybe<PageRedirectCollection>;
  readonly pageFooter?: Maybe<PageFooter>;
  readonly pageFooterCollection?: Maybe<PageFooterCollection>;
  readonly expertSignature?: Maybe<ExpertSignature>;
  readonly expertSignatureCollection?: Maybe<ExpertSignatureCollection>;
  readonly heroBanner?: Maybe<HeroBanner>;
  readonly heroBannerCollection?: Maybe<HeroBannerCollection>;
  readonly categoryTile?: Maybe<CategoryTile>;
  readonly categoryTileCollection?: Maybe<CategoryTileCollection>;
  readonly containerOfContentBlocks?: Maybe<ContainerOfContentBlocks>;
  readonly containerOfContentBlocksCollection?: Maybe<ContainerOfContentBlocksCollection>;
  readonly seo?: Maybe<Seo>;
  readonly seoCollection?: Maybe<SeoCollection>;
  readonly contentBlockWithImage?: Maybe<ContentBlockWithImage>;
  readonly contentBlockWithImageCollection?: Maybe<ContentBlockWithImageCollection>;
  readonly exponeaRecommendation?: Maybe<ExponeaRecommendation>;
  readonly exponeaRecommendationCollection?: Maybe<ExponeaRecommendationCollection>;
  readonly marketingTeaser?: Maybe<MarketingTeaser>;
  readonly marketingTeaserCollection?: Maybe<MarketingTeaserCollection>;
  readonly icon?: Maybe<Icon>;
  readonly iconCollection?: Maybe<IconCollection>;
  readonly color?: Maybe<Color>;
  readonly colorCollection?: Maybe<ColorCollection>;
  readonly voucherCode?: Maybe<VoucherCode>;
  readonly voucherCodeCollection?: Maybe<VoucherCodeCollection>;
  readonly categoryGrid?: Maybe<CategoryGrid>;
  readonly categoryGridCollection?: Maybe<CategoryGridCollection>;
  readonly menu?: Maybe<Menu>;
  readonly menuCollection?: Maybe<MenuCollection>;
  readonly voucherCodes?: Maybe<VoucherCodes>;
  readonly voucherCodesCollection?: Maybe<VoucherCodesCollection>;
  readonly uspsCard?: Maybe<UspsCard>;
  readonly uspsCardCollection?: Maybe<UspsCardCollection>;
  readonly usp?: Maybe<Usp>;
  readonly uspCollection?: Maybe<UspCollection>;
  readonly topBrands?: Maybe<TopBrands>;
  readonly topBrandsCollection?: Maybe<TopBrandsCollection>;
  readonly staticContentBlock?: Maybe<StaticContentBlock>;
  readonly staticContentBlockCollection?: Maybe<StaticContentBlockCollection>;
  readonly slider?: Maybe<Slider>;
  readonly sliderCollection?: Maybe<SliderCollection>;
  readonly menuItem?: Maybe<MenuItem>;
  readonly menuItemCollection?: Maybe<MenuItemCollection>;
  readonly linkBlock?: Maybe<LinkBlock>;
  readonly linkBlockCollection?: Maybe<LinkBlockCollection>;
  readonly groupOfStaticContentBlocks?: Maybe<GroupOfStaticContentBlocks>;
  readonly groupOfStaticContentBlocksCollection?: Maybe<GroupOfStaticContentBlocksCollection>;
  readonly footerProvidersBlock?: Maybe<FooterProvidersBlock>;
  readonly footerProvidersBlockCollection?: Maybe<FooterProvidersBlockCollection>;
  readonly filterPageType?: Maybe<FilterPageType>;
  readonly filterPageTypeCollection?: Maybe<FilterPageTypeCollection>;
  readonly filterItem?: Maybe<FilterItem>;
  readonly filterItemCollection?: Maybe<FilterItemCollection>;
  readonly deliverySteps?: Maybe<DeliverySteps>;
  readonly deliveryStepsCollection?: Maybe<DeliveryStepsCollection>;
  readonly address?: Maybe<Address>;
  readonly addressCollection?: Maybe<AddressCollection>;
  readonly campaignHeroBanner?: Maybe<CampaignHeroBanner>;
  readonly campaignHeroBannerCollection?: Maybe<CampaignHeroBannerCollection>;
  readonly organization?: Maybe<Organization>;
  readonly organizationCollection?: Maybe<OrganizationCollection>;
  readonly translationInfoLabel?: Maybe<TranslationInfoLabel>;
  readonly translationInfoLabelCollection?: Maybe<TranslationInfoLabelCollection>;
  readonly filterCollection?: Maybe<FilterCollection>;
  readonly filterCollectionCollection?: Maybe<FilterCollectionCollection>;
  readonly richTextTranslation?: Maybe<RichTextTranslation>;
  readonly richTextTranslationCollection?: Maybe<RichTextTranslationCollection>;
  readonly link?: Maybe<Link>;
  readonly linkCollection?: Maybe<LinkCollection>;
  readonly staticHeaderBlock?: Maybe<StaticHeaderBlock>;
  readonly staticHeaderBlockCollection?: Maybe<StaticHeaderBlockCollection>;
  readonly translation?: Maybe<Translation>;
  readonly translationCollection?: Maybe<TranslationCollection>;
  readonly media?: Maybe<Media>;
  readonly mediaCollection?: Maybe<MediaCollection>;
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryAssetCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AssetFilter>;
  order?: Maybe<ReadonlyArray<Maybe<AssetOrder>>>;
};


export type QueryPageArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<PageFilter>;
  order?: Maybe<ReadonlyArray<Maybe<PageOrder>>>;
};


export type QueryBrandArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryBrandCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<BrandFilter>;
  order?: Maybe<ReadonlyArray<Maybe<BrandOrder>>>;
};


export type QueryCategoryCopArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCategoryCopCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryCopFilter>;
  order?: Maybe<ReadonlyArray<Maybe<CategoryCopOrder>>>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCategoryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryFilter>;
  order?: Maybe<ReadonlyArray<Maybe<CategoryOrder>>>;
};


export type QueryPromotionArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPromotionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<PromotionFilter>;
  order?: Maybe<ReadonlyArray<Maybe<PromotionOrder>>>;
};


export type QueryStaticRecommendationBlockArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryStaticRecommendationBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<StaticRecommendationBlockFilter>;
  order?: Maybe<ReadonlyArray<Maybe<StaticRecommendationBlockOrder>>>;
};


export type QueryPageRedirectArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPageRedirectCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<PageRedirectFilter>;
  order?: Maybe<ReadonlyArray<Maybe<PageRedirectOrder>>>;
};


export type QueryPageFooterArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPageFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<PageFooterFilter>;
  order?: Maybe<ReadonlyArray<Maybe<PageFooterOrder>>>;
};


export type QueryExpertSignatureArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryExpertSignatureCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ExpertSignatureFilter>;
  order?: Maybe<ReadonlyArray<Maybe<ExpertSignatureOrder>>>;
};


export type QueryHeroBannerArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryHeroBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<HeroBannerFilter>;
  order?: Maybe<ReadonlyArray<Maybe<HeroBannerOrder>>>;
};


export type QueryCategoryTileArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCategoryTileCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryTileFilter>;
  order?: Maybe<ReadonlyArray<Maybe<CategoryTileOrder>>>;
};


export type QueryContainerOfContentBlocksArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryContainerOfContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ContainerOfContentBlocksFilter>;
  order?: Maybe<ReadonlyArray<Maybe<ContainerOfContentBlocksOrder>>>;
};


export type QuerySeoArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QuerySeoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<SeoFilter>;
  order?: Maybe<ReadonlyArray<Maybe<SeoOrder>>>;
};


export type QueryContentBlockWithImageArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryContentBlockWithImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ContentBlockWithImageFilter>;
  order?: Maybe<ReadonlyArray<Maybe<ContentBlockWithImageOrder>>>;
};


export type QueryExponeaRecommendationArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryExponeaRecommendationCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ExponeaRecommendationFilter>;
  order?: Maybe<ReadonlyArray<Maybe<ExponeaRecommendationOrder>>>;
};


export type QueryMarketingTeaserArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMarketingTeaserCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<MarketingTeaserFilter>;
  order?: Maybe<ReadonlyArray<Maybe<MarketingTeaserOrder>>>;
};


export type QueryIconArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryIconCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<IconFilter>;
  order?: Maybe<ReadonlyArray<Maybe<IconOrder>>>;
};


export type QueryColorArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryColorCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ColorFilter>;
  order?: Maybe<ReadonlyArray<Maybe<ColorOrder>>>;
};


export type QueryVoucherCodeArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryVoucherCodeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<VoucherCodeFilter>;
  order?: Maybe<ReadonlyArray<Maybe<VoucherCodeOrder>>>;
};


export type QueryCategoryGridArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCategoryGridCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryGridFilter>;
  order?: Maybe<ReadonlyArray<Maybe<CategoryGridOrder>>>;
};


export type QueryMenuArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<MenuFilter>;
  order?: Maybe<ReadonlyArray<Maybe<MenuOrder>>>;
};


export type QueryVoucherCodesArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryVoucherCodesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<VoucherCodesFilter>;
  order?: Maybe<ReadonlyArray<Maybe<VoucherCodesOrder>>>;
};


export type QueryUspsCardArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryUspsCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<UspsCardFilter>;
  order?: Maybe<ReadonlyArray<Maybe<UspsCardOrder>>>;
};


export type QueryUspArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryUspCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<UspFilter>;
  order?: Maybe<ReadonlyArray<Maybe<UspOrder>>>;
};


export type QueryTopBrandsArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryTopBrandsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<TopBrandsFilter>;
  order?: Maybe<ReadonlyArray<Maybe<TopBrandsOrder>>>;
};


export type QueryStaticContentBlockArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryStaticContentBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<StaticContentBlockFilter>;
  order?: Maybe<ReadonlyArray<Maybe<StaticContentBlockOrder>>>;
};


export type QuerySliderArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QuerySliderCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<SliderFilter>;
  order?: Maybe<ReadonlyArray<Maybe<SliderOrder>>>;
};


export type QueryMenuItemArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<MenuItemFilter>;
  order?: Maybe<ReadonlyArray<Maybe<MenuItemOrder>>>;
};


export type QueryLinkBlockArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryLinkBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<LinkBlockFilter>;
  order?: Maybe<ReadonlyArray<Maybe<LinkBlockOrder>>>;
};


export type QueryGroupOfStaticContentBlocksArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryGroupOfStaticContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<GroupOfStaticContentBlocksFilter>;
  order?: Maybe<ReadonlyArray<Maybe<GroupOfStaticContentBlocksOrder>>>;
};


export type QueryFooterProvidersBlockArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFooterProvidersBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FooterProvidersBlockFilter>;
  order?: Maybe<ReadonlyArray<Maybe<FooterProvidersBlockOrder>>>;
};


export type QueryFilterPageTypeArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFilterPageTypeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FilterPageTypeFilter>;
  order?: Maybe<ReadonlyArray<Maybe<FilterPageTypeOrder>>>;
};


export type QueryFilterItemArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFilterItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FilterItemFilter>;
  order?: Maybe<ReadonlyArray<Maybe<FilterItemOrder>>>;
};


export type QueryDeliveryStepsArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDeliveryStepsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<DeliveryStepsFilter>;
  order?: Maybe<ReadonlyArray<Maybe<DeliveryStepsOrder>>>;
};


export type QueryAddressArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryAddressCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AddressFilter>;
  order?: Maybe<ReadonlyArray<Maybe<AddressOrder>>>;
};


export type QueryCampaignHeroBannerArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCampaignHeroBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<CampaignHeroBannerFilter>;
  order?: Maybe<ReadonlyArray<Maybe<CampaignHeroBannerOrder>>>;
};


export type QueryOrganizationArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryOrganizationCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<OrganizationFilter>;
  order?: Maybe<ReadonlyArray<Maybe<OrganizationOrder>>>;
};


export type QueryTranslationInfoLabelArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryTranslationInfoLabelCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<TranslationInfoLabelFilter>;
  order?: Maybe<ReadonlyArray<Maybe<TranslationInfoLabelOrder>>>;
};


export type QueryFilterCollectionArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFilterCollectionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FilterCollectionFilter>;
  order?: Maybe<ReadonlyArray<Maybe<FilterCollectionOrder>>>;
};


export type QueryRichTextTranslationArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryRichTextTranslationCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<RichTextTranslationFilter>;
  order?: Maybe<ReadonlyArray<Maybe<RichTextTranslationOrder>>>;
};


export type QueryLinkArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryLinkCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<LinkFilter>;
  order?: Maybe<ReadonlyArray<Maybe<LinkOrder>>>;
};


export type QueryStaticHeaderBlockArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryStaticHeaderBlockCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<StaticHeaderBlockFilter>;
  order?: Maybe<ReadonlyArray<Maybe<StaticHeaderBlockOrder>>>;
};


export type QueryTranslationArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryTranslationCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<TranslationFilter>;
  order?: Maybe<ReadonlyArray<Maybe<TranslationOrder>>>;
};


export type QueryMediaArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMediaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<MediaFilter>;
  order?: Maybe<ReadonlyArray<Maybe<MediaOrder>>>;
};


export type QueryEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<EntryFilter>;
  order?: Maybe<ReadonlyArray<Maybe<EntryOrder>>>;
};

export type RichTextTranslation = Entry & {
  readonly __typename?: 'RichTextTranslation';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<RichTextTranslationLinkingCollections>;
  readonly key?: Maybe<Scalars['String']>;
  readonly value?: Maybe<RichTextTranslationValue>;
};


export type RichTextTranslationLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type RichTextTranslationKeyArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type RichTextTranslationValueArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type RichTextTranslationCollection = {
  readonly __typename?: 'RichTextTranslationCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<RichTextTranslation>>;
};

export type RichTextTranslationFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly key_exists?: Maybe<Scalars['Boolean']>;
  readonly key?: Maybe<Scalars['String']>;
  readonly key_not?: Maybe<Scalars['String']>;
  readonly key_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly key_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly key_contains?: Maybe<Scalars['String']>;
  readonly key_not_contains?: Maybe<Scalars['String']>;
  readonly value_exists?: Maybe<Scalars['Boolean']>;
  readonly value_contains?: Maybe<Scalars['String']>;
  readonly value_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<RichTextTranslationFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<RichTextTranslationFilter>>>;
};

export type RichTextTranslationLinkingCollections = {
  readonly __typename?: 'RichTextTranslationLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
};


export type RichTextTranslationLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum RichTextTranslationOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type RichTextTranslationValue = {
  readonly __typename?: 'RichTextTranslationValue';
  readonly json: Scalars['JSON'];
  readonly links: RichTextTranslationValueLinks;
};

export type RichTextTranslationValueAssets = {
  readonly __typename?: 'RichTextTranslationValueAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type RichTextTranslationValueEntries = {
  readonly __typename?: 'RichTextTranslationValueEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type RichTextTranslationValueLinks = {
  readonly __typename?: 'RichTextTranslationValueLinks';
  readonly entries: RichTextTranslationValueEntries;
  readonly assets: RichTextTranslationValueAssets;
};

export type Seo = Entry & {
  readonly __typename?: 'Seo';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<SeoLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly noIndex?: Maybe<Scalars['Boolean']>;
  readonly noFollow?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly keywords?: Maybe<Scalars['String']>;
  readonly image?: Maybe<Asset>;
  readonly header?: Maybe<Scalars['String']>;
  readonly copy?: Maybe<SeoCopy>;
  readonly copyExpandable?: Maybe<SeoCopyExpandable>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly link?: Maybe<Page>;
};


export type SeoLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type SeoTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoNoIndexArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoNoFollowArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoKeywordsArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type SeoHeaderArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoCopyArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoCopyExpandableArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoSlugArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SeoLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type SeoCollection = {
  readonly __typename?: 'SeoCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Seo>>;
};

export type SeoCopy = {
  readonly __typename?: 'SeoCopy';
  readonly json: Scalars['JSON'];
  readonly links: SeoCopyLinks;
};

export type SeoCopyAssets = {
  readonly __typename?: 'SeoCopyAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type SeoCopyEntries = {
  readonly __typename?: 'SeoCopyEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type SeoCopyExpandable = {
  readonly __typename?: 'SeoCopyExpandable';
  readonly json: Scalars['JSON'];
  readonly links: SeoCopyExpandableLinks;
};

export type SeoCopyExpandableAssets = {
  readonly __typename?: 'SeoCopyExpandableAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type SeoCopyExpandableEntries = {
  readonly __typename?: 'SeoCopyExpandableEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type SeoCopyExpandableLinks = {
  readonly __typename?: 'SeoCopyExpandableLinks';
  readonly entries: SeoCopyExpandableEntries;
  readonly assets: SeoCopyExpandableAssets;
};

export type SeoCopyLinks = {
  readonly __typename?: 'SeoCopyLinks';
  readonly entries: SeoCopyEntries;
  readonly assets: SeoCopyAssets;
};

export type SeoFilter = {
  readonly link?: Maybe<CfPageNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly noIndex_exists?: Maybe<Scalars['Boolean']>;
  readonly noIndex?: Maybe<Scalars['Boolean']>;
  readonly noIndex_not?: Maybe<Scalars['Boolean']>;
  readonly noFollow_exists?: Maybe<Scalars['Boolean']>;
  readonly noFollow?: Maybe<Scalars['Boolean']>;
  readonly noFollow_not?: Maybe<Scalars['Boolean']>;
  readonly description_exists?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly description_not?: Maybe<Scalars['String']>;
  readonly description_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_contains?: Maybe<Scalars['String']>;
  readonly description_not_contains?: Maybe<Scalars['String']>;
  readonly keywords_exists?: Maybe<Scalars['Boolean']>;
  readonly keywords?: Maybe<Scalars['String']>;
  readonly keywords_not?: Maybe<Scalars['String']>;
  readonly keywords_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly keywords_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly keywords_contains?: Maybe<Scalars['String']>;
  readonly keywords_not_contains?: Maybe<Scalars['String']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly header_exists?: Maybe<Scalars['Boolean']>;
  readonly header?: Maybe<Scalars['String']>;
  readonly header_not?: Maybe<Scalars['String']>;
  readonly header_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly header_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly header_contains?: Maybe<Scalars['String']>;
  readonly header_not_contains?: Maybe<Scalars['String']>;
  readonly copy_exists?: Maybe<Scalars['Boolean']>;
  readonly copy_contains?: Maybe<Scalars['String']>;
  readonly copy_not_contains?: Maybe<Scalars['String']>;
  readonly copyExpandable_exists?: Maybe<Scalars['Boolean']>;
  readonly copyExpandable_contains?: Maybe<Scalars['String']>;
  readonly copyExpandable_not_contains?: Maybe<Scalars['String']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly link_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<SeoFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<SeoFilter>>>;
};

export type SeoLinkingCollections = {
  readonly __typename?: 'SeoLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type SeoLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type SeoLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum SeoOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  NoIndexAsc = 'noIndex_ASC',
  NoIndexDesc = 'noIndex_DESC',
  NoFollowAsc = 'noFollow_ASC',
  NoFollowDesc = 'noFollow_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  KeywordsAsc = 'keywords_ASC',
  KeywordsDesc = 'keywords_DESC',
  HeaderAsc = 'header_ASC',
  HeaderDesc = 'header_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Slider = Entry & {
  readonly __typename?: 'Slider';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<SliderLinkingCollections>;
  readonly name?: Maybe<Scalars['String']>;
  readonly contentBlocksCollection?: Maybe<SliderContentBlocksCollection>;
};


export type SliderLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type SliderNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type SliderContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type SliderCollection = {
  readonly __typename?: 'SliderCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Slider>>;
};

export type SliderContentBlocksCollection = {
  readonly __typename?: 'SliderContentBlocksCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<HeroBanner>>;
};

export type SliderFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly name_exists?: Maybe<Scalars['Boolean']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly name_not?: Maybe<Scalars['String']>;
  readonly name_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly name_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly name_contains?: Maybe<Scalars['String']>;
  readonly name_not_contains?: Maybe<Scalars['String']>;
  readonly contentBlocksCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<SliderFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<SliderFilter>>>;
};

export type SliderLinkingCollections = {
  readonly __typename?: 'SliderLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type SliderLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type SliderLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum SliderOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type StaticContentBlock = Entry & {
  readonly __typename?: 'StaticContentBlock';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<StaticContentBlockLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly content?: Maybe<StaticContentBlockContent>;
  readonly icon?: Maybe<Icon>;
};


export type StaticContentBlockLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type StaticContentBlockTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type StaticContentBlockContentArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type StaticContentBlockIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type StaticContentBlockCollection = {
  readonly __typename?: 'StaticContentBlockCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<StaticContentBlock>>;
};

export type StaticContentBlockContent = {
  readonly __typename?: 'StaticContentBlockContent';
  readonly json: Scalars['JSON'];
  readonly links: StaticContentBlockContentLinks;
};

export type StaticContentBlockContentAssets = {
  readonly __typename?: 'StaticContentBlockContentAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type StaticContentBlockContentEntries = {
  readonly __typename?: 'StaticContentBlockContentEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type StaticContentBlockContentLinks = {
  readonly __typename?: 'StaticContentBlockContentLinks';
  readonly entries: StaticContentBlockContentEntries;
  readonly assets: StaticContentBlockContentAssets;
};

export type StaticContentBlockFilter = {
  readonly icon?: Maybe<CfIconNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly content_exists?: Maybe<Scalars['Boolean']>;
  readonly content_contains?: Maybe<Scalars['String']>;
  readonly content_not_contains?: Maybe<Scalars['String']>;
  readonly icon_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<StaticContentBlockFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<StaticContentBlockFilter>>>;
};

export type StaticContentBlockLinkingCollections = {
  readonly __typename?: 'StaticContentBlockLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
  readonly groupOfStaticContentBlocksCollection?: Maybe<GroupOfStaticContentBlocksCollection>;
};


export type StaticContentBlockLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type StaticContentBlockLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type StaticContentBlockLinkingCollectionsGroupOfStaticContentBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum StaticContentBlockOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type StaticHeaderBlock = Entry & {
  readonly __typename?: 'StaticHeaderBlock';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<StaticHeaderBlockLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
};


export type StaticHeaderBlockLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type StaticHeaderBlockTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type StaticHeaderBlockCollection = {
  readonly __typename?: 'StaticHeaderBlockCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<StaticHeaderBlock>>;
};

export type StaticHeaderBlockFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<StaticHeaderBlockFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<StaticHeaderBlockFilter>>>;
};

export type StaticHeaderBlockLinkingCollections = {
  readonly __typename?: 'StaticHeaderBlockLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type StaticHeaderBlockLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type StaticHeaderBlockLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum StaticHeaderBlockOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type StaticRecommendationBlock = Entry & {
  readonly __typename?: 'StaticRecommendationBlock';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<StaticRecommendationBlockLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly view?: Maybe<Scalars['String']>;
  readonly showTitle?: Maybe<Scalars['Boolean']>;
  readonly skuList?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly showCount?: Maybe<Scalars['Boolean']>;
  readonly countExpire?: Maybe<Scalars['DateTime']>;
};


export type StaticRecommendationBlockLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type StaticRecommendationBlockTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type StaticRecommendationBlockViewArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type StaticRecommendationBlockShowTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type StaticRecommendationBlockSkuListArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type StaticRecommendationBlockShowCountArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type StaticRecommendationBlockCountExpireArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type StaticRecommendationBlockCollection = {
  readonly __typename?: 'StaticRecommendationBlockCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<StaticRecommendationBlock>>;
};

export type StaticRecommendationBlockFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly view_exists?: Maybe<Scalars['Boolean']>;
  readonly view?: Maybe<Scalars['String']>;
  readonly view_not?: Maybe<Scalars['String']>;
  readonly view_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly view_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly view_contains?: Maybe<Scalars['String']>;
  readonly view_not_contains?: Maybe<Scalars['String']>;
  readonly showTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly showTitle?: Maybe<Scalars['Boolean']>;
  readonly showTitle_not?: Maybe<Scalars['Boolean']>;
  readonly skuList_exists?: Maybe<Scalars['Boolean']>;
  readonly skuList_contains_all?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly skuList_contains_some?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly skuList_contains_none?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly showCount_exists?: Maybe<Scalars['Boolean']>;
  readonly showCount?: Maybe<Scalars['Boolean']>;
  readonly showCount_not?: Maybe<Scalars['Boolean']>;
  readonly countExpire_exists?: Maybe<Scalars['Boolean']>;
  readonly countExpire?: Maybe<Scalars['DateTime']>;
  readonly countExpire_not?: Maybe<Scalars['DateTime']>;
  readonly countExpire_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly countExpire_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly countExpire_gt?: Maybe<Scalars['DateTime']>;
  readonly countExpire_gte?: Maybe<Scalars['DateTime']>;
  readonly countExpire_lt?: Maybe<Scalars['DateTime']>;
  readonly countExpire_lte?: Maybe<Scalars['DateTime']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<StaticRecommendationBlockFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<StaticRecommendationBlockFilter>>>;
};

export type StaticRecommendationBlockLinkingCollections = {
  readonly __typename?: 'StaticRecommendationBlockLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type StaticRecommendationBlockLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type StaticRecommendationBlockLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum StaticRecommendationBlockOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ViewAsc = 'view_ASC',
  ViewDesc = 'view_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  ShowCountAsc = 'showCount_ASC',
  ShowCountDesc = 'showCount_DESC',
  CountExpireAsc = 'countExpire_ASC',
  CountExpireDesc = 'countExpire_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Sys = {
  readonly __typename?: 'Sys';
  readonly id: Scalars['String'];
  readonly spaceId: Scalars['String'];
  readonly environmentId: Scalars['String'];
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  readonly firstPublishedAt?: Maybe<Scalars['DateTime']>;
  readonly publishedVersion?: Maybe<Scalars['Int']>;
};

export type SysFilter = {
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly publishedAt_exists?: Maybe<Scalars['Boolean']>;
  readonly publishedAt?: Maybe<Scalars['DateTime']>;
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>;
  readonly publishedAt_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>;
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>;
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>;
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>;
  readonly firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  readonly firstPublishedAt?: Maybe<Scalars['DateTime']>;
  readonly firstPublishedAt_not?: Maybe<Scalars['DateTime']>;
  readonly firstPublishedAt_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly firstPublishedAt_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['DateTime']>>>;
  readonly firstPublishedAt_gt?: Maybe<Scalars['DateTime']>;
  readonly firstPublishedAt_gte?: Maybe<Scalars['DateTime']>;
  readonly firstPublishedAt_lt?: Maybe<Scalars['DateTime']>;
  readonly firstPublishedAt_lte?: Maybe<Scalars['DateTime']>;
  readonly publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  readonly publishedVersion?: Maybe<Scalars['Float']>;
  readonly publishedVersion_not?: Maybe<Scalars['Float']>;
  readonly publishedVersion_in?: Maybe<ReadonlyArray<Maybe<Scalars['Float']>>>;
  readonly publishedVersion_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['Float']>>>;
  readonly publishedVersion_gt?: Maybe<Scalars['Float']>;
  readonly publishedVersion_gte?: Maybe<Scalars['Float']>;
  readonly publishedVersion_lt?: Maybe<Scalars['Float']>;
  readonly publishedVersion_lte?: Maybe<Scalars['Float']>;
};

export type TopBrands = Entry & {
  readonly __typename?: 'TopBrands';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<TopBrandsLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly brandsCollection?: Maybe<TopBrandsBrandsCollection>;
};


export type TopBrandsLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type TopBrandsTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type TopBrandsBrandsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type TopBrandsBrandsCollection = {
  readonly __typename?: 'TopBrandsBrandsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Brand>>;
};

export type TopBrandsCollection = {
  readonly __typename?: 'TopBrandsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<TopBrands>>;
};

export type TopBrandsFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly brandsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<TopBrandsFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<TopBrandsFilter>>>;
};

export type TopBrandsLinkingCollections = {
  readonly __typename?: 'TopBrandsLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type TopBrandsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TopBrandsLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum TopBrandsOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Translation = Entry & {
  readonly __typename?: 'Translation';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<TranslationLinkingCollections>;
  readonly key?: Maybe<Scalars['String']>;
  readonly value?: Maybe<Scalars['String']>;
  readonly complete?: Maybe<Scalars['Boolean']>;
};


export type TranslationLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type TranslationKeyArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type TranslationValueArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type TranslationCompleteArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type TranslationCollection = {
  readonly __typename?: 'TranslationCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Translation>>;
};

export type TranslationFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly key_exists?: Maybe<Scalars['Boolean']>;
  readonly key?: Maybe<Scalars['String']>;
  readonly key_not?: Maybe<Scalars['String']>;
  readonly key_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly key_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly key_contains?: Maybe<Scalars['String']>;
  readonly key_not_contains?: Maybe<Scalars['String']>;
  readonly value_exists?: Maybe<Scalars['Boolean']>;
  readonly value?: Maybe<Scalars['String']>;
  readonly value_not?: Maybe<Scalars['String']>;
  readonly value_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly value_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly value_contains?: Maybe<Scalars['String']>;
  readonly value_not_contains?: Maybe<Scalars['String']>;
  readonly complete_exists?: Maybe<Scalars['Boolean']>;
  readonly complete?: Maybe<Scalars['Boolean']>;
  readonly complete_not?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<TranslationFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<TranslationFilter>>>;
};

export type TranslationInfoLabel = Entry & {
  readonly __typename?: 'TranslationInfoLabel';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<TranslationInfoLabelLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly labelKey?: Maybe<Scalars['String']>;
  readonly translation?: Maybe<Scalars['String']>;
  readonly textColor?: Maybe<Color>;
  readonly backgroundColor?: Maybe<Color>;
  readonly icon?: Maybe<Icon>;
};


export type TranslationInfoLabelLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type TranslationInfoLabelTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type TranslationInfoLabelLabelKeyArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type TranslationInfoLabelTranslationArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type TranslationInfoLabelTextColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TranslationInfoLabelBackgroundColorArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TranslationInfoLabelIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type TranslationInfoLabelCollection = {
  readonly __typename?: 'TranslationInfoLabelCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<TranslationInfoLabel>>;
};

export type TranslationInfoLabelFilter = {
  readonly textColor?: Maybe<CfColorNestedFilter>;
  readonly backgroundColor?: Maybe<CfColorNestedFilter>;
  readonly icon?: Maybe<CfIconNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly labelKey_exists?: Maybe<Scalars['Boolean']>;
  readonly labelKey?: Maybe<Scalars['String']>;
  readonly labelKey_not?: Maybe<Scalars['String']>;
  readonly labelKey_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly labelKey_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly labelKey_contains?: Maybe<Scalars['String']>;
  readonly labelKey_not_contains?: Maybe<Scalars['String']>;
  readonly translation_exists?: Maybe<Scalars['Boolean']>;
  readonly translation?: Maybe<Scalars['String']>;
  readonly translation_not?: Maybe<Scalars['String']>;
  readonly translation_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly translation_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly translation_contains?: Maybe<Scalars['String']>;
  readonly translation_not_contains?: Maybe<Scalars['String']>;
  readonly textColor_exists?: Maybe<Scalars['Boolean']>;
  readonly backgroundColor_exists?: Maybe<Scalars['Boolean']>;
  readonly icon_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<TranslationInfoLabelFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<TranslationInfoLabelFilter>>>;
};

export type TranslationInfoLabelLinkingCollections = {
  readonly __typename?: 'TranslationInfoLabelLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly promotionCollection?: Maybe<PromotionCollection>;
  readonly filterItemCollection?: Maybe<FilterItemCollection>;
};


export type TranslationInfoLabelLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TranslationInfoLabelLinkingCollectionsPromotionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TranslationInfoLabelLinkingCollectionsFilterItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum TranslationInfoLabelOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  LabelKeyAsc = 'labelKey_ASC',
  LabelKeyDesc = 'labelKey_DESC',
  TranslationAsc = 'translation_ASC',
  TranslationDesc = 'translation_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type TranslationLinkingCollections = {
  readonly __typename?: 'TranslationLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly promotionCollection?: Maybe<PromotionCollection>;
  readonly filterItemCollection?: Maybe<FilterItemCollection>;
};


export type TranslationLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TranslationLinkingCollectionsPromotionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TranslationLinkingCollectionsFilterItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum TranslationOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  CompleteAsc = 'complete_ASC',
  CompleteDesc = 'complete_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Usp = Entry & {
  readonly __typename?: 'Usp';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<UspLinkingCollections>;
  readonly text?: Maybe<Scalars['String']>;
  readonly icon?: Maybe<Icon>;
};


export type UspLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type UspTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type UspIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type UspCollection = {
  readonly __typename?: 'UspCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Usp>>;
};

export type UspFilter = {
  readonly icon?: Maybe<CfIconNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly text_exists?: Maybe<Scalars['Boolean']>;
  readonly text?: Maybe<Scalars['String']>;
  readonly text_not?: Maybe<Scalars['String']>;
  readonly text_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly text_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly text_contains?: Maybe<Scalars['String']>;
  readonly text_not_contains?: Maybe<Scalars['String']>;
  readonly icon_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<UspFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<UspFilter>>>;
};

export type UspLinkingCollections = {
  readonly __typename?: 'UspLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly uspsCardCollection?: Maybe<UspsCardCollection>;
};


export type UspLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type UspLinkingCollectionsUspsCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum UspOrder {
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type UspsCard = Entry & {
  readonly __typename?: 'UspsCard';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<UspsCardLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly uspsCollection?: Maybe<UspsCardUspsCollection>;
};


export type UspsCardLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type UspsCardTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type UspsCardUspsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type UspsCardCollection = {
  readonly __typename?: 'UspsCardCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<UspsCard>>;
};

export type UspsCardFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly uspsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<UspsCardFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<UspsCardFilter>>>;
};

export type UspsCardLinkingCollections = {
  readonly __typename?: 'UspsCardLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type UspsCardLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type UspsCardLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum UspsCardOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type UspsCardUspsCollection = {
  readonly __typename?: 'UspsCardUspsCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<Usp>>;
};

export type VoucherCode = Entry & {
  readonly __typename?: 'VoucherCode';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<VoucherCodeLinkingCollections>;
  readonly newTitle?: Maybe<VoucherCodeNewTitle>;
  readonly code?: Maybe<Scalars['String']>;
  readonly discount?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly icon?: Maybe<Icon>;
};


export type VoucherCodeLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type VoucherCodeNewTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodeCodeArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodeDiscountArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodeDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodeTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodeIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type VoucherCodeCollection = {
  readonly __typename?: 'VoucherCodeCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<VoucherCode>>;
};

export type VoucherCodeFilter = {
  readonly icon?: Maybe<CfIconNestedFilter>;
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly newTitle_exists?: Maybe<Scalars['Boolean']>;
  readonly newTitle_contains?: Maybe<Scalars['String']>;
  readonly newTitle_not_contains?: Maybe<Scalars['String']>;
  readonly code_exists?: Maybe<Scalars['Boolean']>;
  readonly code?: Maybe<Scalars['String']>;
  readonly code_not?: Maybe<Scalars['String']>;
  readonly code_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly code_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly code_contains?: Maybe<Scalars['String']>;
  readonly code_not_contains?: Maybe<Scalars['String']>;
  readonly discount_exists?: Maybe<Scalars['Boolean']>;
  readonly discount?: Maybe<Scalars['String']>;
  readonly discount_not?: Maybe<Scalars['String']>;
  readonly discount_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly discount_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly discount_contains?: Maybe<Scalars['String']>;
  readonly discount_not_contains?: Maybe<Scalars['String']>;
  readonly description_exists?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly description_not?: Maybe<Scalars['String']>;
  readonly description_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_contains?: Maybe<Scalars['String']>;
  readonly description_not_contains?: Maybe<Scalars['String']>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly icon_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<VoucherCodeFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<VoucherCodeFilter>>>;
};

export type VoucherCodeLinkingCollections = {
  readonly __typename?: 'VoucherCodeLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly voucherCodesCollection?: Maybe<VoucherCodesCollection>;
};


export type VoucherCodeLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodeLinkingCollectionsVoucherCodesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type VoucherCodeNewTitle = {
  readonly __typename?: 'VoucherCodeNewTitle';
  readonly json: Scalars['JSON'];
  readonly links: VoucherCodeNewTitleLinks;
};

export type VoucherCodeNewTitleAssets = {
  readonly __typename?: 'VoucherCodeNewTitleAssets';
  readonly hyperlink: ReadonlyArray<Maybe<Asset>>;
  readonly block: ReadonlyArray<Maybe<Asset>>;
};

export type VoucherCodeNewTitleEntries = {
  readonly __typename?: 'VoucherCodeNewTitleEntries';
  readonly inline: ReadonlyArray<Maybe<Entry>>;
  readonly hyperlink: ReadonlyArray<Maybe<Entry>>;
  readonly block: ReadonlyArray<Maybe<Entry>>;
};

export type VoucherCodeNewTitleLinks = {
  readonly __typename?: 'VoucherCodeNewTitleLinks';
  readonly entries: VoucherCodeNewTitleEntries;
  readonly assets: VoucherCodeNewTitleAssets;
};

export enum VoucherCodeOrder {
  CodeAsc = 'code_ASC',
  CodeDesc = 'code_DESC',
  DiscountAsc = 'discount_ASC',
  DiscountDesc = 'discount_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type VoucherCodes = Entry & {
  readonly __typename?: 'VoucherCodes';
  readonly sys: Sys;
  readonly contentfulMetadata: ContentfulMetadata;
  readonly linkedFrom?: Maybe<VoucherCodesLinkingCollections>;
  readonly title?: Maybe<Scalars['String']>;
  readonly voucherCodesCollection?: Maybe<VoucherCodesVoucherCodesCollection>;
};


export type VoucherCodesLinkedFromArgs = {
  allowedLocales?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};


export type VoucherCodesTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodesVoucherCodesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type VoucherCodesCollection = {
  readonly __typename?: 'VoucherCodesCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<VoucherCodes>>;
};

export type VoucherCodesFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly voucherCodesCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<VoucherCodesFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<VoucherCodesFilter>>>;
};

export type VoucherCodesLinkingCollections = {
  readonly __typename?: 'VoucherCodesLinkingCollections';
  readonly entryCollection?: Maybe<EntryCollection>;
  readonly pageCollection?: Maybe<PageCollection>;
};


export type VoucherCodesLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type VoucherCodesLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum VoucherCodesOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type VoucherCodesVoucherCodesCollection = {
  readonly __typename?: 'VoucherCodesVoucherCodesCollection';
  readonly total: Scalars['Int'];
  readonly skip: Scalars['Int'];
  readonly limit: Scalars['Int'];
  readonly items: ReadonlyArray<Maybe<VoucherCode>>;
};

export type CfAddressNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly streetAddress_exists?: Maybe<Scalars['Boolean']>;
  readonly streetAddress?: Maybe<Scalars['String']>;
  readonly streetAddress_not?: Maybe<Scalars['String']>;
  readonly streetAddress_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly streetAddress_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly streetAddress_contains?: Maybe<Scalars['String']>;
  readonly streetAddress_not_contains?: Maybe<Scalars['String']>;
  readonly addressLocality_exists?: Maybe<Scalars['Boolean']>;
  readonly addressLocality?: Maybe<Scalars['String']>;
  readonly addressLocality_not?: Maybe<Scalars['String']>;
  readonly addressLocality_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressLocality_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressLocality_contains?: Maybe<Scalars['String']>;
  readonly addressLocality_not_contains?: Maybe<Scalars['String']>;
  readonly addressRegion_exists?: Maybe<Scalars['Boolean']>;
  readonly addressRegion?: Maybe<Scalars['String']>;
  readonly addressRegion_not?: Maybe<Scalars['String']>;
  readonly addressRegion_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressRegion_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressRegion_contains?: Maybe<Scalars['String']>;
  readonly addressRegion_not_contains?: Maybe<Scalars['String']>;
  readonly postalCode_exists?: Maybe<Scalars['Boolean']>;
  readonly postalCode?: Maybe<Scalars['String']>;
  readonly postalCode_not?: Maybe<Scalars['String']>;
  readonly postalCode_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly postalCode_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly postalCode_contains?: Maybe<Scalars['String']>;
  readonly postalCode_not_contains?: Maybe<Scalars['String']>;
  readonly addressCountry_exists?: Maybe<Scalars['Boolean']>;
  readonly addressCountry?: Maybe<Scalars['String']>;
  readonly addressCountry_not?: Maybe<Scalars['String']>;
  readonly addressCountry_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressCountry_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly addressCountry_contains?: Maybe<Scalars['String']>;
  readonly addressCountry_not_contains?: Maybe<Scalars['String']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfAddressNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfAddressNestedFilter>>>;
};

export type CfCategoryNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly level_exists?: Maybe<Scalars['Boolean']>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly level_not?: Maybe<Scalars['Int']>;
  readonly level_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly level_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly level_gt?: Maybe<Scalars['Int']>;
  readonly level_gte?: Maybe<Scalars['Int']>;
  readonly level_lt?: Maybe<Scalars['Int']>;
  readonly level_lte?: Maybe<Scalars['Int']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly subcategoriesCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly color_exists?: Maybe<Scalars['Boolean']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfCategoryNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfCategoryNestedFilter>>>;
};

export type CfColorNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly ref_exists?: Maybe<Scalars['Boolean']>;
  readonly ref?: Maybe<Scalars['String']>;
  readonly ref_not?: Maybe<Scalars['String']>;
  readonly ref_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_contains?: Maybe<Scalars['String']>;
  readonly ref_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfColorNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfColorNestedFilter>>>;
};

export type CfFooterProvidersBlockNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly content_exists?: Maybe<Scalars['Boolean']>;
  readonly content_contains?: Maybe<Scalars['String']>;
  readonly content_not_contains?: Maybe<Scalars['String']>;
  readonly iconsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly linksCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfFooterProvidersBlockNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfFooterProvidersBlockNestedFilter>>>;
};

export type CfIconNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly ref_exists?: Maybe<Scalars['Boolean']>;
  readonly ref?: Maybe<Scalars['String']>;
  readonly ref_not?: Maybe<Scalars['String']>;
  readonly ref_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ref_contains?: Maybe<Scalars['String']>;
  readonly ref_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfIconNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfIconNestedFilter>>>;
};

export type CfLinkNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly label_exists?: Maybe<Scalars['Boolean']>;
  readonly label?: Maybe<Scalars['String']>;
  readonly label_not?: Maybe<Scalars['String']>;
  readonly label_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly label_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly label_contains?: Maybe<Scalars['String']>;
  readonly label_not_contains?: Maybe<Scalars['String']>;
  readonly url_exists?: Maybe<Scalars['Boolean']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly url_not?: Maybe<Scalars['String']>;
  readonly url_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly url_contains?: Maybe<Scalars['String']>;
  readonly url_not_contains?: Maybe<Scalars['String']>;
  readonly icon_exists?: Maybe<Scalars['Boolean']>;
  readonly content_exists?: Maybe<Scalars['Boolean']>;
  readonly content_contains?: Maybe<Scalars['String']>;
  readonly content_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfLinkNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfLinkNestedFilter>>>;
};

export type CfMenuNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly itemsCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly id_exists?: Maybe<Scalars['Boolean']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly id_not?: Maybe<Scalars['String']>;
  readonly id_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id_contains?: Maybe<Scalars['String']>;
  readonly id_not_contains?: Maybe<Scalars['String']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfMenuNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfMenuNestedFilter>>>;
};

export type CfPageNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly isCampaignPage_exists?: Maybe<Scalars['Boolean']>;
  readonly isCampaignPage?: Maybe<Scalars['Boolean']>;
  readonly isCampaignPage_not?: Maybe<Scalars['Boolean']>;
  readonly pageType_exists?: Maybe<Scalars['Boolean']>;
  readonly pageType?: Maybe<Scalars['String']>;
  readonly pageType_not?: Maybe<Scalars['String']>;
  readonly pageType_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageType_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pageType_contains?: Maybe<Scalars['String']>;
  readonly pageType_not_contains?: Maybe<Scalars['String']>;
  readonly referencedContent_exists?: Maybe<Scalars['Boolean']>;
  readonly heroHeader_exists?: Maybe<Scalars['Boolean']>;
  readonly contentBlocksCollection_exists?: Maybe<Scalars['Boolean']>;
  readonly seo_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfPageNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfPageNestedFilter>>>;
};

export type CfSeoNestedFilter = {
  readonly sys?: Maybe<SysFilter>;
  readonly contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  readonly title_exists?: Maybe<Scalars['Boolean']>;
  readonly title?: Maybe<Scalars['String']>;
  readonly title_not?: Maybe<Scalars['String']>;
  readonly title_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly title_contains?: Maybe<Scalars['String']>;
  readonly title_not_contains?: Maybe<Scalars['String']>;
  readonly noIndex_exists?: Maybe<Scalars['Boolean']>;
  readonly noIndex?: Maybe<Scalars['Boolean']>;
  readonly noIndex_not?: Maybe<Scalars['Boolean']>;
  readonly noFollow_exists?: Maybe<Scalars['Boolean']>;
  readonly noFollow?: Maybe<Scalars['Boolean']>;
  readonly noFollow_not?: Maybe<Scalars['Boolean']>;
  readonly description_exists?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly description_not?: Maybe<Scalars['String']>;
  readonly description_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly description_contains?: Maybe<Scalars['String']>;
  readonly description_not_contains?: Maybe<Scalars['String']>;
  readonly keywords_exists?: Maybe<Scalars['Boolean']>;
  readonly keywords?: Maybe<Scalars['String']>;
  readonly keywords_not?: Maybe<Scalars['String']>;
  readonly keywords_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly keywords_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly keywords_contains?: Maybe<Scalars['String']>;
  readonly keywords_not_contains?: Maybe<Scalars['String']>;
  readonly image_exists?: Maybe<Scalars['Boolean']>;
  readonly header_exists?: Maybe<Scalars['Boolean']>;
  readonly header?: Maybe<Scalars['String']>;
  readonly header_not?: Maybe<Scalars['String']>;
  readonly header_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly header_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly header_contains?: Maybe<Scalars['String']>;
  readonly header_not_contains?: Maybe<Scalars['String']>;
  readonly copy_exists?: Maybe<Scalars['Boolean']>;
  readonly copy_contains?: Maybe<Scalars['String']>;
  readonly copy_not_contains?: Maybe<Scalars['String']>;
  readonly copyExpandable_exists?: Maybe<Scalars['Boolean']>;
  readonly copyExpandable_contains?: Maybe<Scalars['String']>;
  readonly copyExpandable_not_contains?: Maybe<Scalars['String']>;
  readonly slug_exists?: Maybe<Scalars['Boolean']>;
  readonly slug?: Maybe<Scalars['String']>;
  readonly slug_not?: Maybe<Scalars['String']>;
  readonly slug_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_not_in?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly slug_contains?: Maybe<Scalars['String']>;
  readonly slug_not_contains?: Maybe<Scalars['String']>;
  readonly link_exists?: Maybe<Scalars['Boolean']>;
  readonly OR?: Maybe<ReadonlyArray<Maybe<CfSeoNestedFilter>>>;
  readonly AND?: Maybe<ReadonlyArray<Maybe<CfSeoNestedFilter>>>;
};

export const BrandId = gql`
    fragment brandId on Brand {
  id
}
    `;
export const MenuItem = gql`
    fragment menuItem on MenuItem {
  __typename
  id
  title
  link {
    ... on Page {
      __typename
      title
      slug
    }
    ... on Link {
      __typename
      url
      label
    }
  }
}
    `;
export const Menu = gql`
    fragment menu on MenuCollection {
  __typename
  items {
    __typename
    title
    id
    itemsCollection {
      __typename
      items {
        ...menuItem
      }
    }
  }
}
    ${MenuItem}`;
export const HeroBanner = gql`
    fragment heroBanner on HeroBanner {
  heroBannerTitle: newTitle
  searchPlaceholder
  isSponsoredContent
  link {
    __typename
    label
    url
    icon {
      __typename
      ref
    }
    content {
      __typename
      json
    }
  }
  text {
    __typename
    json
  }
  imageAsset {
    __typename
    title
    description
    url
  }
}
    `;
export const CampaignHeroBanner = gql`
    fragment campaignHeroBanner on CampaignHeroBanner {
  title
  altTitle
  description {
    __typename
    json
  }
  isSponsoredContent
  finishingDate
  backgroundColor {
    __typename
    ref
  }
  image {
    __typename
    title
    url
  }
  campaignUrl: url
}
    `;
export const Slider = gql`
    fragment slider on Slider {
  name
  contentBlocksCollection(limit: 5) {
    items {
      __typename
      heroBannerTitle: newTitle
      searchPlaceholder
      isSponsoredContent
      link {
        __typename
        label
        url
        icon {
          __typename
          ref
        }
        content {
          __typename
          json
        }
      }
      text {
        __typename
        json
      }
      imageAsset {
        __typename
        url
        title
        description
      }
    }
  }
}
    `;
export const CategoryTile = gql`
    fragment categoryTile on CategoryTile {
  __typename
  title
  color
  url
  imageAsset {
    __typename
    title
    description
    url
  }
  titleColor {
    ref
  }
}
    `;
export const CategoryGrid = gql`
    fragment categoryGrid on CategoryGrid {
  title
  itemsCollection(limit: 20) {
    items {
      ...categoryTile
    }
  }
  viewType
}
    ${CategoryTile}`;
export const ContentBlockWithImage = gql`
    fragment contentBlockWithImage on ContentBlockWithImage {
  title
  header
  sponsored
  image {
    __typename
    title
    description
    url
    contentType
  }
  imageLeft
  content {
    __typename
    json
  }
  cta {
    __typename
    label
    url
    icon {
      __typename
      ref
    }
    content {
      __typename
      json
    }
  }
  textLink {
    __typename
    label
    url
    icon {
      __typename
      ref
    }
    content {
      __typename
      json
    }
  }
  bgColor {
    __typename
    ref
  }
  textColor {
    __typename
    ref
  }
  typography
  imageSize
  txtAlignMobile
  showDesc
  btnType
  btnWidthMobile
  btnPosTablet
}
    `;
export const Usp = gql`
    fragment usp on Usp {
  icon {
    __typename
    ref
  }
  text
}
    `;
export const UspsCard = gql`
    fragment uspsCard on UspsCard {
  title
  uspsCollection(limit: 5) {
    items {
      __typename
      ...usp
    }
  }
}
    ${Usp}`;
export const VoucherCode = gql`
    fragment voucherCode on VoucherCode {
  icon {
    __typename
    ref
  }
  voucherRichTextTitle: newTitle {
    __typename
    json
  }
  title
  description
  code
  discount
}
    `;
export const VoucherCodes = gql`
    fragment voucherCodes on VoucherCodes {
  title
  voucherCodesCollection(limit: 3) {
    items {
      __typename
      ...voucherCode
    }
  }
}
    ${VoucherCode}`;
export const Promo = gql`
    fragment promo on Promotion {
  id
}
    `;
export const Promotion = gql`
    fragment promotion on Promotion {
  __typename
  sys {
    firstPublishedAt
  }
  title
  id
  itemsToFilterBy
  description {
    __typename
    json
  }
  sponsored
  promoInformation {
    __typename
    json
  }
  teaserDescription
  color {
    __typename
    ref
  }
  image {
    __typename
    url
  }
  teaserImage {
    __typename
    url
  }
  categoriesCollection(limit: 5) {
    items {
      __typename
      id
    }
  }
  isContentWithImage: teaserType
  validFrom
  validTo
  labelsCollection(limit: 2) {
    items {
      __typename
      ... on Translation {
        key
        value
      }
      ... on TranslationInfoLabel {
        key: labelKey
        value: title
      }
    }
  }
  url: linkedFrom(allowedLocales: $allLocales) {
    pageCollection(limit: 35, locale: $locale) {
      items {
        slug
        referencedContent {
          __typename
          ...promo
        }
      }
    }
  }
}
    ${Promo}`;
export const StaticContentBlock = gql`
    fragment staticContentBlock on StaticContentBlock {
  title
  content {
    json
  }
  icon {
    __typename
    ref
  }
}
    `;
export const StaticHeaderBlock = gql`
    fragment staticHeaderBlock on StaticHeaderBlock {
  title
}
    `;
export const ExponeaRecommendation = gql`
    fragment exponeaRecommendation on ExponeaRecommendation {
  title
  altTitle
  id
  type
  isSlider
  quantity
}
    `;
export const MarketingTeaser = gql`
    fragment marketingTeaser on MarketingTeaser {
  __typename
  title
  teaserDescription
  sponsored
  logo {
    __typename
    url
  }
  text
  color {
    __typename
    ref
  }
  fullWidth
  image {
    __typename
    url
  }
  bgColor {
    __typename
    ref
  }
  button
  slug
}
    `;
export const ContainerOfContentBlocks = gql`
    fragment containerOfContentBlocks on ContainerOfContentBlocks {
  title
  showTitle
  hasMargin
  contentCollection(limit: 2) {
    items {
      __typename
      ... on Promotion {
        title
        id
        sponsored
        description {
          __typename
          json
        }
        teaserDescription
        color {
          __typename
          ref
        }
        image {
          __typename
          url
        }
        teaserImage {
          __typename
          url
        }
        categoriesCollection(limit: 5) {
          items {
            __typename
            id
          }
        }
        labelsCollection(limit: 2) {
          items {
            __typename
            ... on Translation {
              key
              value
            }
            ... on TranslationInfoLabel {
              key: labelKey
              value: title
            }
          }
        }
        isContentWithImage: teaserType
        validFrom
        validTo
        url: linkedFrom(allowedLocales: $allLocales) {
          pageCollection(limit: 35, locale: $locale) {
            items {
              slug
              referencedContent {
                __typename
                ... on Promotion {
                  id
                }
              }
            }
          }
        }
      }
      ...marketingTeaser
    }
  }
}
    ${MarketingTeaser}`;
export const GroupOfStaticContentBlocks = gql`
    fragment groupOfStaticContentBlocks on GroupOfStaticContentBlocks {
  __typename
  title
  staticContentBlocksCollection(limit: 20) {
    items {
      ... on StaticContentBlock {
        __typename
        title
        content {
          json
        }
        icon {
          __typename
          ref
        }
      }
      ... on ContentBlockWithImage {
        __typename
        title
        header
        sponsored
        image {
          __typename
          title
          description
          url
          contentType
        }
        imageLeft
        content {
          __typename
          json
        }
        cta {
          __typename
          label
          url
          icon {
            __typename
            ref
          }
          content {
            __typename
            json
          }
        }
        textLink {
          __typename
          label
          url
          icon {
            __typename
            ref
          }
          content {
            __typename
            json
          }
        }
        bgColor {
          __typename
          ref
        }
        textColor {
          __typename
          ref
        }
      }
    }
  }
  type
}
    `;
export const TopBrands = gql`
    fragment topBrands on TopBrands {
  title
  brandsCollection(limit: 10) {
    items {
      title
      url: linkedFrom(allowedLocales: $allLocales) {
        pageCollection(limit: 2, locale: $locale) {
          items {
            slug
          }
        }
      }
      logoImage {
        url
      }
    }
  }
}
    `;
export const LinkBlock = gql`
    fragment linkBlock on LinkBlock {
  __typename
  title
  isCta
  link {
    __typename
    label
    url
    icon {
      ref
    }
  }
}
    `;
export const StaticRecommendationBlock = gql`
    fragment staticRecommendationBlock on StaticRecommendationBlock {
  title
  showTitle
  skuList
  view
  showCount
  countExpire
}
    `;
export const Brand = gql`
    fragment brand on Brand {
  title
  id
  image {
    __typename
    url
  }
  logoImage {
    __typename
    url
  }
}
    `;
export const Category = gql`
    fragment category on Category {
  title
  id
  color {
    __typename
    ref
  }
  image {
    __typename
    url
  }
  level
  subcategories: subcategoriesCollection {
    items {
      id
      title
      level
      linkedFrom(allowedLocales: $allLocales) {
        pageCollection(limit: 1, locale: $locale) {
          items {
            slug
            title
          }
        }
      }
    }
  }
  linkedFrom(allowedLocales: $allLocales) {
    categoryCollection(limit: 1, locale: $locale) {
      items {
        id
        title
        linkedFrom(allowedLocales: $allLocales) {
          categoryCollection(limit: 1, locale: $locale) {
            items {
              id
              title
              linkedFrom(allowedLocales: $allLocales) {
                pageCollection(limit: 1, locale: $locale) {
                  items {
                    slug
                  }
                }
              }
            }
          }
          pageCollection(limit: 1, locale: $locale) {
            items {
              slug
            }
          }
        }
        linkedFrom(allowedLocales: $allLocales) {
          pageCollection(limit: 1, locale: $locale) {
            items {
              slug
            }
          }
        }
      }
    }
    pageCollection(limit: 1, locale: $locale) {
      items {
        slug
      }
    }
  }
  linkedFrom(allowedLocales: $allLocales) {
    pageCollection(limit: 1, locale: $locale) {
      items {
        slug
      }
    }
  }
}
    `;
export const CategoryCop = gql`
    fragment categoryCop on CategoryCop {
  __typename
  title
  linkedCategory {
    id
    title
    subcategoriesCollection(limit: 25) {
      items {
        id
        title
        level
        linkedFrom(allowedLocales: $allLocales) {
          pageCollection(limit: 1, locale: $locale) {
            items {
              slug
            }
          }
        }
      }
    }
    image {
      __typename
      title
      description
      url
      contentType
    }
    color {
      __typename
      ref
    }
    categoryPageSlug: linkedFrom(allowedLocales: $allLocales) {
      pageCollection(limit: 1, locale: $locale) {
        items {
          slug
        }
      }
    }
  }
  linkedPromotionsCollection(limit: 4) {
    __typename
    items {
      ... on Promotion {
        __typename
        sys {
          firstPublishedAt
        }
        title
        id
        itemsToFilterBy
        description {
          __typename
          json
        }
        promoInformation {
          __typename
          json
        }
        teaserDescription
        color {
          __typename
          ref
        }
        image {
          __typename
          url
        }
        teaserImage {
          __typename
          url
        }
        categoriesCollection(limit: 5) {
          items {
            __typename
            id
          }
        }
        isContentWithImage: teaserType
        validFrom
        validTo
        labelsCollection(limit: 2) {
          items {
            __typename
            ... on Translation {
              key
              value
            }
            ... on TranslationInfoLabel {
              key: labelKey
              value: title
            }
          }
        }
        url: linkedFrom(allowedLocales: $allLocales) {
          pageCollection(limit: 35, locale: $locale) {
            items {
              slug
              referencedContent {
                __typename
                ... on Promotion {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const Seo = gql`
    fragment seo on Seo {
  title
  description
  keywords
  image {
    __typename
    url
  }
  header
  copy {
    __typename
    json
  }
  copyExpandable {
    __typename
    json
  }
  noIndex
  noFollow
  link {
    slug
  }
}
    `;
export const PageContent = gql`
    fragment pageContent on Page {
  __typename
  title
  slugOne: slug(locale: "pt-PT")
  slugTwo: slug(locale: "es-ES")
  heroHeader {
    __typename
    ... on HeroBanner {
      ...heroBanner
    }
    ... on CampaignHeroBanner {
      ...campaignHeroBanner
    }
  }
  contentBlocksCollection(limit: 26) {
    items {
      __typename
      ...slider
      ...heroBanner
      ...campaignHeroBanner
      ...categoryGrid
      ...contentBlockWithImage
      ...uspsCard
      ...voucherCodes
      ...promotion
      ...staticContentBlock
      ...staticHeaderBlock
      ...exponeaRecommendation
      ...containerOfContentBlocks
      ...groupOfStaticContentBlocks
      ...topBrands
      ...linkBlock
      ...staticRecommendationBlock
    }
  }
  isCampaignPage
  pageType
  referencedContent {
    __typename
    ...brand
    ...category
    ...promotion
    ...categoryCop
  }
  seo {
    __typename
    ...seo
  }
  contentfulMetadata {
    tags {
      id
    }
  }
}
    ${HeroBanner}
${CampaignHeroBanner}
${Slider}
${CategoryGrid}
${ContentBlockWithImage}
${UspsCard}
${VoucherCodes}
${Promotion}
${StaticContentBlock}
${StaticHeaderBlock}
${ExponeaRecommendation}
${ContainerOfContentBlocks}
${GroupOfStaticContentBlocks}
${TopBrands}
${LinkBlock}
${StaticRecommendationBlock}
${Brand}
${Category}
${CategoryCop}
${Seo}`;
export const ExpertSignaturesCollectionQuery = gql`
    query expertSignaturesCollectionQuery($locale: String!, $categoryId: String!) {
  expertSignatureCollection(
    locale: $locale
    where: {categories: {id: $categoryId}}
  ) {
    items {
      categories {
        id
        title
      }
      image {
        __typename
        title
        url
      }
      name
      jobTitle
      jobDescription
    }
  }
}
    `;
export const ExponeaRecommendationsCollectionQuery = gql`
    query exponeaRecommendationsCollectionQuery($locale: String!, $type: String!) {
  exponeaRecommendationCollection(locale: $locale, where: {type_contains: $type}) {
    items {
      title
      altTitle
      id
      type
      isSlider
      quantity
    }
  }
}
    `;
export const GetMenu = gql`
    query getMenu($locale: String!, $menuTitle: String!) {
  menuCollection(locale: $locale, where: {title: $menuTitle}, limit: 1) {
    ...menu
  }
}
    ${Menu}`;
export const PageFilters = gql`
    query PageFilters($slug: String!, $locale: String!, $tags: [String!]!) {
  filterPageTypeCollection(
    limit: 1
    locale: $locale
    where: {pageSlug: $slug, contentfulMetadata: {tags: {id_contains_all: $tags}}}
  ) {
    items {
      ... on FilterPageType {
        pageTypeName
        pageSlug
        pageFiltersCollection(limit: 3) {
          items {
            filterCollectionName
            filterItemsCollection(limit: 15) {
              items {
                filterItemName
                itemToFilterBy {
                  __typename
                  ... on Category {
                    id
                    title
                  }
                  ... on Translation {
                    key
                    value
                  }
                  ... on TranslationInfoLabel {
                    labelKey
                    translation
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const BrandPages = gql`
    query BrandPages($locale: String!, $tags: [String!]!) {
  pageCollection(
    locale: $locale
    where: {referencedContent_exists: true, pageType_contains: "brand", contentfulMetadata: {tags: {id_contains_all: $tags}}}
    order: [title_ASC]
    limit: 2000
  ) {
    total
    items {
      __typename
      referencedContent {
        __typename
        ...brand
      }
      slug
    }
  }
}
    ${Brand}`;
export const ProductBrand = gql`
    query ProductBrand($locale: String!, $allLocales: [String!]!, $id: String) {
  brandCollection(where: {id: $id}) {
    items {
      title
      linkedFrom(allowedLocales: $allLocales) {
        pageCollection(limit: 1, locale: $locale) {
          items {
            slug
          }
        }
      }
    }
  }
}
    `;
export const PromotionById = gql`
    query PromotionById($locale: String!, $tags: [String!]!, $id: String!) {
  promotionCollection(
    locale: $locale
    where: {contentfulMetadata: {tags: {id_contains_all: $tags}}, id: $id}
  ) {
    total
    items {
      __typename
      ... on Promotion {
        promoInformation {
          json
        }
      }
    }
  }
}
    `;
export const Promotions = gql`
    query Promotions($locale: String!, $allLocales: [String!]!, $limit: Int, $skip: Int, $where: PromotionFilter!) {
  promotionCollection(
    locale: $locale
    where: $where
    order: [weight_ASC, validFrom_DESC, sys_publishedAt_DESC]
    limit: $limit
    skip: $skip
  ) {
    total
    items {
      __typename
      ...promotion
    }
  }
}
    ${Promotion}`;
export const SeoBlock = gql`
    query SeoBlock($locale: String!, $tags: [String!]!, $slug: String!) {
  seoCollection(
    locale: $locale
    where: {slug: $slug, contentfulMetadata: {tags: {id_contains_all: $tags}}}
  ) {
    items {
      title
      description
      keywords
      image {
        url
      }
      header
      copy {
        json
      }
      copyExpandable {
        json
      }
      noIndex
      noFollow
      link {
        slug
      }
    }
  }
}
    `;
export const Page = gql`
    query Page($preview: Boolean!, $locale: String!, $slug: String!, $allLocales: [String!]!, $tags: [String!]!) {
  pageCollection(
    limit: 1
    preview: $preview
    locale: $locale
    where: {slug: $slug, contentfulMetadata: {tags: {id_contains_all: $tags}}}
  ) {
    items {
      ...pageContent
    }
  }
}
    ${PageContent}`;
export type BrandIdFragment = (
  { readonly __typename?: 'Brand' }
  & Pick<Brand, 'id'>
);

export type BrandFragment = (
  { readonly __typename?: 'Brand' }
  & Pick<Brand, 'title' | 'id'>
  & { readonly image?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )>, readonly logoImage?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )> }
);

export type CampaignHeroBannerFragment = (
  { readonly __typename?: 'CampaignHeroBanner' }
  & Pick<CampaignHeroBanner, 'title' | 'altTitle' | 'isSponsoredContent' | 'finishingDate'>
  & { campaignUrl: CampaignHeroBanner['url'] }
  & { readonly description?: Maybe<(
    { readonly __typename: 'CampaignHeroBannerDescription' }
    & Pick<CampaignHeroBannerDescription, 'json'>
  )>, readonly backgroundColor?: Maybe<(
    { readonly __typename: 'Color' }
    & Pick<Color, 'ref'>
  )>, readonly image?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'title' | 'url'>
  )> }
);

export type CategoryFragment = (
  { readonly __typename?: 'Category' }
  & Pick<Category, 'title' | 'id' | 'level'>
  & { readonly color?: Maybe<(
    { readonly __typename: 'Color' }
    & Pick<Color, 'ref'>
  )>, readonly image?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )>, readonly subcategories?: Maybe<(
    { readonly __typename?: 'CategorySubcategoriesCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Category' }
      & Pick<Category, 'id' | 'title' | 'level'>
      & { readonly linkedFrom?: Maybe<(
        { readonly __typename?: 'CategoryLinkingCollections' }
        & { readonly pageCollection?: Maybe<(
          { readonly __typename?: 'PageCollection' }
          & { readonly items: ReadonlyArray<Maybe<(
            { readonly __typename?: 'Page' }
            & Pick<Page, 'slug' | 'title'>
          )>> }
        )> }
      )> }
    )>> }
  )>, readonly linkedFrom?: Maybe<(
    { readonly __typename?: 'CategoryLinkingCollections' }
    & { readonly categoryCollection?: Maybe<(
      { readonly __typename?: 'CategoryCollection' }
      & { readonly items: ReadonlyArray<Maybe<(
        { readonly __typename?: 'Category' }
        & Pick<Category, 'id' | 'title'>
        & { readonly linkedFrom?: Maybe<(
          { readonly __typename?: 'CategoryLinkingCollections' }
          & { readonly categoryCollection?: Maybe<(
            { readonly __typename?: 'CategoryCollection' }
            & { readonly items: ReadonlyArray<Maybe<(
              { readonly __typename?: 'Category' }
              & Pick<Category, 'id' | 'title'>
              & { readonly linkedFrom?: Maybe<(
                { readonly __typename?: 'CategoryLinkingCollections' }
                & { readonly pageCollection?: Maybe<(
                  { readonly __typename?: 'PageCollection' }
                  & { readonly items: ReadonlyArray<Maybe<(
                    { readonly __typename?: 'Page' }
                    & Pick<Page, 'slug'>
                  )>> }
                )> }
              )> }
            )>> }
          )>, readonly pageCollection?: Maybe<(
            { readonly __typename?: 'PageCollection' }
            & { readonly items: ReadonlyArray<Maybe<(
              { readonly __typename?: 'Page' }
              & Pick<Page, 'slug'>
            )>> }
          )> }
        )> }
      )>> }
    )>, readonly pageCollection?: Maybe<(
      { readonly __typename?: 'PageCollection' }
      & { readonly items: ReadonlyArray<Maybe<(
        { readonly __typename?: 'Page' }
        & Pick<Page, 'slug'>
      )>> }
    )> }
  )> }
);

export type CategoryCopFragment = (
  { readonly __typename: 'CategoryCop' }
  & Pick<CategoryCop, 'title'>
  & { readonly linkedCategory?: Maybe<(
    { readonly __typename?: 'Category' }
    & Pick<Category, 'id' | 'title'>
    & { readonly subcategoriesCollection?: Maybe<(
      { readonly __typename?: 'CategorySubcategoriesCollection' }
      & { readonly items: ReadonlyArray<Maybe<(
        { readonly __typename?: 'Category' }
        & Pick<Category, 'id' | 'title' | 'level'>
        & { readonly linkedFrom?: Maybe<(
          { readonly __typename?: 'CategoryLinkingCollections' }
          & { readonly pageCollection?: Maybe<(
            { readonly __typename?: 'PageCollection' }
            & { readonly items: ReadonlyArray<Maybe<(
              { readonly __typename?: 'Page' }
              & Pick<Page, 'slug'>
            )>> }
          )> }
        )> }
      )>> }
    )>, readonly image?: Maybe<(
      { readonly __typename: 'Asset' }
      & Pick<Asset, 'title' | 'description' | 'url' | 'contentType'>
    )>, readonly color?: Maybe<(
      { readonly __typename: 'Color' }
      & Pick<Color, 'ref'>
    )>, readonly categoryPageSlug?: Maybe<(
      { readonly __typename?: 'CategoryLinkingCollections' }
      & { readonly pageCollection?: Maybe<(
        { readonly __typename?: 'PageCollection' }
        & { readonly items: ReadonlyArray<Maybe<(
          { readonly __typename?: 'Page' }
          & Pick<Page, 'slug'>
        )>> }
      )> }
    )> }
  )>, readonly linkedPromotionsCollection?: Maybe<(
    { readonly __typename: 'CategoryCopLinkedPromotionsCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'Promotion' }
      & Pick<Promotion, 'title' | 'id' | 'itemsToFilterBy' | 'teaserDescription' | 'validFrom' | 'validTo'>
      & { isContentWithImage: Promotion['teaserType'] }
      & { readonly sys: (
        { readonly __typename?: 'Sys' }
        & Pick<Sys, 'firstPublishedAt'>
      ), readonly description?: Maybe<(
        { readonly __typename: 'PromotionDescription' }
        & Pick<PromotionDescription, 'json'>
      )>, readonly promoInformation?: Maybe<(
        { readonly __typename: 'PromotionPromoInformation' }
        & Pick<PromotionPromoInformation, 'json'>
      )>, readonly color?: Maybe<(
        { readonly __typename: 'Color' }
        & Pick<Color, 'ref'>
      )>, readonly image?: Maybe<(
        { readonly __typename: 'Asset' }
        & Pick<Asset, 'url'>
      )>, readonly teaserImage?: Maybe<(
        { readonly __typename: 'Asset' }
        & Pick<Asset, 'url'>
      )>, readonly categoriesCollection?: Maybe<(
        { readonly __typename?: 'PromotionCategoriesCollection' }
        & { readonly items: ReadonlyArray<Maybe<(
          { readonly __typename: 'Category' }
          & Pick<Category, 'id'>
        )>> }
      )>, readonly labelsCollection?: Maybe<(
        { readonly __typename?: 'PromotionLabelsCollection' }
        & { readonly items: ReadonlyArray<Maybe<(
          { readonly __typename: 'Translation' }
          & Pick<Translation, 'key' | 'value'>
        ) | (
          { readonly __typename: 'TranslationInfoLabel' }
          & { key: TranslationInfoLabel['labelKey'], value: TranslationInfoLabel['title'] }
        )>> }
      )>, readonly url?: Maybe<(
        { readonly __typename?: 'PromotionLinkingCollections' }
        & { readonly pageCollection?: Maybe<(
          { readonly __typename?: 'PageCollection' }
          & { readonly items: ReadonlyArray<Maybe<(
            { readonly __typename?: 'Page' }
            & Pick<Page, 'slug'>
            & { readonly referencedContent?: Maybe<{ readonly __typename: 'Brand' } | { readonly __typename: 'Category' } | { readonly __typename: 'CategoryCop' } | (
              { readonly __typename: 'Promotion' }
              & Pick<Promotion, 'id'>
            )> }
          )>> }
        )> }
      )> }
    )>> }
  )> }
);

export type CategoryTileFragment = (
  { readonly __typename: 'CategoryTile' }
  & Pick<CategoryTile, 'title' | 'color' | 'url'>
  & { readonly imageAsset?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'title' | 'description' | 'url'>
  )>, readonly titleColor?: Maybe<(
    { readonly __typename?: 'Color' }
    & Pick<Color, 'ref'>
  )> }
);

export type CategoryGridFragment = (
  { readonly __typename?: 'CategoryGrid' }
  & Pick<CategoryGrid, 'title' | 'viewType'>
  & { readonly itemsCollection?: Maybe<(
    { readonly __typename?: 'CategoryGridItemsCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'CategoryTile' }
      & CategoryTileFragment
    )>> }
  )> }
);

export type ContainerOfContentBlocksFragment = (
  { readonly __typename?: 'ContainerOfContentBlocks' }
  & Pick<ContainerOfContentBlocks, 'title' | 'showTitle' | 'hasMargin'>
  & { readonly contentCollection?: Maybe<(
    { readonly __typename?: 'ContainerOfContentBlocksContentCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'MarketingTeaser' }
      & MarketingTeaserFragment
    ) | (
      { readonly __typename: 'Promotion' }
      & Pick<Promotion, 'title' | 'id' | 'sponsored' | 'teaserDescription' | 'validFrom' | 'validTo'>
      & { isContentWithImage: Promotion['teaserType'] }
      & { readonly description?: Maybe<(
        { readonly __typename: 'PromotionDescription' }
        & Pick<PromotionDescription, 'json'>
      )>, readonly color?: Maybe<(
        { readonly __typename: 'Color' }
        & Pick<Color, 'ref'>
      )>, readonly image?: Maybe<(
        { readonly __typename: 'Asset' }
        & Pick<Asset, 'url'>
      )>, readonly teaserImage?: Maybe<(
        { readonly __typename: 'Asset' }
        & Pick<Asset, 'url'>
      )>, readonly categoriesCollection?: Maybe<(
        { readonly __typename?: 'PromotionCategoriesCollection' }
        & { readonly items: ReadonlyArray<Maybe<(
          { readonly __typename: 'Category' }
          & Pick<Category, 'id'>
        )>> }
      )>, readonly labelsCollection?: Maybe<(
        { readonly __typename?: 'PromotionLabelsCollection' }
        & { readonly items: ReadonlyArray<Maybe<(
          { readonly __typename: 'Translation' }
          & Pick<Translation, 'key' | 'value'>
        ) | (
          { readonly __typename: 'TranslationInfoLabel' }
          & { key: TranslationInfoLabel['labelKey'], value: TranslationInfoLabel['title'] }
        )>> }
      )>, readonly url?: Maybe<(
        { readonly __typename?: 'PromotionLinkingCollections' }
        & { readonly pageCollection?: Maybe<(
          { readonly __typename?: 'PageCollection' }
          & { readonly items: ReadonlyArray<Maybe<(
            { readonly __typename?: 'Page' }
            & Pick<Page, 'slug'>
            & { readonly referencedContent?: Maybe<{ readonly __typename: 'Brand' } | { readonly __typename: 'Category' } | { readonly __typename: 'CategoryCop' } | (
              { readonly __typename: 'Promotion' }
              & Pick<Promotion, 'id'>
            )> }
          )>> }
        )> }
      )> }
    )>> }
  )> }
);

export type ContentBlockWithImageFragment = (
  { readonly __typename?: 'ContentBlockWithImage' }
  & Pick<ContentBlockWithImage, 'title' | 'header' | 'sponsored' | 'imageLeft' | 'typography' | 'imageSize' | 'txtAlignMobile' | 'showDesc' | 'btnType' | 'btnWidthMobile' | 'btnPosTablet'>
  & { readonly image?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'title' | 'description' | 'url' | 'contentType'>
  )>, readonly content?: Maybe<(
    { readonly __typename: 'ContentBlockWithImageContent' }
    & Pick<ContentBlockWithImageContent, 'json'>
  )>, readonly cta?: Maybe<(
    { readonly __typename: 'Link' }
    & Pick<Link, 'label' | 'url'>
    & { readonly icon?: Maybe<(
      { readonly __typename: 'Icon' }
      & Pick<Icon, 'ref'>
    )>, readonly content?: Maybe<(
      { readonly __typename: 'LinkContent' }
      & Pick<LinkContent, 'json'>
    )> }
  )>, readonly textLink?: Maybe<(
    { readonly __typename: 'Link' }
    & Pick<Link, 'label' | 'url'>
    & { readonly icon?: Maybe<(
      { readonly __typename: 'Icon' }
      & Pick<Icon, 'ref'>
    )>, readonly content?: Maybe<(
      { readonly __typename: 'LinkContent' }
      & Pick<LinkContent, 'json'>
    )> }
  )>, readonly bgColor?: Maybe<(
    { readonly __typename: 'Color' }
    & Pick<Color, 'ref'>
  )>, readonly textColor?: Maybe<(
    { readonly __typename: 'Color' }
    & Pick<Color, 'ref'>
  )> }
);

export type ExpertSignaturesCollectionQueryQueryVariables = Exact<{
  locale: Scalars['String'];
  categoryId: Scalars['String'];
}>;


export type ExpertSignaturesCollectionQueryQuery = (
  { readonly __typename?: 'Query' }
  & { readonly expertSignatureCollection?: Maybe<(
    { readonly __typename?: 'ExpertSignatureCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'ExpertSignature' }
      & Pick<ExpertSignature, 'name' | 'jobTitle' | 'jobDescription'>
      & { readonly categories?: Maybe<(
        { readonly __typename?: 'Category' }
        & Pick<Category, 'id' | 'title'>
      )>, readonly image?: Maybe<(
        { readonly __typename: 'Asset' }
        & Pick<Asset, 'title' | 'url'>
      )> }
    )>> }
  )> }
);

export type ExponeaRecommendationFragment = (
  { readonly __typename?: 'ExponeaRecommendation' }
  & Pick<ExponeaRecommendation, 'title' | 'altTitle' | 'id' | 'type' | 'isSlider' | 'quantity'>
);

export type GroupOfStaticContentBlocksFragment = (
  { readonly __typename: 'GroupOfStaticContentBlocks' }
  & Pick<GroupOfStaticContentBlocks, 'title' | 'type'>
  & { readonly staticContentBlocksCollection?: Maybe<(
    { readonly __typename?: 'GroupOfStaticContentBlocksStaticContentBlocksCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'StaticContentBlock' }
      & Pick<StaticContentBlock, 'title'>
      & { readonly content?: Maybe<(
        { readonly __typename?: 'StaticContentBlockContent' }
        & Pick<StaticContentBlockContent, 'json'>
      )>, readonly icon?: Maybe<(
        { readonly __typename: 'Icon' }
        & Pick<Icon, 'ref'>
      )> }
    ) | (
      { readonly __typename: 'ContentBlockWithImage' }
      & Pick<ContentBlockWithImage, 'title' | 'header' | 'sponsored' | 'imageLeft'>
      & { readonly image?: Maybe<(
        { readonly __typename: 'Asset' }
        & Pick<Asset, 'title' | 'description' | 'url' | 'contentType'>
      )>, readonly content?: Maybe<(
        { readonly __typename: 'ContentBlockWithImageContent' }
        & Pick<ContentBlockWithImageContent, 'json'>
      )>, readonly cta?: Maybe<(
        { readonly __typename: 'Link' }
        & Pick<Link, 'label' | 'url'>
        & { readonly icon?: Maybe<(
          { readonly __typename: 'Icon' }
          & Pick<Icon, 'ref'>
        )>, readonly content?: Maybe<(
          { readonly __typename: 'LinkContent' }
          & Pick<LinkContent, 'json'>
        )> }
      )>, readonly textLink?: Maybe<(
        { readonly __typename: 'Link' }
        & Pick<Link, 'label' | 'url'>
        & { readonly icon?: Maybe<(
          { readonly __typename: 'Icon' }
          & Pick<Icon, 'ref'>
        )>, readonly content?: Maybe<(
          { readonly __typename: 'LinkContent' }
          & Pick<LinkContent, 'json'>
        )> }
      )>, readonly bgColor?: Maybe<(
        { readonly __typename: 'Color' }
        & Pick<Color, 'ref'>
      )>, readonly textColor?: Maybe<(
        { readonly __typename: 'Color' }
        & Pick<Color, 'ref'>
      )> }
    )>> }
  )> }
);

export type HeroBannerFragment = (
  { readonly __typename?: 'HeroBanner' }
  & Pick<HeroBanner, 'searchPlaceholder' | 'isSponsoredContent'>
  & { heroBannerTitle: HeroBanner['newTitle'] }
  & { readonly link?: Maybe<(
    { readonly __typename: 'Link' }
    & Pick<Link, 'label' | 'url'>
    & { readonly icon?: Maybe<(
      { readonly __typename: 'Icon' }
      & Pick<Icon, 'ref'>
    )>, readonly content?: Maybe<(
      { readonly __typename: 'LinkContent' }
      & Pick<LinkContent, 'json'>
    )> }
  )>, readonly text?: Maybe<(
    { readonly __typename: 'HeroBannerText' }
    & Pick<HeroBannerText, 'json'>
  )>, readonly imageAsset?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'title' | 'description' | 'url'>
  )> }
);

export type LinkBlockFragment = (
  { readonly __typename: 'LinkBlock' }
  & Pick<LinkBlock, 'title' | 'isCta'>
  & { readonly link?: Maybe<(
    { readonly __typename: 'Link' }
    & Pick<Link, 'label' | 'url'>
    & { readonly icon?: Maybe<(
      { readonly __typename?: 'Icon' }
      & Pick<Icon, 'ref'>
    )> }
  )> }
);

export type MarketingTeaserFragment = (
  { readonly __typename: 'MarketingTeaser' }
  & Pick<MarketingTeaser, 'title' | 'teaserDescription' | 'sponsored' | 'text' | 'fullWidth' | 'button' | 'slug'>
  & { readonly logo?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )>, readonly color?: Maybe<(
    { readonly __typename: 'Color' }
    & Pick<Color, 'ref'>
  )>, readonly image?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )>, readonly bgColor?: Maybe<(
    { readonly __typename: 'Color' }
    & Pick<Color, 'ref'>
  )> }
);

export type MenuFragment = (
  { readonly __typename: 'MenuCollection' }
  & { readonly items: ReadonlyArray<Maybe<(
    { readonly __typename: 'Menu' }
    & Pick<Menu, 'title' | 'id'>
    & { readonly itemsCollection?: Maybe<(
      { readonly __typename: 'MenuItemsCollection' }
      & { readonly items: ReadonlyArray<Maybe<(
        { readonly __typename?: 'MenuItem' }
        & MenuItemFragment
      )>> }
    )> }
  )>> }
);

export type MenuItemFragment = (
  { readonly __typename: 'MenuItem' }
  & Pick<MenuItem, 'id' | 'title'>
  & { readonly link?: Maybe<(
    { readonly __typename: 'Link' }
    & Pick<Link, 'url' | 'label'>
  ) | (
    { readonly __typename: 'Page' }
    & Pick<Page, 'title' | 'slug'>
  )> }
);

export type PromoFragment = (
  { readonly __typename?: 'Promotion' }
  & Pick<Promotion, 'id'>
);

export type PromotionFragment = (
  { readonly __typename: 'Promotion' }
  & Pick<Promotion, 'title' | 'id' | 'itemsToFilterBy' | 'sponsored' | 'teaserDescription' | 'validFrom' | 'validTo'>
  & { isContentWithImage: Promotion['teaserType'] }
  & { readonly sys: (
    { readonly __typename?: 'Sys' }
    & Pick<Sys, 'firstPublishedAt'>
  ), readonly description?: Maybe<(
    { readonly __typename: 'PromotionDescription' }
    & Pick<PromotionDescription, 'json'>
  )>, readonly promoInformation?: Maybe<(
    { readonly __typename: 'PromotionPromoInformation' }
    & Pick<PromotionPromoInformation, 'json'>
  )>, readonly color?: Maybe<(
    { readonly __typename: 'Color' }
    & Pick<Color, 'ref'>
  )>, readonly image?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )>, readonly teaserImage?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )>, readonly categoriesCollection?: Maybe<(
    { readonly __typename?: 'PromotionCategoriesCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'Category' }
      & Pick<Category, 'id'>
    )>> }
  )>, readonly labelsCollection?: Maybe<(
    { readonly __typename?: 'PromotionLabelsCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'Translation' }
      & Pick<Translation, 'key' | 'value'>
    ) | (
      { readonly __typename: 'TranslationInfoLabel' }
      & { key: TranslationInfoLabel['labelKey'], value: TranslationInfoLabel['title'] }
    )>> }
  )>, readonly url?: Maybe<(
    { readonly __typename?: 'PromotionLinkingCollections' }
    & { readonly pageCollection?: Maybe<(
      { readonly __typename?: 'PageCollection' }
      & { readonly items: ReadonlyArray<Maybe<(
        { readonly __typename?: 'Page' }
        & Pick<Page, 'slug'>
        & { readonly referencedContent?: Maybe<{ readonly __typename: 'Brand' } | { readonly __typename: 'Category' } | { readonly __typename: 'CategoryCop' } | (
          { readonly __typename: 'Promotion' }
          & PromoFragment
        )> }
      )>> }
    )> }
  )> }
);

export type SeoFragment = (
  { readonly __typename?: 'Seo' }
  & Pick<Seo, 'title' | 'description' | 'keywords' | 'header' | 'noIndex' | 'noFollow'>
  & { readonly image?: Maybe<(
    { readonly __typename: 'Asset' }
    & Pick<Asset, 'url'>
  )>, readonly copy?: Maybe<(
    { readonly __typename: 'SeoCopy' }
    & Pick<SeoCopy, 'json'>
  )>, readonly copyExpandable?: Maybe<(
    { readonly __typename: 'SeoCopyExpandable' }
    & Pick<SeoCopyExpandable, 'json'>
  )>, readonly link?: Maybe<(
    { readonly __typename?: 'Page' }
    & Pick<Page, 'slug'>
  )> }
);

export type SliderFragment = (
  { readonly __typename?: 'Slider' }
  & Pick<Slider, 'name'>
  & { readonly contentBlocksCollection?: Maybe<(
    { readonly __typename?: 'SliderContentBlocksCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'HeroBanner' }
      & Pick<HeroBanner, 'searchPlaceholder' | 'isSponsoredContent'>
      & { heroBannerTitle: HeroBanner['newTitle'] }
      & { readonly link?: Maybe<(
        { readonly __typename: 'Link' }
        & Pick<Link, 'label' | 'url'>
        & { readonly icon?: Maybe<(
          { readonly __typename: 'Icon' }
          & Pick<Icon, 'ref'>
        )>, readonly content?: Maybe<(
          { readonly __typename: 'LinkContent' }
          & Pick<LinkContent, 'json'>
        )> }
      )>, readonly text?: Maybe<(
        { readonly __typename: 'HeroBannerText' }
        & Pick<HeroBannerText, 'json'>
      )>, readonly imageAsset?: Maybe<(
        { readonly __typename: 'Asset' }
        & Pick<Asset, 'url' | 'title' | 'description'>
      )> }
    )>> }
  )> }
);

export type StaticContentBlockFragment = (
  { readonly __typename?: 'StaticContentBlock' }
  & Pick<StaticContentBlock, 'title'>
  & { readonly content?: Maybe<(
    { readonly __typename?: 'StaticContentBlockContent' }
    & Pick<StaticContentBlockContent, 'json'>
  )>, readonly icon?: Maybe<(
    { readonly __typename: 'Icon' }
    & Pick<Icon, 'ref'>
  )> }
);

export type StaticHeaderBlockFragment = (
  { readonly __typename?: 'StaticHeaderBlock' }
  & Pick<StaticHeaderBlock, 'title'>
);

export type StaticRecommendationBlockFragment = (
  { readonly __typename?: 'StaticRecommendationBlock' }
  & Pick<StaticRecommendationBlock, 'title' | 'showTitle' | 'skuList' | 'view' | 'showCount' | 'countExpire'>
);

export type TopBrandsFragment = (
  { readonly __typename?: 'TopBrands' }
  & Pick<TopBrands, 'title'>
  & { readonly brandsCollection?: Maybe<(
    { readonly __typename?: 'TopBrandsBrandsCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Brand' }
      & Pick<Brand, 'title'>
      & { readonly url?: Maybe<(
        { readonly __typename?: 'BrandLinkingCollections' }
        & { readonly pageCollection?: Maybe<(
          { readonly __typename?: 'PageCollection' }
          & { readonly items: ReadonlyArray<Maybe<(
            { readonly __typename?: 'Page' }
            & Pick<Page, 'slug'>
          )>> }
        )> }
      )>, readonly logoImage?: Maybe<(
        { readonly __typename?: 'Asset' }
        & Pick<Asset, 'url'>
      )> }
    )>> }
  )> }
);

export type UspFragment = (
  { readonly __typename?: 'Usp' }
  & Pick<Usp, 'text'>
  & { readonly icon?: Maybe<(
    { readonly __typename: 'Icon' }
    & Pick<Icon, 'ref'>
  )> }
);

export type UspsCardFragment = (
  { readonly __typename?: 'UspsCard' }
  & Pick<UspsCard, 'title'>
  & { readonly uspsCollection?: Maybe<(
    { readonly __typename?: 'UspsCardUspsCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'Usp' }
      & UspFragment
    )>> }
  )> }
);

export type VoucherCodeFragment = (
  { readonly __typename?: 'VoucherCode' }
  & Pick<VoucherCode, 'title' | 'description' | 'code' | 'discount'>
  & { readonly icon?: Maybe<(
    { readonly __typename: 'Icon' }
    & Pick<Icon, 'ref'>
  )>, readonly voucherRichTextTitle?: Maybe<(
    { readonly __typename: 'VoucherCodeNewTitle' }
    & Pick<VoucherCodeNewTitle, 'json'>
  )> }
);

export type VoucherCodesFragment = (
  { readonly __typename?: 'VoucherCodes' }
  & Pick<VoucherCodes, 'title'>
  & { readonly voucherCodesCollection?: Maybe<(
    { readonly __typename?: 'VoucherCodesVoucherCodesCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'VoucherCode' }
      & VoucherCodeFragment
    )>> }
  )> }
);

export type ExponeaRecommendationsCollectionQueryQueryVariables = Exact<{
  locale: Scalars['String'];
  type: Scalars['String'];
}>;


export type ExponeaRecommendationsCollectionQueryQuery = (
  { readonly __typename?: 'Query' }
  & { readonly exponeaRecommendationCollection?: Maybe<(
    { readonly __typename?: 'ExponeaRecommendationCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'ExponeaRecommendation' }
      & Pick<ExponeaRecommendation, 'title' | 'altTitle' | 'id' | 'type' | 'isSlider' | 'quantity'>
    )>> }
  )> }
);

export type GetMenuQueryVariables = Exact<{
  locale: Scalars['String'];
  menuTitle: Scalars['String'];
}>;


export type GetMenuQuery = (
  { readonly __typename?: 'Query' }
  & { readonly menuCollection?: Maybe<(
    { readonly __typename?: 'MenuCollection' }
    & MenuFragment
  )> }
);

export type PageFiltersQueryVariables = Exact<{
  slug: Scalars['String'];
  locale: Scalars['String'];
  tags: ReadonlyArray<Scalars['String']> | Scalars['String'];
}>;


export type PageFiltersQuery = (
  { readonly __typename?: 'Query' }
  & { readonly filterPageTypeCollection?: Maybe<(
    { readonly __typename?: 'FilterPageTypeCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'FilterPageType' }
      & Pick<FilterPageType, 'pageTypeName' | 'pageSlug'>
      & { readonly pageFiltersCollection?: Maybe<(
        { readonly __typename?: 'FilterPageTypePageFiltersCollection' }
        & { readonly items: ReadonlyArray<Maybe<(
          { readonly __typename?: 'FilterCollection' }
          & Pick<FilterCollection, 'filterCollectionName'>
          & { readonly filterItemsCollection?: Maybe<(
            { readonly __typename?: 'FilterCollectionFilterItemsCollection' }
            & { readonly items: ReadonlyArray<Maybe<(
              { readonly __typename?: 'FilterItem' }
              & Pick<FilterItem, 'filterItemName'>
              & { readonly itemToFilterBy?: Maybe<(
                { readonly __typename: 'Category' }
                & Pick<Category, 'id' | 'title'>
              ) | (
                { readonly __typename: 'Translation' }
                & Pick<Translation, 'key' | 'value'>
              ) | (
                { readonly __typename: 'TranslationInfoLabel' }
                & Pick<TranslationInfoLabel, 'labelKey' | 'translation'>
              )> }
            )>> }
          )> }
        )>> }
      )> }
    )>> }
  )> }
);

export type BrandPagesQueryVariables = Exact<{
  locale: Scalars['String'];
  tags: ReadonlyArray<Scalars['String']> | Scalars['String'];
}>;


export type BrandPagesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly pageCollection?: Maybe<(
    { readonly __typename?: 'PageCollection' }
    & Pick<PageCollection, 'total'>
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'Page' }
      & Pick<Page, 'slug'>
      & { readonly referencedContent?: Maybe<(
        { readonly __typename: 'Brand' }
        & BrandFragment
      ) | { readonly __typename: 'Category' } | { readonly __typename: 'CategoryCop' } | { readonly __typename: 'Promotion' }> }
    )>> }
  )> }
);

export type ProductBrandQueryVariables = Exact<{
  locale: Scalars['String'];
  allLocales: ReadonlyArray<Scalars['String']> | Scalars['String'];
  id?: Maybe<Scalars['String']>;
}>;


export type ProductBrandQuery = (
  { readonly __typename?: 'Query' }
  & { readonly brandCollection?: Maybe<(
    { readonly __typename?: 'BrandCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Brand' }
      & Pick<Brand, 'title'>
      & { readonly linkedFrom?: Maybe<(
        { readonly __typename?: 'BrandLinkingCollections' }
        & { readonly pageCollection?: Maybe<(
          { readonly __typename?: 'PageCollection' }
          & { readonly items: ReadonlyArray<Maybe<(
            { readonly __typename?: 'Page' }
            & Pick<Page, 'slug'>
          )>> }
        )> }
      )> }
    )>> }
  )> }
);

export type PromotionByIdQueryVariables = Exact<{
  locale: Scalars['String'];
  tags: ReadonlyArray<Scalars['String']> | Scalars['String'];
  id: Scalars['String'];
}>;


export type PromotionByIdQuery = (
  { readonly __typename?: 'Query' }
  & { readonly promotionCollection?: Maybe<(
    { readonly __typename?: 'PromotionCollection' }
    & Pick<PromotionCollection, 'total'>
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'Promotion' }
      & { readonly promoInformation?: Maybe<(
        { readonly __typename?: 'PromotionPromoInformation' }
        & Pick<PromotionPromoInformation, 'json'>
      )> }
    )>> }
  )> }
);

export type PromotionsQueryVariables = Exact<{
  locale: Scalars['String'];
  allLocales: ReadonlyArray<Scalars['String']> | Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  where: PromotionFilter;
}>;


export type PromotionsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly promotionCollection?: Maybe<(
    { readonly __typename?: 'PromotionCollection' }
    & Pick<PromotionCollection, 'total'>
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'Promotion' }
      & PromotionFragment
    )>> }
  )> }
);

export type SeoBlockQueryVariables = Exact<{
  locale: Scalars['String'];
  tags: ReadonlyArray<Scalars['String']> | Scalars['String'];
  slug: Scalars['String'];
}>;


export type SeoBlockQuery = (
  { readonly __typename?: 'Query' }
  & { readonly seoCollection?: Maybe<(
    { readonly __typename?: 'SeoCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Seo' }
      & Pick<Seo, 'title' | 'description' | 'keywords' | 'header' | 'noIndex' | 'noFollow'>
      & { readonly image?: Maybe<(
        { readonly __typename?: 'Asset' }
        & Pick<Asset, 'url'>
      )>, readonly copy?: Maybe<(
        { readonly __typename?: 'SeoCopy' }
        & Pick<SeoCopy, 'json'>
      )>, readonly copyExpandable?: Maybe<(
        { readonly __typename?: 'SeoCopyExpandable' }
        & Pick<SeoCopyExpandable, 'json'>
      )>, readonly link?: Maybe<(
        { readonly __typename?: 'Page' }
        & Pick<Page, 'slug'>
      )> }
    )>> }
  )> }
);

export type PageContentFragment = (
  { readonly __typename: 'Page' }
  & Pick<Page, 'title' | 'isCampaignPage' | 'pageType'>
  & { slugOne: Page['slug'], slugTwo: Page['slug'] }
  & { readonly heroHeader?: Maybe<(
    { readonly __typename: 'HeroBanner' }
    & HeroBannerFragment
  ) | (
    { readonly __typename: 'CampaignHeroBanner' }
    & CampaignHeroBannerFragment
  )>, readonly contentBlocksCollection?: Maybe<(
    { readonly __typename?: 'PageContentBlocksCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename: 'CampaignHeroBanner' }
      & CampaignHeroBannerFragment
    ) | { readonly __typename: 'Category' } | (
      { readonly __typename: 'CategoryGrid' }
      & CategoryGridFragment
    ) | (
      { readonly __typename: 'ContainerOfContentBlocks' }
      & ContainerOfContentBlocksFragment
    ) | (
      { readonly __typename: 'ContentBlockWithImage' }
      & ContentBlockWithImageFragment
    ) | (
      { readonly __typename: 'ExponeaRecommendation' }
      & ExponeaRecommendationFragment
    ) | (
      { readonly __typename: 'GroupOfStaticContentBlocks' }
      & GroupOfStaticContentBlocksFragment
    ) | (
      { readonly __typename: 'HeroBanner' }
      & HeroBannerFragment
    ) | (
      { readonly __typename: 'LinkBlock' }
      & LinkBlockFragment
    ) | (
      { readonly __typename: 'Promotion' }
      & PromotionFragment
    ) | (
      { readonly __typename: 'Slider' }
      & SliderFragment
    ) | (
      { readonly __typename: 'StaticContentBlock' }
      & StaticContentBlockFragment
    ) | (
      { readonly __typename: 'StaticHeaderBlock' }
      & StaticHeaderBlockFragment
    ) | (
      { readonly __typename: 'TopBrands' }
      & TopBrandsFragment
    ) | (
      { readonly __typename: 'UspsCard' }
      & UspsCardFragment
    ) | (
      { readonly __typename: 'VoucherCodes' }
      & VoucherCodesFragment
    ) | (
      { readonly __typename: 'StaticRecommendationBlock' }
      & StaticRecommendationBlockFragment
    ) | { readonly __typename: 'ExpertSignature' }>> }
  )>, readonly referencedContent?: Maybe<(
    { readonly __typename: 'Brand' }
    & BrandFragment
  ) | (
    { readonly __typename: 'Category' }
    & CategoryFragment
  ) | (
    { readonly __typename: 'CategoryCop' }
    & CategoryCopFragment
  ) | (
    { readonly __typename: 'Promotion' }
    & PromotionFragment
  )>, readonly seo?: Maybe<(
    { readonly __typename: 'Seo' }
    & SeoFragment
  )>, readonly contentfulMetadata: (
    { readonly __typename?: 'ContentfulMetadata' }
    & { readonly tags: ReadonlyArray<Maybe<(
      { readonly __typename?: 'ContentfulTag' }
      & Pick<ContentfulTag, 'id'>
    )>> }
  ) }
);

export type PageQueryVariables = Exact<{
  preview: Scalars['Boolean'];
  locale: Scalars['String'];
  slug: Scalars['String'];
  allLocales: ReadonlyArray<Scalars['String']> | Scalars['String'];
  tags: ReadonlyArray<Scalars['String']> | Scalars['String'];
}>;


export type PageQuery = (
  { readonly __typename?: 'Query' }
  & { readonly pageCollection?: Maybe<(
    { readonly __typename?: 'PageCollection' }
    & { readonly items: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Page' }
      & PageContentFragment
    )>> }
  )> }
);
