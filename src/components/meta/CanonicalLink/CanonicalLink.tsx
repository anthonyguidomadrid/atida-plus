import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import Head from 'next/head'

export type CanonicalLinkProps = ComponentPropsWithoutRef<'link'>

export const CanonicalLink: FunctionComponent<CanonicalLinkProps> = props => (
  <Head>
    <link key="canonical" rel="canonical" {...props} />
    <meta key="og:url" property="og:url" content={props.href} />
  </Head>
)
