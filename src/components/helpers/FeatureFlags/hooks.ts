import { useContext } from 'react'
import { FeatureFlag } from '~config/constants/feature-flags'
import { FeatureFlags, FeatureFlagsContext } from './context'

export type FeatureFlagValue =
  | boolean
  | string
  | number
  | Record<string, unknown>
  | Array<unknown>

const getFeatureFlagValue = <T extends FeatureFlagValue>(
  featureFlagName: string,
  featureFlags: FeatureFlags
): T => {
  if (Array.isArray(featureFlags[featureFlagName]))
    return (featureFlags[featureFlagName] as T) ?? []

  switch (typeof featureFlags[featureFlagName]) {
    case 'boolean':
      return (featureFlags[featureFlagName] as T) ?? false
    case 'string':
      return (featureFlags[featureFlagName] as T) ?? ''
    case 'number':
      return (featureFlags[featureFlagName] as T) ?? 0
    case 'object':
      if (Object.keys.length === 0) return {} as T
      return (featureFlags[featureFlagName] as T) ?? {}
    default:
      return false as T
  }
}

export const useFeatureFlag = <T extends FeatureFlagValue>(
  featureFlagName: FeatureFlag
): T => {
  const featureFlags = useContext(FeatureFlagsContext)
  return getFeatureFlagValue<T>(featureFlagName, featureFlags)
}

export const useFeatureFlags = (
  names: FeatureFlag[],
  fallbackFeatureFlags?: FeatureFlags
): FeatureFlagValue[] => {
  const featureFlags = useContext(FeatureFlagsContext)
  return names.reduce((acc: FeatureFlagValue[], name: FeatureFlag) => {
    return Object.keys(featureFlags).length > 0
      ? [...acc, getFeatureFlagValue(name, featureFlags)]
      : fallbackFeatureFlags && Object.keys(fallbackFeatureFlags).length > 0
      ? [...acc, getFeatureFlagValue(name, fallbackFeatureFlags)]
      : []
  }, [])
}
