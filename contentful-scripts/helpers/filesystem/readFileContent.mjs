import fs from 'fs'

/**
 * @param {String} filePath
 * @returns {Promise}
 */
export function readFileContent(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err => console.log(err))
      }
      resolve(JSON.parse(data))
    })
  })
}
