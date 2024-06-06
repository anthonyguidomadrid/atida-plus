import process from 'process'
import { getDefaultLocale } from '../index.mjs'

/**
 * @param {Boolean} argIgnoreCounter
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} fromEnvironment
 * @param {String} fromCounterEntry
 * @param {String} fromCounterLocale
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} toEnvironment
 * @param {String} toCounterEntry
 * @param {String} toCounterLocale
 * @param {Boolean} isVerbose
 * @returns {Promise<void>}
 */
export async function checkCounter(
  argIgnoreCounter,
  fromEnvironment,
  fromCounterEntry,
  fromCounterLocale,
  toEnvironment,
  toCounterEntry,
  toCounterLocale,
  isVerbose = false
) {
  // Check the migration counter is the same
  if (argIgnoreCounter) {
    console.log(
      '\x1b[33m#########################################################\x1b[0m'
    )
    console.log(
      '\x1b[33m####\x1b[0m \x1b[31mWarning: you are ignoring the Migration counter\x1b[0m \x1b[33m####\x1b[0m'
    )
    console.log(
      '\x1b[33m####\x1b[0m \x1b[31mSync might fail due to different Content-types\x1b[0m  \x1b[33m####\x1b[0m'
    )
    console.log(
      '\x1b[33m################\x1b[0m \x1b[31mDo it at your own risk\x1b[0m  \x1b[33m################\x1b[0m'
    )
    console.log(
      '\x1b[33m#########################################################\x1b[0m'
    )
  } else {
    // Retrieve the counters
    const counterEntryFrom = await fromEnvironment.getEntry(fromCounterEntry)
    const counterIndexFromString =
      counterEntryFrom?.fields?.value[fromCounterLocale] ?? 0
    const counterIndexFrom = parseInt(counterIndexFromString)

    const counterEntryTo = await toEnvironment.getEntry(toCounterEntry)
    const counterIndexToString =
      counterEntryTo?.fields?.value[toCounterLocale] ?? 0
    const counterIndexTo = parseInt(counterIndexToString)

    if (isVerbose) {
      console.log(
        '\x1b[32m##LOG:\x1b[0m Counter Entry From: \x1b[35m%s\x1b[0m',
        counterIndexFromString
      )
      console.log(
        '\x1b[32m##LOG:\x1b[0m Counter Entry To: \x1b[35m%s\x1b[0m',
        counterIndexToString
      )
    }

    if (counterIndexFrom === counterIndexTo) {
      // All good, we can sync the environments
      if (isVerbose) {
        console.log('\x1b[32m##LOG:\x1b[0m Counters match, everything is good!')
      }
    } else {
      console.error(
        '\x1b[31m@@ERROR:\x1b[0m Migrations in both environments should be the same'
      )

      if (counterIndexFrom > counterIndexTo) {
        console.error(
          '\x1b[40m\x1b[37m%s\x1b[0m',
          'Run: node apply-migrations.js --to "' + toEnvironment?.sys?.id + '"'
        )
        console.error(
          '\x1b[40m\x1b[37m%s\x1b[0m',
          'For the Space: ' + toEnvironment?.sys?.space?.sys?.id
        )
      } else {
        console.error(
          '\x1b[40m\x1b[37m%s\x1b[0m',
          'Run: node apply-migrations.js --to "' +
            fromEnvironment?.sys?.id +
            '"'
        )
        console.error(
          '\x1b[40m\x1b[37m%s\x1b[0m',
          'For the Space: ' + fromEnvironment?.sys?.space?.sys?.id
        )
      }

      // Migrations Counters mismatch, therefore we exit
      process.exit(1)
    }
  }
}
