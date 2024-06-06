// Imports
import minimist from 'minimist'
import dotenv from 'dotenv'
import keypress from 'keypress'
import inquirer from 'inquirer'

// Import contentful utility
// eslint-disable-next-line
import contentful from 'contentful-management'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { getEnvironmentSingleton } from '../helpers/index.mjs'
import { localeExistsInEnvironment } from '../helpers/contentful/localeExistsInEnvironment.mjs'
import { readFileContent } from '../helpers/filesystem/readFileContent.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import fs from 'fs'

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }
import {
  FgGreen,
  FgRed,
  FgYellow,
  FgCyan,
  Reset,
  Reverse
} from './colors/colors.mjs'

export async function setLocale() {
  let parsedArgs = minimist(process.argv.slice(2))
  if (parsedArgs.hasOwnProperty('env')) {
    const environmentId = parsedArgs.env

    let environmentSingleton = await getEnvironmentSingleton(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentId
    )
    let localesFromEnvironment = []
    await environmentSingleton.getLocales().then(response => {
      response.items.forEach(item => {
        const locale = (({ code }) => ({
          code
        }))(item)
        localesFromEnvironment.push(locale)
      })
    })

    const localesFolder = `${__dirname}/locales`
    let localeFiles = []
    if (parsedArgs.hasOwnProperty('ci')) {
      fs.readdirSync(localesFolder).forEach(file => {
        readFileContent(`${__dirname}/locales/${file}`).then(
          localeFromFileData => {
            if (
              localeExistsInEnvironment(
                localeFromFileData,
                localesFromEnvironment
              )
            ) {
              console.log(
                `${FgCyan}'${localeFromFileData.code}'${Reset} locale already exists in the Contentful environment ${FgYellow}'${environmentId}'${Reset}`
              )
            } else {
              console.log(
                `### Creating ${FgCyan}'${localeFromFileData.code}'${Reset} locale in Contentful environment ${FgYellow}'${environmentId}'${Reset}...`
              )
              environmentSingleton
                .createLocale(localeFromFileData)
                .then(locale => {
                  console.log(
                    `${FgGreen}Locale '${localeFromFileData.code}' created successfully!${Reset}`
                  )
                  console.log(locale)
                  console.log('### --------------------------------')
                })
                .catch(error => {
                  console.error(error)
                  process.exit(1)
                })
            }
          }
        )
      })
    } else {
      fs.readdirSync(localesFolder).forEach(file => {
        localeFiles.push({ name: file, checked: true })
      })
      inquirer
        .prompt([
          {
            type: 'checkbox',
            message: `These are the available locales. Select the locale you want to set up for the Contentful environment ${FgYellow}'${environmentId}'${Reset}`,
            name: 'locales',
            choices: localeFiles,
            validate(answer) {
              if (answer.length < 1) {
                return 'You must select at least one locale.'
              }

              return true
            }
          }
        ])
        .then(answers => {
          // Use user feedback for... whatever!!
          answers.locales.forEach(localeName => {
            readFileContent(`${__dirname}/locales/${localeName}`).then(
              localeFromFileData => {
                if (
                  localeExistsInEnvironment(
                    localeFromFileData,
                    localesFromEnvironment
                  )
                ) {
                  console.log(
                    `${FgCyan}'${localeFromFileData.code}'${Reset} locale already exists in the Contentful environment ${FgYellow}'${environmentId}'${Reset}`
                  )
                } else {
                  console.log(
                    `### Creating ${FgCyan}'${localeFromFileData.code}'${Reset} locale in Contentful environment ${FgYellow}'${environmentId}'${Reset}...`
                  )
                  environmentSingleton
                    .createLocale(localeFromFileData)
                    .then(locale => {
                      console.log(
                        `${FgGreen}Locale '${localeFromFileData.code}' created successfully!${Reset}`
                      )
                      console.log(locale)
                      console.log('### --------------------------------')
                    })
                    .catch(error => {
                      console.error(error)
                      process.exit(1)
                    })
                }
              }
            )
          })
        })
        .catch(error => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log(
              error,
              "Prompt couldn't be rendered in the current environment"
            )
          } else {
            // Something else went wrong
            console.log(error)
          }
          process.exit(1)
        })
    }
  } else {
    console.error(
      `${FgRed}@@ERROR${Reset} An environment should be specified.
      Please use ${FgCyan}$node scripts/set-locale${Reset} ${FgYellow}--env${Reset} ${Reverse}YOUR-ENVIRONMENT-ID${Reset}`
    )
    process.exit(1)
  }
}

setLocale()
