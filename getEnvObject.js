function getEnvObject(envKey) {
  const envObject = {}
  const envValue = process.env[`${envKey}`]

  envValue?.split(',')?.forEach(function (keyValuePair) {
    const localeKey = keyValuePair.split('|')[0]
    let localeValue = keyValuePair.split('|')[1]

    if (
      localeValue !== undefined &&
      process.env[`${localeValue}`] !== undefined
    ) {
      localeValue = process.env[`${localeValue}`]
    }

    if (localeKey !== undefined) {
      envObject[`${localeKey}`] = localeValue
    }
  })

  return envObject
}

module.exports = getEnvObject
