import { MittEmitter } from 'next/dist/shared/lib/mitt'

type EventsProps = MittEmitter<
  | 'routeChangeStart'
  | 'beforeHistoryChange'
  | 'routeChangeComplete'
  | 'routeChangeError'
  | 'hashChangeStart'
  | 'hashChangeComplete'
>

export const preventScrollOnBackNavigation = (events: EventsProps): void => {
  window.history.scrollRestoration = 'manual'
  window.addEventListener('scroll', () => {
    if (typeof window === 'undefined') return
    const scrollY = window && window?.scrollY
    const scrollX = window && window?.scrollX
    events.on('routeChangeStart', () => {
      window.scrollTo(scrollX, scrollY)
    })
  })
}
