// Imports
import admZip from 'adm-zip'
import dateFormat from 'dateformat'
import dotenv from 'dotenv'
import fileSystem from 'fs'
import minimist from 'minimist'

// Import contentful utility
import { environmentExists, deleteFiles } from '../helpers/index.mjs'
import contentfulExport from 'contentful-export'
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

let environmentId = 'dev'
let argIncludeDrafts = true
let argIncludeAssets = false
let argVerbose = false

let parsedArgs = minimist(process.argv.slice(2))
if (parsedArgs.hasOwnProperty('from')) {
  environmentId = parsedArgs.from
} else {
  console.error('@@ERROR: An environment should be specified')
  process.exit(1)
}

let destinationFolder = __dirname + '/../export/' + environmentId + '/'
let isDestinationFolderCustom = false

if (parsedArgs.hasOwnProperty('only-published')) {
  argIncludeDrafts = false
}

if (parsedArgs.hasOwnProperty('include-assets')) {
  argIncludeAssets = true
}

if (parsedArgs.hasOwnProperty('verbose')) {
  argVerbose = true
}

if (parsedArgs.hasOwnProperty('destination-folder')) {
  destinationFolder = parsedArgs['destination-folder']
  isDestinationFolderCustom = true
}

if (!destinationFolder.endsWith('/')) {
  destinationFolder += '/'
}

// Create destination folder if not present
let destinationFolderExists = fileSystem.existsSync(destinationFolder)
if (!isDestinationFolderCustom && !destinationFolderExists) {
  fileSystem.mkdirSync(destinationFolder)
}

destinationFolderExists = fileSystem.existsSync(destinationFolder)
if (!destinationFolderExists || destinationFolder === '/') {
  console.error('@@ERROR: Destination folder does not exist or not accessible!')
  process.exit(1)
}

// Set up filename for export file and log
let now = new Date()
let currentDate = dateFormat(now, 'yyyy-mm-dd-HH-MM-ss')
let contentFile = currentDate + '-' + environmentId + '.json'
let logFile = currentDate + '-' + environmentId + '.log'

if (
  !(await environmentExists(
    contentfulManagement,
    envValues.CMS_MANAGEMENT_TOKEN,
    envValues.CMS_SPACE_ID,
    environmentId
  ))
) {
  console.error(
    '@@ERROR: Destination environment ' + environmentId + ' does not exist!'
  )
  process.exit(1)
}

console.log('##INFO: Export of environment "' + environmentId + '" started...')
console.log('##INFO: Using destination folder: ' + destinationFolder)

const options = {
  spaceId: envValues.CMS_SPACE_ID,
  managementToken: envValues.CMS_MANAGEMENT_TOKEN,
  environmentId: environmentId,
  exportDir: destinationFolder,
  contentFile: contentFile,
  saveFile: true,
  includeDrafts: argIncludeDrafts,
  includeArchived: argIncludeDrafts,
  downloadAssets: argIncludeAssets,
  errorLogFile: destinationFolder + logFile,
  useVerboseRenderer: argVerbose,
  maxAllowedLimit: 100
}

contentfulExport(options).then(() => {
  let assetFolder = destinationFolder + 'images.ctfassets.net'
  let assetFolderExists = fileSystem.existsSync(assetFolder)

  if (assetFolderExists) {
    // Rename the folder
    let newFolder = destinationFolder + currentDate + '-' + environmentId
    fileSystem.renameSync(assetFolder, newFolder)

    // Zip both the folder and json file
    if (fileSystem.existsSync(newFolder)) {
      console.log('##INFO: Asset exported. Creating the ZIP File')
      let zipFile =
        destinationFolder + currentDate + '-' + environmentId + '.zip'
      let contentPath = destinationFolder + contentFile

      const zip = new admZip()
      zip.addLocalFile(contentPath)
      zip.addLocalFolder(newFolder)
      zip.writeZip(
        zipFile,
        deleteFiles(
          fileSystem,
          destinationFolder,
          contentFile,
          currentDate,
          environmentId
        )
      )

      console.log('##INFO: Export completed')
      console.log('##INFO: File Saved at: ' + zipFile)
      console.log(
        '##INFO: Log file (if present) at: ' + destinationFolder + logFile
      )
    } else {
      console.error('@@ERROR: Error happens during ZIP file compression')
    }
  } else {
    console.log('##INFO: Export completed')
    console.log('##INFO: File Saved at: ' + destinationFolder + contentFile)
    console.log(
      '##INFO: Log file (if present) at: ' + destinationFolder + logFile
    )
  }
})
