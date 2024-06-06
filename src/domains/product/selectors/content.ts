import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectProduct = (state: RootState) => state.server.product

export const selectProductData = createSelector(
  selectProduct,
  product => product.content.data
)

export const selectIsProductDetailsPage = createSelector(
  selectProduct,
  product => !!product.content.data
)

export const selectProductSku = createSelector(
  selectProduct,
  product => product.content.data?.sku
)

export const selectProductMainCategory = createSelector(
  selectProduct,
  product => product.content.data?.categories?.lvl0?.[0]
)

export const selectShowLabels = createSelector(
  selectProduct,
  product => product.content.showLabels
)

export const selectPDPMetaDataData = createSelector(selectProduct, product => ({
  metaTitle: product.content.data?.metaTitle,
  metaDescription: product.content.data?.metaDescription,
  metaKeywords: product.content.data?.metaKeywords,
  largeImage: product.content.data?.largeImage,
  isOnDemand: product.content.data?.isOnDemand,
  alternativeUrls: product.content.data?.alternativeUrls
}))

export const selectPDPHeaderData = createSelector(selectProduct, product => ({
  unitVolume: product.content.data?.unitVolume,
  contentSizeFactor: product.content.data?.contentSizeFactor,
  bundleSizeFactor: product.content.data?.bundleSizeFactor,
  brand: product.content.data?.brand,
  brandUrl: product.content.data?.brandUrl,
  pzn: product.content.data?.pzn,
  format: product.content.data?.format,
  name: product.content.data?.name,
  rating: product.content.data?.rating
}))

export const selectPDPDetailsData = createSelector(selectProduct, product => ({
  sku: product.content.data?.sku,
  name: product.content.data?.name,
  price: product.content.data?.price,
  images: product.content.data?.images,
  id: product.content.data?.id,
  format: product.content.data?.format,
  pricePerUnit: product.content.data?.pricePerUnit,
  brand: product.content.data?.brand,
  brandUrl: product.content.data?.brandUrl,
  rrp: product.content.data?.rrp,
  ingredients: product.content.data?.ingredients,
  usageNotes: product.content.data?.usageNotes,
  assetCertificateList: product.content.data?.assetCertificateList,
  description: product.content.data?.description,
  pharmaceuticalAdvice: product.content.data?.pharmaceuticalAdvice,
  hints: product.content.data?.hints,
  lmivStorage: product.content.data?.lmivStorage
}))

export const selectPDPSidebarData = createSelector(selectProduct, product => ({
  rrp: product.content.data?.rrp,
  price: product.content.data?.price,
  pricePerUnit: product.content.data?.pricePerUnit,
  quantityLeft: product.content.data?.quantityLeft,
  availability: product.content.data?.availability,
  isOnDemand: product.content.data?.isOnDemand,
  maxQuantity: product.content.data?.maxQuantity,
  sku: product.content.data?.sku,
  unitVolume: product.content.data?.unitVolume,
  contentSizeFactor: product.content.data?.contentSizeFactor,
  brand: product.content.data?.brand,
  categories: product.content.data?.categories
}))

export const selectPDPInfoDetailsData = createSelector(
  selectProduct,
  product => ({
    family: product.content.data?.family,
    brand: product.content.data?.brand,
    unitVolume: product.content.data?.unitVolume,
    contentSizeFactor: product.content.data?.contentSizeFactor,
    netWeight: product.content.data?.netWeight,
    pzn: product.content.data?.pzn,
    manufacturerName: product.content.data?.manufacturerName,
    format: product.content.data?.format,
    productFeaturesListMultiselect:
      product.content.data?.productFeaturesListMultiselect,
    isPharmacyExclusive: product.content.data?.isPharmacyExclusive,
    ethanolContent: product.content.data?.ethanolContent,
    isBiocide: product.content.data?.isBiocide,
    biocideBauaNumber: product.content.data?.biocideBauaNumber,
    isReimport: product.content.data?.isReimport,
    hasOrganicSealLogo: product.content.data?.hasOrganicSealLogo,
    organicControlNumber: product.content.data?.organicControlNumber,
    dietetic: product.content.data?.dietetic
  })
)
