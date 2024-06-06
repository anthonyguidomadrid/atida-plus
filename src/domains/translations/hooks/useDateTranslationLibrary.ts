import { useEffect, useState } from 'react'

export function useDateTranslationLibrary(locale?: string): boolean {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function importDayJS() {
      switch (locale) {
        case 'pt-pt':
          await import('dayjs/locale/pt')
          break
        case 'es-es':
          await import('dayjs/locale/es')
          break
        case 'de-de':
          await import('dayjs/locale/de')
          break
        case 'de-at':
          await import('dayjs/locale/de-at')
          break
        case 'it-it':
          await import('dayjs/locale/it')
          break
        case 'fr-fr':
          await import('dayjs/locale/fr')
          break
        case 'en-gb':
        default:
          await import('dayjs/locale/en-gb')
          break
      }

      setIsReady(true)
    }

    importDayJS()
  }, [locale])

  return isReady
}
