import { getEntriesByContentType } from '../contentful/getEntriesByContentType.mjs'
import { getAssetsAsEntries } from '../contentful/getAssetsAsEntries.mjs'
import { getDefaultLocale } from '../locales/getDefaultLocale.mjs'
import { extractStatusFromSys } from '../contentful/extractStatusFromSys.mjs'

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {Object} contentTypeList
 * @param {Database<import("better-sqlite3")>} databaseInstance
 * @param {Object} envConf
 * @param {Array} excludeContentTypeArray
 * @param {String} defaultLocale
 * @param {Boolean} includeAssets
 * @param {Boolean} isVerbose
 * @param {Integer} verbosityLevel
 * @returns {Promise<void>}
 */
export async function populateFromEntriesByContentType(
  environmentSingleton,
  contentTypeList,
  databaseInstance,
  envConf,
  excludeContentTypeArray = [],
  defaultLocale = getDefaultLocale(),
  includeAssets = false,
  isVerbose = false,
  verbosityLevel = 0
) {
  for (let i = 0; i < contentTypeList.length; i++) {
    if (!excludeContentTypeArray.includes(contentTypeList[i].id)) {
      let entriesArray = await getEntriesByContentType(
        environmentSingleton,
        contentTypeList[i].id,
        verbosityLevel
      )

      if (entriesArray.length > 0) {
        await saveFromEntriesInDb(
          contentTypeList[i].id,
          entriesArray,
          databaseInstance,
          envConf,
          defaultLocale,
          verbosityLevel
        )
      }
    }
  }

  if (includeAssets) {
    const assetsArray = await getAssetsAsEntries(
      environmentSingleton,
      verbosityLevel
    )

    if (assetsArray.length > 0) {
      await saveFromEntriesInDb(
        'contentfulAsset',
        assetsArray,
        databaseInstance,
        envConf,
        defaultLocale,
        verbosityLevel
      )
    }
  }
}

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {Object} contentTypeList
 * @param {Database<import("better-sqlite3")>} databaseInstance
 * @param {Object} envConf
 * @param {Array} excludeContentTypeArray
 * @param {String} defaultLocale
 * @param {Boolean} includeAssets
 * @param {Boolean} isVerbose
 * @param {Integer} verbosityLevel
 * @returns {Promise<void>}
 */
export async function populateToEntriesByContentType(
  environmentSingleton,
  contentTypeList,
  databaseInstance,
  envConf,
  excludeContentTypeArray = [],
  defaultLocale = getDefaultLocale(),
  includeAssets = false,
  isVerbose = false,
  verbosityLevel = 0
) {
  for (let i = 0; i < contentTypeList.length; i++) {
    if (!excludeContentTypeArray.includes(contentTypeList[i].id)) {
      let entriesArray = await getEntriesByContentType(
        environmentSingleton,
        contentTypeList[i].id,
        verbosityLevel
      )

      if (entriesArray.length > 0) {
        await saveToEntriesInDb(
          contentTypeList[i].id,
          entriesArray,
          databaseInstance,
          envConf,
          defaultLocale,
          verbosityLevel
        )
      }
    }
  }

  if (includeAssets) {
    const assetsArray = await getAssetsAsEntries(
      environmentSingleton,
      verbosityLevel
    )

    if (assetsArray.length > 0) {
      await saveToEntriesInDb(
        'contentfulAsset',
        assetsArray,
        databaseInstance,
        envConf,
        defaultLocale,
        verbosityLevel
      )
    }
  }
}

async function saveFromEntriesInDb(
  contentTypeId,
  entriesArray,
  databaseInstance,
  envConf,
  defaultLocale = getDefaultLocale(),
  verbosityLevel = 0
) {
  if (verbosityLevel > 1) {
    console.log('\x1b[32m##LOG:\x1b[0m Save Entries in Database')
  }

  // Now get the Content-type structure
  let insertEntryStatement = databaseInstance.prepare(
    'INSERT INTO contentful_entries(' +
      'content_type,' +
      'from_entry_id,' +
      'entry_key,' +
      'from_entry_tags,' +
      'from_current_status,' +
      'from_current_version,' +
      'from_published_version,' +
      'from_created_at,' +
      'from_updated_at,' +
      'from_first_published_at,' +
      'from_published_at,' +
      'from_json_data' +
      ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  )

  for (let i = 0; i < entriesArray.length; i++) {
    let primaryKey = await extractPrimaryKey(
      contentTypeId,
      entriesArray[i].fields,
      envConf,
      defaultLocale
    )
    let notEmptyPrimaryKey = primaryKey ? primaryKey : null

    await insertEntryStatement.run(
      contentTypeId,
      entriesArray[i].sys.id,
      notEmptyPrimaryKey,
      await extractTagsFromMetadata(entriesArray[i].metadata.tags),
      await extractStatusFromSys(entriesArray[i].sys),
      entriesArray[i].sys.version,
      entriesArray[i].sys.publishedVersion,
      entriesArray[i].sys.createdAt,
      entriesArray[i].sys.updatedAt,
      entriesArray[i].sys.firstPublishedAt,
      entriesArray[i].sys.publishedAt,
      JSON.stringify(entriesArray[i].fields)
    )
  }
}

export async function saveToEntriesInDb(
  contentTypeId,
  entriesArray,
  databaseInstance,
  envConf,
  defaultLocale = getDefaultLocale(),
  verbosityLevel = 0
) {
  if (verbosityLevel > 1) {
    console.log('\x1b[32m##LOG:\x1b[0m Save Entries in Database')
  }

  let insertEntryStatement = databaseInstance.prepare(
    'UPDATE contentful_entries ' +
      'SET to_entry_id = ?, ' +
      'to_entry_tags = ?, ' +
      'to_current_status = ?, ' +
      'to_current_version = ?, ' +
      'to_published_version = ?, ' +
      'to_created_at = ?, ' +
      'to_updated_at = ?, ' +
      'to_first_published_at = ?, ' +
      'to_published_at = ? ' +
      'WHERE from_entry_id = ?'
  )

  for (let i = 0; i < entriesArray.length; i++) {
    // add info in table for existing entries (match entry-id or p-key)
    let primaryKey = await extractPrimaryKey(
      contentTypeId,
      entriesArray[i].fields,
      envConf,
      defaultLocale
    )
    let notEmptyPrimaryKey = primaryKey ? primaryKey : null

    let fromEntryId = databaseInstance
      .prepare(
        'SELECT from_entry_id AS id FROM contentful_entries ' +
          'WHERE from_entry_id = ? '
      )
      .get(entriesArray[i].sys.id)

    if (fromEntryId === undefined && notEmptyPrimaryKey) {
      fromEntryId = databaseInstance
        .prepare(
          'SELECT from_entry_id AS id FROM contentful_entries ' +
            'WHERE entry_key = ? AND entry_key IS NOT NULL AND content_type = ? '
        )
        .get(notEmptyPrimaryKey, contentTypeId)
    }

    if (fromEntryId !== undefined && fromEntryId.hasOwnProperty('id')) {
      await insertEntryStatement.run(
        entriesArray[i].sys.id,
        await extractTagsFromMetadata(entriesArray[i].metadata.tags),
        await extractStatusFromSys(entriesArray[i].sys),
        entriesArray[i].sys.version,
        entriesArray[i].sys.publishedVersion,
        entriesArray[i].sys.createdAt,
        entriesArray[i].sys.updatedAt,
        entriesArray[i].sys.firstPublishedAt,
        entriesArray[i].sys.publishedAt,
        fromEntryId.id
      )
    }
  }
}

async function extractPrimaryKey(
  contentTypeId,
  entryFields,
  envConf,
  defaultLocale = getDefaultLocale()
) {
  let primaryKeyArray = []

  if (envConf[contentTypeId] !== undefined) {
    if (envConf[contentTypeId].mode < 2) {
      return null
    } else {
      let uniqueField = envConf[contentTypeId].unique
      let localesArray = envConf[contentTypeId].locale
        ? envConf[contentTypeId].locale.split(',')
        : [defaultLocale]

      if (uniqueField !== undefined) {
        for (let i = 0; i < localesArray.length; i++) {
          if (
            entryFields[uniqueField] !== undefined &&
            entryFields[uniqueField][localesArray[i]] !== undefined
          ) {
            primaryKeyArray.push(entryFields[uniqueField][localesArray[i]])
          }
        }
      }
    }

    return primaryKeyArray.join(',')
  }
}

async function extractTagsFromMetadata(entryMetadata) {
  let tagArray = []
  for (let i = 0; i < entryMetadata.length; i++) {
    if (entryMetadata[i]?.sys?.linkType === 'Tag')
      tagArray.push(entryMetadata[i]?.sys?.id)
  }

  return tagArray.join(',')
}
