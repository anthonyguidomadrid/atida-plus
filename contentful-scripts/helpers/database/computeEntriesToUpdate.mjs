import Database from 'better-sqlite3'

/**
 * @param {Database} databaseInstance
 * @param {Object} envConf
 * @param {Boolean} onlyInsert
 * @param {Boolean} onlyPublished
 * @param {Boolean} isVerbose
 * @returns {Promise<void>}
 */
export async function computeEntriesToUpdate(
  databaseInstance,
  envConf,
  onlyInsert = false,
  onlyPublished = false,
  isVerbose = false
) {
  if (isVerbose) {
    console.log('\x1b[32m##LOG:\x1b[0m Computing entries to update/insert')
    if (onlyInsert) {
      console.log(
        '\x1b[32m##LOG:\x1b[0m Chosen to sync only the new ones (will not update existing)'
      )
    }
  }

  let preparedStatement =
    'SELECT ' +
    'content_type, ' +
    'from_entry_id, ' +
    'to_entry_id, ' +
    'from_current_status, ' +
    'to_current_status, ' +
    'from_current_version, ' +
    'to_current_version, ' +
    'from_published_version, ' +
    'to_published_version, ' +
    'from_updated_at, ' +
    'to_updated_at, ' +
    'from_published_at, ' +
    'to_published_at ' +
    'FROM contentful_entries ' +
    'WHERE (' +
    "  to_current_status != 'archived'" +
    '  OR to_current_status IS NULL' +
    ') AND (' +
    '  from_updated_at > to_updated_at' +
    '  OR to_entry_id IS NULL' +
    ')'

  if (onlyInsert) {
    preparedStatement += ' AND to_entry_id IS NULL'
  }

  if (onlyPublished) {
    preparedStatement +=
      " AND from_current_status = 'published'" +
      ' AND (' +
      '   from_current_version > to_current_version' +
      '   OR to_current_version IS NULL' +
      ' )'
  }

  let entryArray = databaseInstance.prepare(preparedStatement).all()

  if (entryArray.length > 0) {
    let preparedUpdate =
      'UPDATE contentful_entries SET to_be_synced = 1 WHERE from_entry_id = ?'

    for (let i = 0; i < entryArray.length; i++) {
      if (await isEntryToBeSynced(entryArray[i], envConf)) {
        databaseInstance
          .prepare(preparedUpdate)
          .run(entryArray[i].from_entry_id)
      }
    }
  } else {
    console.log(
      '\x1b[33m##INFO:\x1b[0m All entries updated! Nothing to sync :)'
    )
  }
}

/**
 * This function checks if the entry has to be synced from FROM to TO environment.
 * Since the script is supposed to run from master -> uat or from uat -> dev
 * There are 3 'mode' for the update:
 *  - 1 / entry will be inserted as new if it's missing in the TO env
 *  - 2 / entry exists in both environments, but will update only if the FROM is more recent
 *  - 3 / entry exists in both environments, but additionally check if the FROM is published more recently
 *
 * @param entryItem
 * @param envConf
 * @returns {Promise<boolean|boolean>}
 */
async function isEntryToBeSynced(entryItem, envConf) {
  let entryMode = entryItem.hasOwnProperty('content_type')
    ? envConf[entryItem.content_type]?.mode
    : 1

  return (
    (entryMode < 3 &&
      entryItem.hasOwnProperty('from_published_at') &&
      entryItem.hasOwnProperty('to_published_at')) ||
    (entryMode === 3 &&
      entryItem.hasOwnProperty('from_published_version') &&
      entryItem.hasOwnProperty('to_published_version') &&
      entryItem.from_published_version > entryItem.to_published_version)
  )
}
