const { svgRules } = require('../webpack.config')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-css-modules-preset',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  staticDirs: ['../public'],
  webpackFinal: config => {
    config.module.rules = [
      ...svgRules,
      ...config.module.rules.filter(
        rule => !rule.test.toString().includes('svg')
      )
    ]

    // compatibility with dompurify
    config.node = {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      tls: 'empty'
    }

    return config
  }
}
