import type { BackendModule, CallbackError, Services } from 'i18next'
import { createReduxStore } from '~domains/redux'
import {
  namespacesFailure,
  namespacesFulfill,
  namespacesRequest,
  namespacesSuccess,
  namespacesTrigger
} from '../slices'
import { createClient } from '~helpers'
import { Translations } from '..'
import { getErrorMessage } from '~helpers/error'

type BackendOptions = {
  reduxStore: ReturnType<typeof createReduxStore>
}

export const clientBackend: BackendModule<BackendOptions> & {
  store?: BackendOptions['reduxStore']
  logger?: Services['logger']
} = {
  type: 'backend',
  store: undefined,
  logger: undefined,

  init: function (services, backendOptions, _i18nextOptions) {
    if (!backendOptions?.reduxStore) {
      throw new Error(
        'i18next server backend requires the reduxStore configuration option'
      )
    }

    this.store = backendOptions.reduxStore
    this.logger = services.logger
  },

  read: async function (language, namespace, callback) {
    this.store?.dispatch(namespacesTrigger({ language, namespace }))
    try {
      this.store?.dispatch(namespacesRequest({ language, namespace }))
      const client = createClient({ locale: language })
      const response = await client.get<{ data: Translations }>(
        `/api/translations/${namespace}`
      )
      this.store?.dispatch(namespacesSuccess({ language, namespace }))
      callback(null, response.data)
    } catch (error) {
      this.store?.dispatch(
        namespacesFailure({
          language,
          namespace,
          message: getErrorMessage(error)
        })
      )
      callback(error as CallbackError, {})
    } finally {
      this.store?.dispatch(namespacesFulfill({ language, namespace }))
    }
  },

  create: function (_languages, _namespace, _key, _fallbackValue) {
    // This capability is unused, but required to satisfy the BackendModule interface
    this.logger.warn('Create is unimplemented')
  }
}
