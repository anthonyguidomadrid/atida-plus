import { getEnvironmentSingleton } from '../contentful/getEnvironmentSingleton.mjs'
import { addEntryTag } from '../contentful/addEntryTag.mjs'

/**
 * @param {import("contentful-management")} contentfulManagement
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} contentfulEnvironmentId
 * @param {Database<import("better-sqlite3")>} databaseInstance
 * @param {Boolean} isVerbose
 * @param {Integer} verbosityLevel
 * @returns {Promise<void>}
 */
export async function syncEntries(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  contentfulEnvironmentId,
  databaseInstance,
  isVerbose = false,
  verbosityLevel = 0
) {
  if (isVerbose) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Syncing entries from Database to Contentful'
    )
  }

  let preparedStatement =
    'SELECT ' +
    'content_type, ' +
    'from_entry_id, ' +
    'from_json_data, ' +
    'from_entry_tags, ' +
    'to_entry_tags, ' +
    'to_entry_id, ' +
    'from_current_status, ' +
    'to_current_status, ' +
    'from_updated_at, ' +
    'to_updated_at, ' +
    'from_published_at, ' +
    'to_published_at ' +
    'FROM contentful_entries ' +
    'WHERE to_be_synced = 1 ' +
    "AND content_type != 'contentfulAsset';"

  let entryArray = databaseInstance.prepare(preparedStatement).all()

  if (entryArray?.length > 0) {
    if (isVerbose) {
      console.log(
        '\x1b[32m##LOG:\x1b[0m Syncing ' + entryArray?.length + ' entries'
      )
    }

    let environmentSingleton = await getEnvironmentSingleton(
      contentfulManagement,
      contentfulToken,
      contentfulSpaceId,
      contentfulEnvironmentId
    )

    for (let i = 0; i < entryArray?.length; i++) {
      let myEntry

      if (
        entryArray[i].hasOwnProperty('to_entry_id') &&
        entryArray[i].to_entry_id
      ) {
        if (verbosityLevel > 1) {
          console.log(
            '\x1b[32m##LOG:\x1b[0m Updating entry ' +
              entryArray[i].to_entry_id +
              ' of type: ' +
              entryArray[i].content_type +
              " in '" +
              contentfulEnvironmentId +
              "' environment"
          )
        }

        await environmentSingleton
          .getEntry(entryArray[i].to_entry_id)
          .then(entry => (myEntry = entry))
          .catch(e => console.error('@@ERROR: ' + e))

        myEntry.fields = JSON.parse(entryArray[i].from_json_data)
        myEntry.update()
      } else {
        if (verbosityLevel > 1) {
          console.log(
            '\x1b[32m##LOG:\x1b[0m Creating entry: ' +
              entryArray[i].from_entry_id +
              ' of type: ' +
              entryArray[i].content_type +
              " in '" +
              contentfulEnvironmentId +
              "' environment"
          )
        }

        await environmentSingleton
          .createEntryWithId(
            entryArray[i].content_type,
            entryArray[i].from_entry_id,
            {
              fields: JSON.parse(entryArray[i].from_json_data)
            }
          )
          .then(entry => (myEntry = entry))
          .catch(e => console.error('@@ERROR: ' + e))
      }

      // Adding country tags (otherwise won't be visible on FE)

      if (
        myEntry?.sys?.id &&
        entryArray[i].from_entry_tags !== entryArray[i].to_entry_tags
      ) {
        if (verbosityLevel > 1) {
          console.log(
            '\x1b[32m##LOG:\x1b[0m Adding Tags to the entry: ' +
              myEntry?.sys?.id
          )
        }

        let tagList = entryArray[i].from_entry_tags
        let tagArray = tagList?.split(',')

        for (let i = 0; i < tagArray?.length; i++) {
          if (tagArray[i].trim()) {
            if (verbosityLevel > 2) {
              console.log(
                '\x1b[32m##LOG:\x1b[0m Adding tag: ' + tagArray[i].trim()
              )
            }

            await addEntryTag(
              environmentSingleton,
              myEntry?.sys?.id,
              tagArray[i].trim()
            )
          }
        }
      }
    }
  }

  let publishStatement =
    'SELECT ' +
    'from_entry_id, ' +
    'to_entry_id  ' +
    'FROM contentful_entries ' +
    'WHERE to_be_synced = 1 ' +
    'AND (' +
    '  from_published_at > to_published_at ' +
    '  OR to_published_at IS NULL ' +
    ") AND from_current_status = 'published' " +
    "AND content_type != 'contentfulAsset';"

  let updateArray = databaseInstance.prepare(publishStatement).all()

  if (updateArray?.length > 0) {
    if (isVerbose) {
      console.log(
        '\x1b[32m##LOG:\x1b[0m Publishing now ' +
          updateArray?.length +
          ' synced entries'
      )
    }

    let updateEnvironmentSingleton = await getEnvironmentSingleton(
      contentfulManagement,
      contentfulToken,
      contentfulSpaceId,
      contentfulEnvironmentId
    )

    for (let j = 0; j < updateArray?.length; j++) {
      let entryIdToUpdate = updateArray[j].to_entry_id
        ? updateArray[j].to_entry_id
        : updateArray[j].from_entry_id

      if (verbosityLevel > 1) {
        console.log(
          '\x1b[32m##LOG:\x1b[0m Publishing entry: ' +
            entryIdToUpdate +
            " in '" +
            contentfulEnvironmentId +
            "' environment"
        )
      }

      await updateEnvironmentSingleton
        .getEntry(entryIdToUpdate)
        .then(entry => entry.publish())
        .catch(e => {
          try {
            let parsedError = JSON.parse(e?.message)
            if (parsedError) {
              console.error(
                '@@ERROR: ' +
                  parsedError?.status +
                  ' / ' +
                  parsedError?.statusText +
                  ' - entry-id: ' +
                  entryIdToUpdate +
                  (parsedError?.details?.errors[0]?.link?.id
                    ? ' (linked to: ' +
                      parsedError?.details?.errors[0]?.link?.id +
                      ')'
                    : '') +
                  ' - Request-id: ' +
                  parsedError?.requestId
              )
            }
          } catch (error) {
            console.error('@@ERROR: ' + e)
          }
        })
    }
  }

  if (isVerbose) {
    console.log('\x1b[32m##LOG:\x1b[0m Syncing successful!')
  }
}
