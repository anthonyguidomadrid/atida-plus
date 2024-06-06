import { AlternativeLinks } from '~domains/product'

export type AlternateLinkInPdp = { hrefLang: string; href: string }

export const getAlternateLinksInPdp = (
  locale?: string,
  productUrls?: AlternativeLinks
): AlternateLinkInPdp[] => {
  const availableUrlProducts = productUrls ?? {}

  const alternateUrlProducts = Object.keys(availableUrlProducts).map(
    productUrl => ({
      hrefLang: productUrl,
      href: `/${productUrl}/${
        availableUrlProducts[productUrl as keyof AlternativeLinks]
      }`
    })
  )

  return alternateUrlProducts.map(alternateUrlProduct => ({
    ...alternateUrlProduct,
    href: alternateUrlProduct.href as string
  }))
}
