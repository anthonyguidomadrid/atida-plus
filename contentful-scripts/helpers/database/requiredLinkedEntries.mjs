import Database from 'better-sqlite3'

/**
 * @param {import("contentful-management/dist/typings/common-types").Collection<import("contentful-management/dist/typings/entities/content-type").ContentType, import("contentful-management/dist/typings/entities/content-type").ContentTypeProps>} contentTypes
 * @param {Database} databaseInstance
 * @param {Boolean} isVerbose
 * @returns {Promise<void>}
 */
export async function getRequiredLinkedEntries(
  contentTypes,
  databaseInstance,
  isVerbose = false
) {
  if (isVerbose) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Checks and Save which Content-types have Linked entries'
    )
  }

  for (let i = 0; i < contentTypes?.items?.length; i++) {
    await saveRequiredLinkedEntries(
      contentTypes?.items[i],
      databaseInstance,
      isVerbose
    )
  }
}

/**
 * @param {import("contentful-management/dist/typings/entities/content-type").ContentType, import("contentful-management/dist/typings/entities/content-type").ContentTypeProps} contentTypeInUse
 * @param {Database} databaseInstance
 * @param {Boolean} isVerbose
 * @return {Promise<void>}
 */
async function saveRequiredLinkedEntries(
  contentTypeInUse,
  databaseInstance,
  isVerbose = false
) {
  for (let i = 0; i < contentTypeInUse.fields.length; i++) {
    if (
      contentTypeInUse.fields[i].required === true &&
      contentTypeInUse.fields[i].disabled === false &&
      contentTypeInUse.fields[i].omitted === false &&
      contentTypeInUse.fields[i].type === 'Link' &&
      contentTypeInUse.fields[i].linkType === 'Entry'
    ) {
      if (isVerbose) {
        console.log(
          '\x1b[32m##LOG:\x1b[0m ' +
            '\x1b[34m' +
            contentTypeInUse.sys.id +
            '\x1b[0m' +
            ' has required linked entry of type: ' +
            '\x1b[34m' +
            contentTypeInUse.fields[i].id +
            '\x1b[0m'
        )
      }

      let insertCtStatement = databaseInstance.prepare(
        'INSERT INTO contentful_content_types(' +
          'content_type_id,' +
          'linked_entry_field_name' +
          ') VALUES (?, ?)'
      )

      insertCtStatement.run(
        contentTypeInUse.sys.id,
        contentTypeInUse.fields[i].id
      )
    }
  }
}
