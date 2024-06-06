import { createContext } from 'react'

export type FeatureFlags = Record<
  string,
  boolean | string | number | Record<string, unknown> | Array<unknown>
>

export const defaultFeatureFlags: FeatureFlags = {}

export const FeatureFlagsContext = createContext<FeatureFlags>(
  defaultFeatureFlags
)

export const FeatureFlagsProvider = FeatureFlagsContext.Provider
