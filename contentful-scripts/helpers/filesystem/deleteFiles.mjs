import fileSystem from 'fs'

/**
 * @param {fileSystem} fileSystem
 * @param {String} destinationFolder
 * @param {String} contentFile
 * @param {String} currentDate
 * @param {String} environmentId
 * @returns {Boolean}
 */
export function deleteFiles(
  fileSystem,
  destinationFolder,
  contentFile,
  currentDate,
  environmentId
) {
  let newFolder = destinationFolder + currentDate + '-' + environmentId

  setTimeout(() => {
    // Delete folder and json (leave only the zip file)
    fileSystem.unlinkSync(destinationFolder + contentFile)
    fileSystem.rmdirSync(newFolder, { recursive: true })
  }, 5000)

  return true
}
