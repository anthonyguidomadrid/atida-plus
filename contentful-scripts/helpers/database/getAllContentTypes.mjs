import Database from 'better-sqlite3'

/**
 * @param {Database} databaseInstance
 * @param {Boolean} isVerbose
 * @returns {Promise<*>}
 */
export async function getAllContentTypes(databaseInstance, isVerbose) {
  if (isVerbose) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Retrieving the Content-types list to query for Entries'
    )
  }

  return databaseInstance
    .prepare(
      'SELECT DISTINCT content_type_id AS id FROM contentful_content_types'
    )
    .all()
}
