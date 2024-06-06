import { MutableRefObject } from 'react'

declare module 'swiper/react' {
  interface Swiper {
    ref: MutableRefObject<HTMLDivElement | Swiper | null>
  }
}
