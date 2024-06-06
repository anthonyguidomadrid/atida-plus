import Head from 'next/head'
import { FunctionComponent } from 'react'

import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export enum Fonts {
  title = 'moranga-regular',
  titleLight = 'moranga-light',

  body = 'sohne-buch',
  bodyMedium = 'sohne-kraftig',
  bodyBold = 'sohne-halbfett'
}

export type PreloadFontsProps = {
  fonts?: Fonts[]
}

export const PreloadFonts: FunctionComponent<PreloadFontsProps> = ({
  fonts
}) => {
  const [isPreloadFontsEnabled, isFetchPriorityEnabled] = useFeatureFlags([
    FeatureFlag.PRELOAD_FONTS,
    FeatureFlag.FETCH_PRIORITY
  ])
  if (!isPreloadFontsEnabled || !fonts) return null

  return (
    <Head>
      {fonts.map(font => (
        <link
          key={font}
          rel="preload"
          href={`/fonts/${font}.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          //@ts-ignore
          fetchpriority={isFetchPriorityEnabled ? 'high' : 'auto'}
        />
      ))}
    </Head>
  )
}
