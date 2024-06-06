import LaunchDarkly from 'launchdarkly-node-server-sdk'
import getConfig from 'next/config'
import { FeatureFlagValue } from '~components/helpers/FeatureFlags/hooks'
import {
  FeatureFlag,
  allPagesFeatureFlags
} from '~config/constants/feature-flags'
import { getCountryFromLocale, getIso2CodeFromLocale } from '~helpers'

let launchDarklyClient: LaunchDarkly.LDClient

async function initialize() {
  const logger = LaunchDarkly.basicLogger({
    level: 'error'
  })
  const options: LaunchDarkly.LDOptions = { logger: logger }

  const client = LaunchDarkly.init(
    process.env.LAUNCH_DARKLY_SDK_KEY as string,
    options
  )
  await client.waitForInitialization()
  return client
}

async function getLaunchDarklyClient(): Promise<LaunchDarkly.LDClient> {
  if (launchDarklyClient) return launchDarklyClient
  return (launchDarklyClient = await initialize())
}

export const loadFeatureFlags = async (
  locale: string | undefined,
  pageFeatureFlags?: FeatureFlag[],
  user?: {
    key: string
    country?: string
    custom?: {
      store?: string
    }
  }
): Promise<Record<string, FeatureFlagValue>> => {
  const client = await getLaunchDarklyClient()
  const { publicRuntimeConfig } = getConfig()
  const defaultUser = {
    key: '',
    country: getCountryFromLocale(locale),
    custom: {
      store: `${publicRuntimeConfig.brand ?? 'ATIDA'} ${getIso2CodeFromLocale(
        locale
      )}`
    }
  }
  pageFeatureFlags = pageFeatureFlags ?? []

  return Array.from(
    new Set([...allPagesFeatureFlags, ...pageFeatureFlags])
  ).reduce(async (featureFlags, flagName) => {
    return {
      ...(await featureFlags),
      [flagName]: await client.variation(
        flagName,
        {
          ...defaultUser,
          ...user
        },
        false
      )
    }
  }, {})
}

export const loadFeatureFlag = async (
  locale: string | undefined,
  featureFlag: FeatureFlag,
  user?: {
    key: string
    country?: string
    custom?: {
      store?: string
    }
  }
): Promise<FeatureFlagValue> => {
  const client = await getLaunchDarklyClient()
  const { publicRuntimeConfig } = getConfig()

  const defaultUser = {
    key: '',
    country: getCountryFromLocale(locale),
    custom: {
      store: `${publicRuntimeConfig.brand ?? 'ATIDA'} ${getIso2CodeFromLocale(
        locale
      )}`
    }
  }

  return client.variation(
    featureFlag,
    {
      ...defaultUser,
      ...user
    },
    false
  )
}
