export type ValuesOf<T extends string[]> = T[number]
export const ImageFormats = ['avif', 'webp', 'jpg']
export type AllowedImageFormats = ValuesOf<typeof ImageFormats>

export type ImagePlatforms = 'contentful' | 'bynder'

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg'
export type ResponsiveDimensions = {
  [key in Breakpoints]?: number
}

export type Compression = string | number
