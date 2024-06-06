import { getDefaultLocale } from '../locales/getDefaultLocale.mjs'
import Database from 'better-sqlite3'

/**
 * @param {Database} databaseInstance
 * @param {Object} envConf
 * @param {Array} excludeContentTypeArray
 * @param {String} defaultLocale
 * @param {Boolean} isVerbose
 * @returns {Promise<void>}
 */
export async function buildLinkedEntriesTree(
  databaseInstance,
  envConf,
  excludeContentTypeArray = [],
  defaultLocale = getDefaultLocale(),
  isVerbose = false
) {
  if (isVerbose) {
    console.log('\x1b[32m##LOG:\x1b[0m Build Linked Entries Tree')
  }
  let contentTypeList = []

  // Query contentful_content_types
  let preparedStatement =
    'SELECT content_type_id AS id, linked_entry_field_name AS name ' +
    'FROM contentful_content_types ' +
    'WHERE linked_entry_field_name IS NOT NULL '

  if (excludeContentTypeArray.length > 0) {
    preparedStatement +=
      "AND content_type_id NOT IN ( '" +
      excludeContentTypeArray.join("','") +
      "')"
  }

  contentTypeList = databaseInstance.prepare(preparedStatement).all()

  // Add hardcoded dependencies
  for (let index in envConf) {
    if (
      envConf.hasOwnProperty(index) &&
      envConf[index].hasOwnProperty('linked')
    ) {
      contentTypeList.push({
        id: index,
        name: envConf[index].linked
      })
    }
  }

  for (let i = 0; i < contentTypeList.length; i++) {
    if (
      contentTypeList[i] !== undefined &&
      contentTypeList[i].id !== undefined
    ) {
      let selectCtStatement =
        'SELECT from_entry_id AS entry_id, from_json_data AS json ' +
        'FROM contentful_entries ' +
        "WHERE content_type = '" +
        contentTypeList[i].id +
        "'"

      let insertEntryStatement = databaseInstance.prepare(
        'INSERT OR IGNORE INTO contentful_linked_entries(' +
          'from_local_id,' +
          'to_local_id' +
          ') VALUES (?, ?)'
      )

      // Query all entries in DB of that content_type_id
      let entryArray = databaseInstance.prepare(selectCtStatement).all()

      for (let j = 0; j < entryArray.length; j++) {
        if (
          entryArray[j].json !== undefined &&
          entryArray[j].entry_id !== undefined
        ) {
          let entryJson = JSON.parse(entryArray[j].json)
          let propertyName = contentTypeList[i].name

          // Extrapolate from Payload any link of field 'field_name'
          if (
            entryJson.hasOwnProperty(propertyName) &&
            entryJson[propertyName] !== undefined &&
            entryJson[propertyName].hasOwnProperty(defaultLocale) &&
            entryJson[propertyName][defaultLocale].sys !== undefined &&
            entryJson[propertyName][defaultLocale].sys.type === 'Link' &&
            entryJson[propertyName][defaultLocale].sys.linkType === 'Entry'
          ) {
            // Add entry in DB from entry id A to entry id B
            insertEntryStatement.run(
              entryArray[j].entry_id,
              entryJson[propertyName][defaultLocale].sys.id
            )
          }
        }
      }
    }
  }
}
