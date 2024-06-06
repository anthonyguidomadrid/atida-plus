const em = (value, base = 16) => `${value / base}em`

module.exports = {
  breakpoints: {
    xxs: em(340),
    xs: em(375),
    xsOnly: em(767),
    sm: em(768),
    smBelow: em(1023),
    'sm-and-md-only': em(1439),
    md: em(1024),
    lg: em(1440)
  },
  pixelBreakpoints: {
    xs: 375,
    xsOnly: 767,
    sm: 768,
    smBelow: 1023,
    'sm-and-md-only': 1439,
    md: 1024,
    lg: 1440
  }
}
