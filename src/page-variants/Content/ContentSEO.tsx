import { SearchAction, WebSite } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import Head from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

//https://github.com/google/schema-dts/issues/33
export type SearchActionWithQueryInput = SearchAction & {
  'query-input': string
}

export const ContentSEO = () => {
  const { publicRuntimeConfig } = getConfig()
  const host = publicRuntimeConfig.host
  const { locale } = useRouter()
  const baseUrl = `${host}/${locale}`

  return (
    <Head>
      <script
        data-testid="structured-data-home-page"
        type="application/ld+json"
        {...jsonLdScriptProps<WebSite>({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}?search={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          } as SearchActionWithQueryInput
        })}
      />
    </Head>
  )
}
