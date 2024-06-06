/**
 * @param {Object} contentTypeList
 * @param {Boolean} isVerbose
 * @returns {Promise<[]>}
 */
export async function extractExcludedFromConf(
  contentTypeList,
  isVerbose = false
) {
  if (isVerbose) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m extract default excluded CT from Configuration'
    )
  }

  let responseArray = []

  for (let index in contentTypeList) {
    if (
      contentTypeList.hasOwnProperty(index) &&
      contentTypeList[index].hasOwnProperty('mode') &&
      contentTypeList[index].mode === 0
    ) {
      responseArray.push(index)
      if (isVerbose) {
        console.log('\x1b[32m##LOG:\x1b[0m Excluded: ' + index)
      }
    }
  }

  return responseArray
}
