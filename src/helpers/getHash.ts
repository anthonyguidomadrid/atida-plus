import { getUUIDName } from '~domains/account'
import { defaultStorageMechanism } from '~helpers/storage'
import { sha256 } from 'js-sha256'
import { v4 as uuid } from 'uuid'

export const getUuidHash = (locale?: string): string => {
  const UUID_NAME = getUUIDName(locale)
  const storageMechanism = defaultStorageMechanism()
  let id = storageMechanism?.get(UUID_NAME)

  if (id) {
    return sha256(id)
  }

  id = uuid()
  storageMechanism?.set(UUID_NAME, id)

  return sha256(id)
}
