import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import Head from 'next/head'
import getConfig from 'next/config'

export type AlternateLinksProps = {
  links: ComponentPropsWithoutRef<'link'>[]
}

const { publicRuntimeConfig } = getConfig()

export const AlternateLinks: FunctionComponent<AlternateLinksProps> = ({
  links
}) => {
  const host = publicRuntimeConfig.host
  return (
    <Head>
      {links.map(({ hrefLang, href, ...rest }) => (
        <link
          key={`alternate-${hrefLang}`}
          rel="alternate"
          hrefLang={hrefLang}
          href={`${host}${href}`}
          {...rest}
        />
      ))}
    </Head>
  )
}
