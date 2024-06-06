import { FunctionComponent } from 'react'
import { Brand } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import Head from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

type BrandProps = {
  name?: string
  description?: string
  url?: string
  image?: string
}

export const BrandPageSEO: FunctionComponent<BrandProps> = ({
  name,
  description,
  url,
  image
}) => {
  const { publicRuntimeConfig } = getConfig()
  const host = publicRuntimeConfig.host
  const { locale } = useRouter()

  return (
    <Head>
      <script
        data-testid="structured-data-brand-page"
        type="application/ld+json"
        {...jsonLdScriptProps<Brand>({
          '@context': 'https://schema.org',
          '@type': 'Brand',
          name,
          description,
          url: `${host}/${locale}/${url}`,
          image
        })}
      />
    </Head>
  )
}
