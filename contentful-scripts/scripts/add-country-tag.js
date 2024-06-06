// Imports
import minimist from 'minimist'
import dotenv from 'dotenv'

// Import contentful utility
import {
  addEntryTag,
  environmentExists,
  extractStatusFromSys,
  getContentType,
  getEntriesByContentType,
  getEntryTag,
  getEnvironmentSingleton,
  publishEntry
} from '../helpers/index.mjs'
// eslint-disable-next-line
import contentfulManagement from 'contentful-management'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }

// Default values
let environmentId = null
let contentTypeId = null
let tagId = null
let tagLinkedPages = false

let parsedArgs = minimist(process.argv.slice(2))
if (parsedArgs.hasOwnProperty('to')) {
  environmentId = parsedArgs.to

  if (parsedArgs.hasOwnProperty('content-type')) {
    contentTypeId = parsedArgs['content-type']

    if (parsedArgs.hasOwnProperty('tag')) {
      tagId = parsedArgs.tag

      if (parsedArgs.hasOwnProperty('linked-pages')) {
        tagLinkedPages = parsedArgs['linked-pages']
      }
      await tagEntriesByContentType(
        contentfulManagement,
        envValues.CMS_MANAGEMENT_TOKEN,
        envValues.CMS_SPACE_ID,
        environmentId,
        contentTypeId,
        tagId,
        tagLinkedPages
      )
    } else {
      console.error('@@ERROR: You should specify a Tag!')
      process.exit(1)
    }
  } else {
    console.error('@@ERROR: You should specify a Content-type!')
    process.exit(1)
  }
} else {
  console.error('@@ERROR: You should specify an Environment!')
  process.exit(1)
}

async function tagEntriesByContentType(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  environmentId,
  contentTypeId,
  tagId,
  tagLinkedPages = false
) {
  // Check the environment exists
  if (
    !(await environmentExists(
      contentfulManagement,
      contentfulToken,
      contentfulSpaceId,
      environmentId
    ))
  ) {
    console.error(
      '@@ERROR: Destination environment ' + environmentId + ' does not exist!'
    )
    process.exit(1)
  }

  const environmentSingleton = await getEnvironmentSingleton(
    contentfulManagement,
    contentfulToken,
    contentfulSpaceId,
    environmentId,
    true
  )

  // Check the content-type exists
  let selectedContentType = await getContentType(
    environmentSingleton,
    contentTypeId
  )

  if (selectedContentType?.sys?.id !== contentTypeId) {
    console.error(
      '@@ERROR: Destination content-type ' + contentTypeId + ' does not exist!'
    )
    process.exit(1)
  }

  // Check the tag exist
  let selectedTag = await getEntryTag(environmentSingleton, tagId)

  if (selectedTag?.sys?.id !== tagId) {
    console.error('@@ERROR: Destination tag ' + tagId + ' does not exist!')
    process.exit(1)
  }

  // Loop trough the Entry IDs of that Content-type
  let entriesArray = await getEntriesByContentType(
    environmentSingleton,
    contentTypeId,
    1
  )

  let republishArray = []
  const entriesArrayLength = entriesArray?.length ?? 0

  for (let i = 0; i < entriesArrayLength; i++) {
    let entrySys = entriesArray[i]?.sys
    let entryPublishStatus = await extractStatusFromSys(entrySys)

    if (entrySys?.id) {
      // Apply the Tag
      console.log('@@INFO - Adding tag for Entry ID: ' + entrySys.id)
      await addEntryTag(environmentSingleton, entrySys.id, tagId)

      // Mark the entry for eventual republish
      if (
        entryPublishStatus === 'published'
        // || entryPublishStatus === 'changed'
      ) {
        republishArray.push(entrySys.id)
      }

      if (tagLinkedPages) {
        // If to associate page, lookup for parent pages
        let pageEntries = []

        await environmentSingleton
          .getEntries({
            content_type: 'page',
            links_to_entry: entrySys.id
          })
          .then(response => (pageEntries = response?.items))
          .catch(e => console.error('@@ERROR: ' + e))

        const pageEntriesLength = pageEntries?.length ?? 0

        for (let k = 0; k < pageEntriesLength; k++) {
          if (pageEntries[k]?.sys?.id) {
            let pagePublishStatus = await extractStatusFromSys(
              pageEntries[k].sys
            )

            // Tag that page with the same tag
            console.log(
              '@@INFO - Adding tag for linked page - Entry ID: ' +
                pageEntries[k].sys.id
            )
            await addEntryTag(
              environmentSingleton,
              pageEntries[k].sys.id,
              tagId
            )

            // Mark the entry for eventual republish
            if (
              pagePublishStatus === 'published'
              // || entryPublishStatus === 'changed'
            ) {
              republishArray.push(pageEntries[k].sys.id)
            }
          }
        }
      }
    }
  }

  // Re-publish entries
  const republishArrayLength = republishArray?.length ?? 0

  for (let j = 0; j < republishArrayLength; j++) {
    console.log('@@INFO - Republishing Entry ID: ' + republishArray[j])

    await publishEntry(environmentSingleton, republishArray[j])
  }
}
