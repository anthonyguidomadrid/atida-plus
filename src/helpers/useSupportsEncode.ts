import { useEffect, useState } from 'react'

const supportsEncode = async (): Promise<'avif' | 'webp' | 'jpg'> => {
  const fallback = 'jpg'
  if (typeof window === undefined || !window.createImageBitmap) return fallback

  const avifData =
    'data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA='
  const webpData =
    'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA='
  const avifblob = await fetch(avifData).then(res => res.blob())

  return createImageBitmap(avifblob)
    .then(() => 'avif')
    .catch(async () => {
      const webpblob = await fetch(webpData).then(res => res.blob())
      return createImageBitmap(webpblob).then(() => 'webp')
    })
    .catch(() => fallback) as Promise<'avif' | 'webp' | 'jpg'>
}

export const useSupportsEncode = (): 'avif' | 'webp' | 'jpg' | undefined => {
  const [imageFormatSupport, setImageFormatSupport] = useState<
    'avif' | 'webp' | 'jpg' | undefined
  >(undefined)

  useEffect(() => {
    const callSupportsEncode = async () => {
      const formatSupport = await supportsEncode()
      setImageFormatSupport(formatSupport)
    }
    callSupportsEncode()
  }, [])

  return imageFormatSupport
}
