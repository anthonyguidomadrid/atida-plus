import Database from 'better-sqlite3'

/**
 * @param {Database} databaseInstance
 * @param {Boolean} isVerbose
 * @returns {Promise<void>}
 */
export async function createDatabase(databaseInstance, isVerbose = false) {
  if (isVerbose) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Creating the Database to store Sync data'
    )
  }

  // Now creating the database to hold the Entries information
  databaseInstance.exec(
    'CREATE TABLE IF NOT EXISTS contentful_entries (' +
      'id INTEGER PRIMARY KEY,' +
      'content_type TEXT NOT NULL,' +
      'entry_key TEXT,' + // UNIQUE
      'to_be_synced INTEGER DEFAULT 0,' +
      'from_entry_id TEXT NOT NULL UNIQUE,' +
      'from_entry_tags TEXT,' +
      'from_current_status TEXT NOT NULL,' +
      'from_current_version INTEGER,' +
      'from_published_version INTEGER,' +
      'from_created_at TEXT NOT NULL,' +
      'from_updated_at TEXT NOT NULL,' +
      'from_first_published_at TEXT,' +
      'from_published_at TEXT,' +
      'from_json_data TEXT,' +
      'to_entry_id TEXT,' +
      'to_entry_tags TEXT,' +
      'to_current_status TEXT,' +
      'to_current_version INTEGER,' +
      'to_published_version INTEGER,' +
      'to_created_at TEXT,' +
      'to_updated_at TEXT,' +
      'to_first_published_at TEXT,' +
      'to_published_at TEXT' +
      ');'
  )

  databaseInstance.exec(
    'CREATE TABLE IF NOT EXISTS contentful_content_types (' +
      'id INTEGER PRIMARY KEY,' +
      'content_type_id TEXT NOT NULL,' +
      'linked_entry_field_name TEXT' +
      ');'
  )

  databaseInstance.exec(
    'CREATE TABLE IF NOT EXISTS contentful_linked_entries (' +
      'from_local_id INTEGER,' +
      'to_local_id INTEGER,' +
      'PRIMARY KEY (from_local_id, to_local_id)' +
      ');'
  )

  databaseInstance.exec('DELETE FROM contentful_entries WHERE 1;')
  databaseInstance.exec('DELETE FROM contentful_content_types WHERE 1;')
  databaseInstance.exec('DELETE FROM contentful_linked_entries WHERE 1;')

  if (isVerbose) {
    console.log('\x1b[32m##LOG:\x1b[0m Database created successfully!')
  }
}
