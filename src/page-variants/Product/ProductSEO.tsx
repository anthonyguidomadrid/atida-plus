import { Product } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import Head from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { selectProductData } from '~domains/product'
import { useSelector } from 'react-redux'

export const ProductSEO = () => {
  const { publicRuntimeConfig } = getConfig()
  const host = publicRuntimeConfig.host
  const { locale } = useRouter()
  const product = useSelector(selectProductData)

  if (!product) return null
  return (
    <Head>
      <script
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${product.name}`,
          image: `${product.largeImage}`,
          description: `${product.description}`,
          brand: {
            '@type': 'Brand',
            name: `${product.brand?.label}`
          },
          sku: `${product.sku}`,
          gtin: `${product.gtin}`,
          gtin13: `${product.gtin}`,
          offers: {
            '@type': 'Offer',
            price: `${product.price.value / 100}`,
            url: `${host}/${locale}${product.url}`,
            availability:
              product.availability === 'AVAILABLE'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            priceCurrency: `${product.price.currency}`
          },
          aggregateRating: product.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: product.rating.averageRating,
                reviewCount: product.rating.numberOfReviews
              }
            : undefined
        })}
      />
    </Head>
  )
}
