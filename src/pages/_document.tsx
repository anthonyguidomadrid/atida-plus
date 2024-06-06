// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic')
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { FeatureFlag } from '~config/constants/feature-flags'
import Script from 'next/script'

let is3rdPartyScriptNewRelicEnabled = false
let is3rdPartyScriptNewRelicRecommendedImplementationEnabled = false
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () => {
      // this condition is currently needed for error pages, can remove once we implement error pages properly
      if (!global.newrelic) return originalRenderPage()

      return global.newrelic.startSegment(
        'Nextjs/renderPage//_document',
        true,
        () => {
          return originalRenderPage()
        }
      )
    }

    const getInitialProps = async () => {
      const initialProps = await Document.getInitialProps(ctx)

      const {
        loadFeatureFlags
        // eslint-disable-next-line @typescript-eslint/no-var-requires
      } = require('~helpers/server-only/featureFlagClient')
      const flags = await loadFeatureFlags(ctx.locale, [
        FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC,
        FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT,
        FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC_RECOMMENDED_IMPLEMENTATION
      ])

      is3rdPartyScriptNewRelicEnabled =
        flags[FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC]

      is3rdPartyScriptNewRelicRecommendedImplementationEnabled =
        flags[
          FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC_RECOMMENDED_IMPLEMENTATION
        ]

      const browserTimingHeader =
        is3rdPartyScriptNewRelicEnabled &&
        is3rdPartyScriptNewRelicRecommendedImplementationEnabled
          ? newrelic.getBrowserTimingHeader({
              hasToRemoveScriptWrapper: true
            })
          : undefined

      return is3rdPartyScriptNewRelicEnabled &&
        is3rdPartyScriptNewRelicRecommendedImplementationEnabled
        ? {
            ...initialProps,
            // @ts-ignore
            browserTimingHeader
          }
        : initialProps
    }

    if (!global.newrelic) return getInitialProps()

    return global.newrelic.startSegment(
      'Nextjs/getInitialProps//_document',
      true,
      async () => {
        return await getInitialProps()
      }
    )
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {is3rdPartyScriptNewRelicEnabled &&
            is3rdPartyScriptNewRelicRecommendedImplementationEnabled && (
              <Script
                type="text/javascript"
                id="new-relic-script"
                data-testid="new-relic-script"
                strategy="beforeInteractive"
              >
                {
                  // @ts-ignore
                  this.props.browserTimingHeader
                }
              </Script>
            )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
