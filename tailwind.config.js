const plugin = require('tailwindcss/plugin')
const rem = value => `${value / 16}rem`
const { breakpoints } = require('./src/domains/breakpoints/config')
const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height')

const safeColors = [
  'primary-caribbean-green',
  'primary-caribbean-green-light',
  'primary-caribbean-green-lightest',
  'primary-caribbean-green-dark',
  'primary-caribbean-green-darker',
  'primary-caribbean-green-darkest',
  'primary-oxford-blue',
  'primary-prime',
  'primary-white',
  'secondary-air-superiority-blue',
  'secondary-atomic-tangerine',
  'secondary-champagne-pink',
  'secondary-dark-sky-blue',
  'secondary-portland-orange',
  'secondary-pink-light',
  'secondary-pink-dark',
  'category-personal-care',
  'category-medicines',
  'category-private-label',
  'category-pets',
  'category-homeopathy-and-natural-products',
  'category-vitamins-and-supplements',
  'category-beauty',
  'category-baby-and-kids',
  'category-medical-supply-and-orthopedics',
  'category-nutrition-exercise-and-weight-loss',
  'category-personal-care-light',
  'category-medicines-light',
  'category-private-label-light',
  'category-pets-light',
  'category-homeopathy-and-natural-products-light',
  'category-vitamins-and-supplements-light',
  'category-beauty-light',
  'category-baby-and-kids-light',
  'category-medical-supply-and-orthopedics-light',
  'category-nutrition-exercise-and-weight-loss-light',
  'ui-black',
  'labels-campaign-green',
  'labels-coral-red-base',
  'labels-coral-red-light',
  'labels-tangerine-light',
  'labels-tangerine-base'
]

module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.mdx'],
  safelist: [
    ...safeColors.flatMap(color => [
      `bg-${color}`,
      `hover:bg-${color}`,
      `focus:bg-${color}`,
      `active:bg-${color}`
    ]),
    ...safeColors.map(color => `text-${color}`),
    ...safeColors.map(color => `border-${color}`),
    ...safeColors.map(color => `placeholder-${color}`),
    / braintree /,
    /^.*react-select.*$/
  ],
  important: true, // TODO: PLUS-3231 - can we selectively apply !important to needed areas rather than apply it globally
  corePlugins: {
    container: false
  },
  theme: {
    /**
     * Breakpoints defined in em as per: https://zellwk.com/blog/media-query-units/#:~:text=This%20is%20the%20correct%20implementation,font%2Dsize%20of%20the%20browser.
     * Assuming base font size of 16px.
     */
    screens: breakpoints,
    colors: {
      current: 'currentColor',
      transparent: 'var(--color-transparent)',
      primary: {
        'caribbean-green': {
          lightest: 'var(--color-primary-caribbean-green--lightest)',
          light: 'var(--color-primary-caribbean-green--light)',
          dark: 'var(--color-primary-caribbean-green--dark)',
          darker: 'var(--color-primary-caribbean-green--darker)',
          darkest: 'var(--color-primary-caribbean-green--darkest)',
          DEFAULT: 'var(--color-primary-caribbean-green)'
        },
        prime: 'var(--color-primary-prime)',
        white: {
          DEFAULT: 'var(--color-primary-white)',
          10: 'var(--color-primary-white--10)'
        },
        'oxford-blue': {
          DEFAULT: 'var(--color-primary-oxford-blue)',
          100: 'var(--color-primary-oxford-blue--100)',
          60: 'var(--color-primary-oxford-blue--60)',
          20: 'var(--color-primary-oxford-blue--20)',
          10: 'var(--color-primary-oxford-blue--10)',
          5: 'var(--color-primary-oxford-blue--5)'
        }
      },
      secondary: {
        green: {
          100: 'var(--color-secondary-green--100)',
          30: 'var(--color-secondary-green--30)'
        },
        orange: {
          100: 'var(--color-secondary-orange--100)',
          60: 'var(--color-secondary-orange--60)'
        },
        red: {
          100: 'var(--color-secondary-red--100)',
          40: 'var(--color-secondary-red--40)'
        },
        'portland-orange': 'var(--color-secondary-portland-orange)',
        'atomic-tangerine': 'var(--color-secondary-atomic-tangerine)',
        'champagne-pink': 'var(--color-secondary-champagne-pink)',
        'champagne-pink-dark': 'var(--color-secondary-champagne-pink--dark)',
        'dark-sky-blue': 'var(--color-secondary-dark-sky-blue)',
        'air-superiority-blue': 'var(--color-secondary-air-superiority-blue)',
        'darkest-pink': 'var(--color-secondary-darkest-pink)',
        'dark-pink': 'var(--color-secondary-dark-pink)',
        'light-pink': 'var(--color-secondary-light-pink)',
        'light-beige': 'var(--color-secondary-light-beige)'
      },
      category: {
        'personal-care': {
          light: 'var(--color-category-personal-care--light)',
          DEFAULT: 'var(--color-category-personal-care)'
        },
        medicines: {
          light: 'var(--color-category-medicines--light)',
          DEFAULT: 'var(--color-category-medicines)'
        },
        'private-label': {
          light: 'var(--color-category-private-label--light)',
          DEFAULT: 'var(--color-category-private-label)'
        },
        pets: {
          light: 'var(--color-category-pets--light)',
          DEFAULT: 'var(--color-category-pets)'
        },
        'homeopathy-and-natural-products': {
          light: 'var(--color-category-homeopathy-and-natural-products--light)',
          DEFAULT: 'var(--color-category-homeopathy-and-natural-products)'
        },
        'vitamins-and-supplements': {
          light: 'var(--color-category-vitamins-and-supplements--light)',
          DEFAULT: 'var(--color-category-vitamins-and-supplements)'
        },
        beauty: {
          light: 'var(--color-category-beauty--light)',
          DEFAULT: 'var(--color-category-beauty)'
        },
        'baby-and-kids': {
          light: 'var(--color-category-baby-and-kids--light)',
          DEFAULT: 'var(--color-category-baby-and-kids)'
        },
        'medical-supply-and-orthopedics': {
          light: 'var(--color-category-medical-supply-and-orthopedics--light)',
          DEFAULT: 'var(--color-category-medical-supply-and-orthopedics)'
        },
        'nutrition-exercise-and-weight-loss': {
          light:
            'var(--color-category-nutrition-exercise-and-weight-loss--light)',
          DEFAULT: 'var(--color-category-nutrition-exercise-and-weight-loss)'
        }
      },
      feedback: {
        warning: {
          light: 'var(--color-feedback-warning--light)',
          DEFAULT: 'var(--color-feedback-warning)',
          dark: 'var(--color-feedback-warning--dark)'
        },
        error: {
          light: 'var(--color-feedback-error--light)',
          DEFAULT: 'var(--color-feedback-error)'
        },
        success: {
          light: 'var(--color-feedback-success--light)',
          DEFAULT: 'var(--color-feedback-success)'
        },
        info: {
          light: 'var(--color-feedback-info--light)',
          DEFAULT: 'var(--color-feedback-info)'
        }
      },
      overlay: {
        light: 'var(--color-overlay--light)',
        DEFAULT: 'var(--color-overlay)',
        dark: 'var(--color-dark)'
      },
      ui: {
        'carribean-green-light': 'var(--color-ui-carribean-green-light)',
        'carribean-green-lightest': 'var(--color-ui-carribean-green-lightest)',
        'carribean-green-dark': 'var(--color-ui-carribean-green-dark)',
        guyabano: 'var(--color-ui-guyabano)',
        'quick-help': 'var(--color-ui-quick-help)',
        'oxford-blue-light': 'var(--color-ui-oxford-blue-light)',
        'primary-selected': 'var(--color-ui-primary-selected)',
        'secondary-selected': 'var(--color-ui-secondary-selected)',
        'star-yellow': 'var(--color-ui-star-yellow)',
        campaign: {
          base: 'var(--color-ui-campaing)'
        },
        grey: {
          lightest: 'var(--color-ui-grey--lightest)',
          light: 'var(--color-ui-grey--light)',
          medium: 'var(--color-ui-grey--medium)',
          DEFAULT: 'var(--color-ui-grey)',
          'default-alt': 'var(--color-ui-grey--default-alt)',
          dark: 'var(--color-ui-grey--dark)',
          'dark-alt': 'var(--color-ui-grey--dark-alt)',
          neutral: 'var(--color-ui-grey--neutral)',
          'dark-check-box': 'var(--color-ui-grey--dark-check-box)'
        },
        black: 'var(--color-ui-black)',
        'black-5': 'var(--color-ui-black--5)',
        'black-10': 'var(--color-ui-black--10)'
      },
      labels: {
        tangerine: {
          base: 'var(--color-labels-tangerine)',
          light: 'var(--color-labels-tangerine--light)'
        },
        'coral-red': {
          base: 'var(--color-labels-coral-red)',
          light: 'var(--color-labels-coral-red--light)'
        },
        'campaign-green': 'var(--color-labels-campaign-green)'
      }
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      crosshair: 'crosshair',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out'
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'sm-reverse': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
      'filters-btn': '0 2px 30px rgba(0, 0, 0, 0.1)',
      modal: '0 8px 24px rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 2px 4px 0px rgba(0, 0, 0, 0.08)',
      lg:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg-reverse':
        '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      xl:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl-reverse':
        '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
      '2xl':
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl-reverse':
        '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)',
      '3xl':
        '0px 20px 36px -20px rgba(0, 0, 0, 0.1), 0px 2px 30px rgba(0, 0, 0, 0.05)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none'
    },
    fontFamily: {
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
      yotpo: 'var(--font-yotpo)'
    },
    fontSize: {
      xxs: [rem(10), { lineHeight: rem(16) }],
      xs: [rem(12), { lineHeight: rem(20) }],
      sm: [rem(14), { lineHeight: rem(20) }],
      'sm-base': [rem(14), { lineHeight: rem(22) }],
      base: [rem(16), { lineHeight: rem(24) }],
      lg: [rem(18), { lineHeight: rem(22) }],
      'lg-xl': [rem(18), { lineHeight: rem(26) }],
      xl: [rem(20), { lineHeight: rem(24) }],
      '1.5xl': [rem(20), { lineHeight: rem(30) }],
      '2xl': [rem(22), { lineHeight: rem(26) }],
      '3xl': [rem(24), { lineHeight: rem(32) }],
      '4xl': [rem(26), { lineHeight: rem(32) }],
      '4.5xl': [rem(28), { lineHeight: rem(34) }],
      '5xl': [rem(32), { lineHeight: rem(40) }],
      '6xl': [rem(36), { lineHeight: rem(44) }],
      '7xl': [rem(40), { lineHeight: rem(44) }],
      '8xl': [rem(48), { lineHeight: rem(56) }],
      '9xl': [rem(64), { lineHeight: rem(64) }]
    },
    fontWeight: {
      light: '300',
      normal: '400',
      semibold: '500',
      bold: '600'
    },
    spacing: {
      'fixed-1px': '1px',
      '1.5px': '1.5px',
      '3px': '3px',
      '7px': '7px',
      0: '0px',
      0.125: rem(1),
      0.25: rem(2),
      0.5: rem(4),
      0.75: rem(6),
      1: rem(8),
      1.125: rem(9),
      1.25: rem(10),
      1.5: rem(12),
      1.75: rem(14),
      1.8: rem(14.5),
      1.9: rem(15),
      2: rem(16),
      2.25: rem(18),
      2.5: rem(20),
      2.75: rem(22),
      3: rem(24),
      3.25: rem(26),
      3.5: rem(28),
      3.625: rem(29),
      4: rem(32),
      4.25: rem(34),
      4.5: rem(36),
      4.75: rem(38),
      5: rem(40),
      5.25: rem(42),
      5.5: rem(44),
      5.75: rem(46),
      6: rem(48),
      6.25: rem(50),
      6.5: rem(52),
      7: rem(56),
      7.25: rem(58),
      7.5: rem(60),
      8: rem(64),
      8.25: rem(66),
      8.5: rem(68),
      9: rem(72),
      9.5: rem(76),
      10: rem(80),
      11: rem(88),
      11.25: rem(90),
      11.5: rem(92),
      12: rem(96),
      12.5: rem(100),
      12.75: rem(102),
      13: rem(104),
      14: rem(112),
      14.5: rem(116),
      15: rem(120),
      15.5: rem(124),
      16: rem(128),
      16.5: rem(132),
      17: rem(136),
      18: rem(144),
      19: rem(152),
      20: rem(160),
      21: rem(168),
      22: rem(176),
      23: rem(182),
      23.5: rem(188),
      24: rem(192),
      25: rem(200),
      26: rem(208),
      27.25: rem(218),
      28.5: rem(228),
      29: rem(232),
      30.25: rem(242),
      34: rem(272),
      35: rem(280),
      37.25: rem(298),
      38: rem(304),
      40: rem(320),
      41: rem(328),
      42: rem(336),
      43: rem(344),
      45: rem(360),
      47: rem(376),
      52: rem(416),
      54: rem(432),
      64: rem(512),
      66: rem(528),
      69: rem(552),
      71: rem(568),
      72: rem(576),
      72.5: rem(580),
      83.25: rem(666),
      100: rem(800),
      '3/7': '42.8571429%',
      '1/2': '50%',
      '4/7': '57.1428571%',
      'slider-buttons': 'calc(50% - 20px)',
      'product-slider-buttons': 'calc(50% - 76px)',
      'product-slider-buttons-sm': 'calc(50% - 60px)',
      'category-slider-sm': 'calc((100% - 620px) / 10)',
      'brand-tiles': 'calc(100vw / 3 - 1.4rem)',
      'brand-tiles-sm': 'calc(100vw / 6 - 1.7rem)',
      'brand-tiles-lg': rem(132),
      'w-screen': '100vw',
      'w-1/2-screen': '50vw'
    },
    zIndex: {
      1: 1,
      2: 2,
      9: 9,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      auto: 'auto'
    },
    extend: {
      borderWidth: {
        DEFAULT: '1px'
      },
      lineHeight: {
        5.375: rem(22),
        11: rem(42),
        12: rem(44),
        13: rem(46)
      },
      borderRadius: {
        md: rem(4),
        '4xl': rem(32)
      },
      height: {
        0.125: rem(1),
        0.25: rem(2),
        0.5: rem(4),
        1: rem(8),
        3: rem(24),
        3.5: rem(28),
        6: rem(48),
        6.25: rem(50),
        7: rem(56),
        8: rem(64),
        11.75: rem(94),
        22.5: rem(180),
        24.5: rem(196),
        26: rem(208),
        26.5: rem(212),
        27: rem(216),
        28: rem(224),
        28.5: rem(228),
        30: rem(240),
        30.5: rem(244),
        31: rem(248),
        32: rem(256),
        32.5: rem(260),
        34: rem(272),
        34.5: rem(276),
        35: rem(280),
        35.5: rem(284),
        36: rem(288),
        37: rem(296),
        38: rem(304),
        40: rem(320),
        45: rem(360),
        48: rem(384),
        50: rem(400),
        50.5: rem(404),
        51.5: rem(412),
        52: rem(416),
        52.5: rem(420),
        53: rem(424),
        56: rem(448),
        60: rem(480),
        63: rem(504),
        64: rem(512),
        65: rem(520),
        68: rem(544),
        screen: '100vh',
        '4/12': '33.33%'
      },
      minHeight: {
        0: 0,
        4.5: rem(32),
        5: rem(40),
        6: rem(48),
        8: rem(64),
        9: rem(72),
        10: rem(80),
        10.25: rem(82),
        11: rem(88),
        12: rem(96),
        15.25: rem(122),
        16: rem(128),
        17: rem(136),
        18: rem(144),
        19: rem(152),
        22.5: rem(180),
        24: rem(192),
        27: rem(216),
        28: rem(228),
        29: rem(232),
        30: rem(240),
        32: rem(256),
        32.5: rem(260),
        32.75: rem(262),
        34.25: rem(274),
        34.75: rem(278),
        35.5: rem(284),
        36.25: rem(290),
        37: rem(296),
        38: rem(304),
        38.25: rem(306),
        39: rem(312),
        40: rem(320),
        44: rem(352),
        46: rem(368),
        48: rem(384),
        56: rem(448),
        63: rem(504),
        'screen-80': '80vh'
      },
      maxHeight: {
        5: rem(40),
        5.5: rem(44),
        8: rem(64),
        9: rem(72),
        11: rem(88),
        13: rem(104),
        19: rem(152),
        24: rem(192),
        25: rem(200),
        29: rem(232),
        30: rem(240),
        30.75: rem(246),
        32: rem(256),
        32.5: rem(260),
        36: rem(288),
        40: rem(320),
        50: rem(400),
        '3/5': '60%',
        '4/5': '80%',
        inherit: 'inherit'
      },
      width: {
        px: 1,
        1.5: rem(12),
        2: rem(16),
        6.25: rem(50),
        8: rem(64),
        14: rem(112),
        17: rem(136),
        18: rem(144),
        22: rem(176),
        22.5: rem(180),
        23: rem(182),
        23.25: rem(184),
        23.5: rem(186),
        26: rem(208),
        27: rem(216),
        28: rem(224),
        29: rem(232),
        30: rem(240),
        31: rem(248),
        43: rem(344),
        44.25: rem(354),
        45: rem(360),
        48: rem(382),
        50: rem(400),
        54: rem(432),
        66: rem(528),
        112: rem(896),
        164: rem(1312),
        '88px': 88,
        '96px': 96,
        '112px': 112,
        '2/10': '20%',
        '3/12': '25%',
        '4/12': '33.33%',
        '4/10': '40%',
        '4.2/10': '42%',
        '6/12': '50%',
        '5.5/10': '55%',
        '6/10': '60%',
        '8/12': '66.66%',
        '13/10': '130%',
        'gallery-thumbnails': 'calc(100vw - 4rem)',
        'product-slider-container-sm': 'calc(100% + 16px)',
        'product-slider-container-md': 'calc(100% + 24px)'
      },
      minWidth: {
        5: rem(40),
        6: rem(48),
        6.25: rem(50),
        6.5: rem(52),
        7: rem(56),
        8: rem(64),
        10: rem(80),
        11: rem(88),
        12: rem(96),
        13: rem(104),
        14: rem(112),
        18: rem(144),
        21: rem(168),
        22: rem(176),
        26: rem(208),
        28.5: rem(228),
        34: rem(272),
        36: rem(288),
        38: rem(304),
        '1/2': '50%',
        '6/10': '60%'
      },
      maxWidth: {
        6: rem(48),
        7: rem(56),
        8: rem(64),
        9: rem(72),
        11: rem(88),
        11.5: rem(92),
        12: rem(96),
        14: rem(112),
        16: rem(128),
        18: rem(144),
        19: rem(152),
        20: rem(160),
        24: rem(192),
        27: rem(216),
        28: rem(224),
        30: rem(240),
        32: rem(256),
        33: rem(264),
        34: rem(272),
        38: rem(304),
        40: rem(320),
        41: rem(328),
        42: rem(336),
        43: rem(344),
        44.25: rem(354),
        45: rem(360),
        46: rem(368),
        48: rem(382),
        49: rem(390),
        50: rem(400),
        52: rem(416),
        54: rem(432),
        60: rem(480),
        61.875: rem(495),
        64: rem(512),
        65: rem(520),
        66: rem(528),
        72: rem(576),
        74: rem(592),
        112: rem(896),
        136: rem(1088),
        164: rem(1312),
        '3.2/10': '32%',
        '4.2/10': '42%',
        '2.25/5': '45%',
        '2.35/5': '47%',
        '2.4/5': '48%',
        '2.45/5': '49%',
        '8/12': '66.66%',
        '4/5': '80%',
        full: '100%',
        'category-slider-sm': 'calc(100% + ((100% - 620px) / 5))'
      },
      strokeWidth: {
        4: 4
      },
      gridTemplateRows: {
        'brand-tiles': `repeat(2, min-content)`,
        'brand-tiles-sm': `repeat(1, 1fr)`,
        '6-auto': `repeat(6, auto)`
      },
      gridTemplateColumns: {
        'header-layout': `minmax(50px, 50px) auto minmax(100px, 235px)`,
        'sm-header-layout': `minmax(50px, 50px) auto minmax(100px, 645px)`,
        'brand-tiles': `repeat(3, min-content)`,
        'brand-tiles-sm': `repeat(6, 1fr)`,
        'brand-tiles-lg': `repeat(7, 1fr)`,
        'sidebar-right': '2fr 1fr',
        'pdp-key-details-table-sm': `repeat(2, 248px)`,
        'promo-dp': `1fr 5fr`
      },
      screens: {
        'xs-only': { max: breakpoints.xsOnly },
        'sm-and-md-only': { max: breakpoints['sm-and-md-only'] },
        'sm-and-below': { max: breakpoints.smBelow }
      },
      keyframes: {
        'opacity-fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'opacity-fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        'slide-in': {
          '0%': {
            opacity: 0,
            transform: 'translateX(115%)',
            color: '#129474'
          },
          '15%': {
            opacity: 1,
            transform: 'translateX(0)',
            color: '#129474'
          },
          '80%': {
            transform: 'translateX(0)',
            color: '#129474'
          },
          '99%': { opacity: 1, transform: 'translateX(115%)' },
          '100%': { opacity: 0, transform: 'translateX(115%)' }
        },
        'slide-out': {
          '80%': { opacity: 1, transform: 'translateX(0)' },
          '98%': { opacity: 0, transform: 'translateX(115%)' },
          '99%': { opacity: 0, transform: 'translateX(0)' },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        'fade-in': 'opacity-fade-in 0.4s linear',
        'fade-out': 'opacity-fade-out 0.4s linear',
        'slide-in-2000': 'slide-in 2s forwards',
        'slide-out-2000': 'slide-out 2s',
        'bounce-400': 'bounce 1s infinite 400ms'
      },
      scale: {
        200: '2'
      },
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms',
        5000: '5000ms'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    iOSHeight,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.icon-logo': {
          width: rem(134),
          height: rem(26)
        },
        '.icon-logo-mifarma': {
          width: rem(66),
          height: rem(40),
          '@screen sm': {
            width: rem(74),
            height: rem(40)
          },
          '@screen md': {
            width: rem(74),
            height: rem(40)
          }
        },
        '.icon-12': {
          width: rem(12),
          height: rem(12)
        },
        '.icon-14': {
          width: rem(14),
          height: rem(14)
        },
        '.icon-16': {
          width: rem(16),
          height: rem(16)
        },
        '.icon-18-22': {
          width: rem(18),
          height: rem(22)
        },
        '.icon-19': {
          width: rem(19),
          height: rem(19)
        },
        '.icon-20-16': {
          width: rem(20),
          height: rem(16)
        },
        '.icon-20': {
          width: rem(20),
          height: rem(20)
        },
        '.icon-22': {
          width: rem(22),
          height: rem(22)
        },
        '.icon-22-20': {
          width: rem(22),
          height: rem(20)
        },
        '.icon-24': {
          width: rem(24),
          height: rem(24)
        },
        '.icon-32': {
          width: rem(32),
          height: rem(32)
        },
        '.icon-40': {
          width: rem(40),
          height: rem(40)
        },
        '.icon-68-48': {
          width: rem(68),
          height: rem(48)
        },
        '.icon-48': {
          width: rem(48),
          height: rem(48)
        },
        '.icon-160': {
          width: rem(160),
          height: rem(160)
        }
      })
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.underline': {
          textUnderlineOffset: rem(2)
        },
        '.text-inherit': {
          color: 'inherit'
        }
      })
    }),
    plugin(({ addUtilities, theme }) => {
      addUtilities(
        {
          '.container': {
            width: '100%',
            paddingLeft: theme('spacing.2'),
            paddingRight: theme('spacing.2'),
            '@screen sm': {
              paddingLeft: theme('spacing.5'),
              paddingRight: theme('spacing.5')
            },
            '@screen md': {
              paddingLeft: theme('spacing.8'),
              paddingRight: theme('spacing.8')
            }
          },
          '.container-fixed': {
            '@screen md': {
              maxWidth: breakpoints.md,
              width: breakpoints.md
            },
            '@screen lg': {
              maxWidth: breakpoints.lg,
              width: breakpoints.lg
            }
          }
        },
        ['responsive']
      )
    }),
    plugin(({ addUtilities }) => {
      addUtilities(
        {
          '.default-image': {
            img: {
              transition: 'transform .3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)'
            }
          },
          '.zoomed-image': {
            img: {
              transform: 'scale(1.02)'
            }
          }
        },
        ['hover']
      )
    }),
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.drawer-content-width': {
          '@screen sm-and-below': {
            width: 'calc(100vw - 2rem)'
          }
        },
        '.no-border': {
          border: '0px !important'
        }
      })
    })
  ]
}
