/* eslint-disable @typescript-eslint/no-var-requires */
const tsConfig = require('../tsconfig.json')
const pathAliases = tsConfig.compilerOptions.paths

module.exports = {
  presets: ['next/babel'],
  /* this plugin is so tools which don't read tsconfig can still resolve our aliases */
  plugins: [
    [
      'module-resolver',
      {
        root: tsConfig.compilerOptions.baseUrl,
        alias: Object.keys(pathAliases).reduce(
          (aliases, aliasKey) => ({
            ...aliases,
            [aliasKey.replace('/*', '')]: pathAliases[aliasKey][0].replace(
              '/*',
              ''
            )
          }),
          {}
        )
      }
    ],
    'transform-class-properties'
  ],
  env: {
    test: {
      plugins: ['dynamic-import-node']
    },
    extract_translations: {
      plugins: [['i18next-extract', { keySeparator: null }]]
    }
  }
}
