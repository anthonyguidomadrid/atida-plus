import Database from 'better-sqlite3'

/**
 * @param {import("contentful-management/dist/typings/common-types").Collection<import("contentful-management/dist/typings/entities/content-type").ContentType, import("contentful-management/dist/typings/entities/content-type").ContentTypeProps>} contentTypes
 * @param {Database} databaseInstance
 * @param {Boolean} isVerbose
 * @returns {Promise<void>}
 */
export async function saveContentTypesToDb(
  contentTypes,
  databaseInstance,
  isVerbose = false
) {
  if (isVerbose) {
    console.log('\x1b[32m##LOG:\x1b[0m Saving the Content-types to Database')
  }

  // Now get the Content-type structure
  let insertCtStatement = await databaseInstance.prepare(
    'INSERT INTO contentful_content_types(' +
      'content_type_id,' +
      'linked_entry_field_name' +
      ') VALUES (?, ?)'
  )

  for (let i = 0; i < contentTypes?.items?.length; i++) {
    await insertCtStatement.run(contentTypes?.items[i]?.sys?.id, null)
  }

  if (isVerbose) {
    console.log('\x1b[32m##LOG:\x1b[0m Content-types saved in Database')
  }
}
