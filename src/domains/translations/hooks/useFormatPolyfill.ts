import { useEffect, useState } from 'react'

// Safari Polyfills
import { shouldPolyfill as shouldLocalePolyfill } from '@formatjs/intl-locale/should-polyfill'
import { shouldPolyfill as shouldNumberFormatPolyfill } from '@formatjs/intl-numberformat/should-polyfill'
import { shouldPolyfill as shouldPluralRulesPolyfill } from '@formatjs/intl-pluralrules/should-polyfill'
import { getLanguageFromLocale } from '~helpers'

export function useFormatPolyfill(locale?: string): boolean {
  const [isReady, setIsReady] = useState(!shouldNumberFormatPolyfill())

  useEffect(() => {
    async function importPolyfill() {
      const language = getLanguageFromLocale(locale)

      if (shouldNumberFormatPolyfill()) {
        if (shouldLocalePolyfill()) {
          await import('@formatjs/intl-locale/polyfill')
        }
        if (shouldPluralRulesPolyfill()) {
          await import('@formatjs/intl-pluralrules/polyfill')
          await import(`@formatjs/intl-pluralrules/locale-data/${language}`)
        }

        await import('@formatjs/intl-numberformat/polyfill')
        await import(`@formatjs/intl-numberformat/locale-data/${language}`)
      }

      setIsReady(true)
    }

    importPolyfill()
  }, [locale])

  return isReady
}
