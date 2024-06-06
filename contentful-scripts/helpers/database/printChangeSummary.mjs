import Database from 'better-sqlite3'

/**
 * @param {Database} databaseInstance
 * @param {Integer} verbosityLevel
 * @returns {Promise<void>}
 */
export async function printChangeSummary(databaseInstance, verbosityLevel = 0) {
  if (verbosityLevel > 0) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Printing summary of entries to be inserted/updated'
    )
  }

  let preparedStatement =
    'SELECT ' +
    'content_type, ' +
    'from_entry_id, ' +
    'to_entry_id, ' +
    'from_current_status, ' +
    'to_current_status, ' +
    'from_updated_at, ' +
    'to_updated_at, ' +
    'from_published_at, ' +
    'to_published_at ' +
    'FROM contentful_entries ' +
    'WHERE to_be_synced = 1;'

  let entryArray = databaseInstance.prepare(preparedStatement).all()

  if (entryArray?.length > 0) {
    if (verbosityLevel > 1) {
      for (let i = 0; i < entryArray.length; i++) {
        if (entryArray[i].to_entry_id) {
          console.log(
            '\x1b[33m##DRY-RUN:\x1b[0m ' +
              "Syncing '" +
              entryArray[i].content_type +
              "' from Entry: " +
              entryArray[i].from_entry_id +
              ' (Status: ' +
              entryArray[i].from_current_status +
              ') to Entry: ' +
              entryArray[i].to_entry_id +
              ' (Status: ' +
              entryArray[i].to_current_status +
              ')'
          )
        } else {
          console.log(
            '\x1b[33m##DRY-RUN:\x1b[0m ' +
              'Will create new Entry of type ' +
              entryArray[i].content_type +
              ' with ID: ' +
              entryArray[i].from_entry_id
          )
        }
      }
    } else {
      let countToUpdate = [],
        countToInsert = []
      for (let i = 0; i < entryArray.length; i++) {
        let contentType = entryArray[i].content_type
        if (entryArray[i].to_entry_id) {
          if (countToUpdate[contentType] === undefined) {
            countToUpdate[contentType] = 1
          } else {
            countToUpdate[contentType]++
          }
        } else {
          if (countToInsert[contentType] === undefined) {
            countToInsert[contentType] = 1
          } else {
            countToInsert[contentType]++
          }
        }
      }

      Object.entries(countToUpdate).forEach(entry => {
        const [key, value] = entry

        if (value > 0) {
          console.log(
            '\x1b[33m##DRY-RUN:\x1b[0m ' +
              'Will update ' +
              value +
              ' entries of Content-type: ' +
              key
          )
        }
      })

      Object.entries(countToInsert).forEach(entry => {
        const [key, value] = entry

        if (value > 0) {
          console.log(
            '\x1b[33m##DRY-RUN:\x1b[0m ' +
              'Will insert ' +
              value +
              ' entries of Content-type: ' +
              key
          )
        }
      })
    }
  }
}
