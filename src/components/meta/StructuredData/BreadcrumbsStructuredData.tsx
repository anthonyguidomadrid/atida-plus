import { FunctionComponent } from 'react'
import { BreadcrumbList } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import Head from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

type BreadcrumbsProps = {
  breadcrumbs: {
    title?: string
    slug?: string
  }[]
}

export const BreadcrumbsStructuredData: FunctionComponent<BreadcrumbsProps> = ({
  breadcrumbs
}) => {
  const { publicRuntimeConfig } = getConfig()
  const host = publicRuntimeConfig.host
  const { locale } = useRouter()

  return (
    <Head>
      <script
        data-testid="structured-data-breadcrumbs"
        type="application/ld+json"
        {...jsonLdScriptProps<BreadcrumbList>({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs
            .filter(({ title }) => title)
            .map(({ title, slug }, index) => {
              return {
                '@type': 'ListItem',
                position: index + 1,
                name: title,
                item: slug && `${host}/${locale}/${slug}`
              }
            })
        })}
      />
    </Head>
  )
}
