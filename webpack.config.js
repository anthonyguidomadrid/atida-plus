const path = require('path')

const singleColourSvgs = [
  path.resolve(__dirname, './src/assets/svg/navigation-16px'),
  path.resolve(__dirname, './src/assets/svg/navigation-24px')
]

const svgRules = [
  {
    test: /\.svg$/,
    include: singleColourSvgs,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                removeDimensions: true,
                convertColors: { currentColor: true }
              }
            ]
          },
          titleProp: true,
          ref: true
        }
      },
      'url-loader'
    ]
  },
  {
    test: /\.svg$/,
    exclude: singleColourSvgs,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                removeTitle: false,
                removeDimensions: true
              }
            ]
          },
          titleProp: true,
          ref: true
        }
      },
      'url-loader'
    ]
  }
]

module.exports = { svgRules }
