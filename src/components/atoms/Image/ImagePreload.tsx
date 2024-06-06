import Head from 'next/head'
import { Fragment, FunctionComponent, useMemo } from 'react'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

const getPreconnectDomain = (src: string): string => {
  try {
    const { origin } = new URL(src)
    return origin
  } catch (e) {
    return ''
  }
}

export type ImagePreloadProps = {
  src: string
  srcSet?: string
  sizes?: string
}

export const ImagePreload: FunctionComponent<ImagePreloadProps> = ({
  src,
  srcSet,
  sizes
}) => {
  const [
    isPreconnectToAssetsEnabled,
    isPreloadLcpEnabled,
    isFetchPriorityEnabled
  ] = useFeatureFlags([
    FeatureFlag.PRECONNECT_TO_ASSETS,
    FeatureFlag.PRELOAD_LCP,
    FeatureFlag.FETCH_PRIORITY
  ])

  const origin = useMemo(() => getPreconnectDomain(src), [src])

  return (
    <Head>
      {isPreconnectToAssetsEnabled && origin && (
        <Fragment key={src}>
          <link rel="preconnect" href={origin} key={`preconnect-${origin}`} />
          <link
            rel="dns-prefetch"
            href={origin}
            key={`dnsPrefetch-${origin}`}
          />
        </Fragment>
      )}
      {isPreloadLcpEnabled && (
        <link
          data-testid="lcpPreload"
          rel="preload"
          //@ts-ignore
          fetchpriority={isFetchPriorityEnabled ? 'high' : 'auto'}
          imagesrcset={srcSet}
          href={src}
          as="image"
          imagesizes={sizes}
        />
      )}
    </Head>
  )
}
