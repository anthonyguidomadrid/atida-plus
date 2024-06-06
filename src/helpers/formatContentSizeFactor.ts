export const formatContentSizeFactor = (
  unitVolume: string | null,
  contentSizeFactor?: number
): string | null => {
  return contentSizeFactor && contentSizeFactor > 1
    ? `${contentSizeFactor}x${unitVolume}`
    : unitVolume
}

export const formatContentAndBundleSizeFactor = (
  unitVolume: string | null,
  contentSizeFactor?: number,
  bundleSizeFactor?: number
): string | null => {
  return contentSizeFactor && contentSizeFactor > 1
    ? bundleSizeFactor
      ? `${bundleSizeFactor}x${contentSizeFactor}x${unitVolume}`
      : `${contentSizeFactor}x${unitVolume}`
    : unitVolume
}
