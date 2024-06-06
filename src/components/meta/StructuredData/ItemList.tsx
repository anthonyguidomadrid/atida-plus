import { FunctionComponent } from 'react'
import { ItemList as ItemListType } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AlgoliaProduct } from '~domains/product'
import { getLocaleKey } from '~domains/translated-routes'
import getConfig from 'next/config'

export type ItemListProps = {
  products: AlgoliaProduct[]
}

const formatSlugAsUrl = (slug?: string) => (slug ? `/${slug}` : undefined)

const getUrlSlugForLocale = (
  locale?: string,
  attributes?: AlgoliaProduct['attributes']
) => {
  const localeKey = getLocaleKey(locale)

  if (localeKey && attributes?.hasOwnProperty('url_slug_' + localeKey)) {
    // @ts-ignore
    const slugAttribute = attributes[`url_slug_${localeKey}`] ?? ''
    return formatSlugAsUrl(slugAttribute)
  }

  return ''
}

export const ItemList: FunctionComponent<ItemListProps> = ({ products }) => {
  const { publicRuntimeConfig } = getConfig()
  const host = publicRuntimeConfig.host
  const { locale, asPath } = useRouter()
  const baseUrl = `${host}/${locale}`

  return (
    <Head>
      <script
        data-testid="structured-data"
        type="application/ld+json"
        {...jsonLdScriptProps<ItemListType>({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListOrder: 'Popular',
          url: `${baseUrl}${asPath}`,
          itemListElement: products.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${baseUrl}${getUrlSlugForLocale(locale, product.attributes)}`,
            name: product.name,
            image:
              product.attributes?.image_derivatives &&
              product.attributes?.image_derivatives[0]
                ?.derivative_product_tile_thumbnail
          }))
        })}
      />
    </Head>
  )
}
