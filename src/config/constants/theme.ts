export const themes = {
  default: {
    logo: 'atidaMifarmaLogo.svg',
    colors: {
      current: 'currentColor',
      transparent: '#00000000',
      primary: {
        'caribbean-green': {
          lightest: '#e1f2ef',
          light: '#b0e9dd',
          dark: '#00A88C',
          darker: '#00947B',
          darkest: '#00846E',
          DEFAULT: '#00cca2'
        },
        prime: '#5768ff',
        white: {
          DEFAULT: '#ffffff',
          10: 'rgba(256, 256, 256, .1)'
        },
        'oxford-blue': {
          DEFAULT: '#1a1d32',
          100: '#f4f9fc',
          60: '#6a95ab',
          20: '#1a1d3233',
          10: '#1a1d321a',
          5: '#1a1d320d'
        }
      },
      secondary: {
        green: {
          100: '#ebfffa',
          30: '#129474'
        },
        orange: {
          100: '#fff2de',
          60: '#fea838'
        },
        red: {
          100: '#fff2f2',
          40: '#dc2a2a'
        },
        'portland-orange': '#fd622c',
        'atomic-tangerine': '#ff986b',
        'champagne-pink': '#ffe8d6',
        'champagne-pink-dark': '#FFDDC2',
        'dark-sky-blue': '#b7d4e1',
        'air-superiority-blue': '#6a95ab',
        'darkest-pink': '#DF253B',
        'dark-pink': '#fd4767',
        'light-pink': '#ffeef0',
        'light-beige': '#fff9f4'
      },
      category: {
        'personal-care': {
          light: '#EFF6FE',
          DEFAULT: '#E0F2FF'
        },
        medicines: {
          light: '#F3F8FE',
          DEFAULT: '#E0EEFF'
        },
        'private-label': {
          light: '#EBFBF9',
          DEFAULT: '#CEF6ED'
        },
        pets: {
          light: '#EFFAFE',
          DEFAULT: '#DEF7FE'
        },
        'homeopathy-and-natural-products': {
          light: '#F3FCF1',
          DEFAULT: '#E7FAE2'
        },
        'vitamins-and-supplements': {
          light: '#FDF7F0',
          DEFAULT: '#FCF0E3'
        },
        beauty: {
          light: '#FEF7F3',
          DEFAULT: '#FCEAE2'
        },
        'baby-and-kids': {
          light: '#FEFDEF',
          DEFAULT: '#FFFACE'
        },
        'medical-supply-and-orthopedics': {
          light: '#FEF5F9',
          DEFAULT: '#FCEAEE'
        },
        'nutrition-exercise-and-weight-loss': {
          light: '#FEF7FE',
          DEFAULT: '#FFEEFC'
        }
      },
      feedback: {
        warning: {
          light: '#fbebd2',
          DEFAULT: '#eea22d',
          dark: '#FAE2BD'
        },
        error: {
          light: '#ffe4e4',
          DEFAULT: '#dc2a2a'
        },
        success: {
          light: '#beffef',
          DEFAULT: '#129474'
        },
        info: {
          light: '#f4f9fc',
          DEFAULT: '#6a95ab'
        }
      },
      overlay: {
        light: 'rgba(255,255,255,0.08)',
        DEFAULT: 'rgba(26,29,50,0.2)',
        dark: 'rgba(0,0,0,0.04)'
      },
      ui: {
        'carribean-green-light': '#b0e9dd',
        'carribean-green-lightest': '#e1f2ef',
        'carribean-green-dark': '#CCEBE5',
        guyabano: '#faf9f5',
        'quick-help': '#e8f2f9',
        'oxford-blue-light': '#3b3f5c',
        'primary-selected': '#262b4f',
        'secondary-selected': '#00cca2',
        'star-yellow': '#ffc05e',
        campaign: {
          base: '#ff3850'
        },
        grey: {
          lightest: '#e5e5e5',
          light: '#d6d5d2',
          medium: '#B7B7B5',
          DEFAULT: '#969696',
          'default-alt': '#b5b5b5',
          dark: '#757575',
          'dark-alt': '#737373', // this dark grey is more accessible on top of the other light ui colours,
          neutral: '#f6f6f3',
          'dark-check-box': '#919DA1'
        },
        black: '#17191A',
        'black-5': 'rgba(26, 29, 50, 0.05)',
        'black-10': 'rgba(26, 29, 50, 0.1)'
      },
      labels: {
        tangerine: {
          base: '#F09000',
          light: '#FCF4D6'
        },
        'coral-red': {
          base: '#FF4343',
          light: '#FFE7E7'
        },
        'campaign-green': '#129474'
      }
    },
    fontFamily: {
      heading: ['Moranga', 'Georgia', 'serif'],
      body: ['Sohne', 'Helvetica', 'Arial', 'sans-serif'],
      yotpo: 'yotpo-widget-font'
    }
  },
  sparMed: {
    logo: 'sparmedLogo.svg',
    // Theme name used in the feature flag
    colors: {
      current: 'currentColor',
      transparent: '#00000000',
      primary: {
        'caribbean-green': {
          lightest: '#e1f2ef',
          light: '#b4e8b4',
          dark: '#1c5a1c',
          darker: '#00947B',
          darkest: '#00846E',
          DEFAULT: '3bc43b'
        },
        prime: '#39c088',
        white: {
          DEFAULT: '#ffffff',
          10: 'rgba(256, 256, 256, .1)'
        },
        'oxford-blue': {
          DEFAULT: '#7676ff',
          100: '#7676ff',
          60: '#c3c3ed',
          20: '#39c088',
          10: '#1a1d321a',
          5: '#b7b7f9'
        }
      },
      secondary: {
        green: {
          100: '##7676ff',
          30: '#b7b7f9'
        },
        orange: {
          100: '#ffc14e',
          60: '#ffeac4'
        },
        red: {
          100: '#ff4e4e',
          40: '#ffc4c4'
        },
        'portland-orange': '#fd622c',
        'atomic-tangerine': '#ff986b',
        'champagne-pink': '#ffe8d6',
        'champagne-pink-dark': '#FFDDC2',
        'dark-sky-blue': '#b7d4e1',
        'air-superiority-blue': '#6a95ab',
        'darkest-pink': '#DF253B',
        'dark-pink': '#fd4767',
        'light-pink': '#ffeef0',
        'light-beige': '#fff9f4'
      },
      category: {
        'personal-care': {
          light: '#39c088',
          DEFAULT: '#39c088'
        },
        medicines: {
          light: '#F5FCFF',
          DEFAULT: '#39c088'
        },
        'private-label': {
          light: '#EFFBF8',
          DEFAULT: '#39c088'
        },
        pets: {
          light: '#F4FBFF',
          DEFAULT: '#39c088'
        },
        'homeopathy-and-natural-products': {
          light: '#F8FEF6',
          DEFAULT: '#39c088'
        },
        'vitamins-and-supplements': {
          light: '#FEFAF5',
          DEFAULT: '#39c088'
        },
        beauty: {
          light: '#FEF7F4',
          DEFAULT: '#39c088'
        },
        'baby-and-kids': {
          light: '#FFFFF4',
          DEFAULT: '#39c088'
        },
        'medical-supply-and-orthopedics': {
          light: '#FEF4F6',
          DEFAULT: '#39c088'
        },
        'nutrition-exercise-and-weight-loss': {
          light: '#FFFBFE',
          DEFAULT: '#39c088'
        }
      },
      feedback: {
        warning: {
          light: '#fbebd2',
          DEFAULT: '#eea22d',
          dark: '#FAE2BD'
        },
        error: {
          light: '#ffe4e4',
          DEFAULT: '#dc2a2a'
        },
        success: {
          light: '#beffef',
          DEFAULT: '#129474'
        },
        info: {
          light: '#f4f9fc',
          DEFAULT: '#6a95ab'
        }
      },
      overlay: {
        light: 'rgba(255,255,255,0.08)',
        DEFAULT: 'rgba(26,29,50,0.2)',
        dark: 'rgba(0,0,0,0.04)'
      },
      ui: {
        'carribean-green-light': '#b0e9dd',
        'carribean-green-lightest': '#e1f2ef',
        'carribean-green-dark': '#CCEBE5',
        guyabano: '#faf9f5',
        'quick-help': '#e8f2f9',
        'oxford-blue-light': '#3b3f5c',
        'primary-selected': '#262b4f',
        'secondary-selected': '#00cca2',
        'star-yellow': '#ffc05e',
        campaign: {
          base: '#ff3850'
        },
        grey: {
          lightest: '#e5e5e5',
          light: '#d6d5d2',
          medium: '#B7B7B5',
          DEFAULT: '#969696',
          'default-alt': '#b5b5b5',
          dark: '#757575',
          'dark-alt': '#737373', // this dark grey is more accessible on top of the other light ui colours,
          neutral: '#f6f6f3',
          'dark-check-box': '#919DA1'
        },
        black: '#17191A',
        'black-5': 'rgba(26, 29, 50, 0.05)',
        'black-10': 'rgba(26, 29, 50, 0.1)'
      },
      labels: {
        tangerine: {
          base: '#F09000',
          light: '#FCF4D6'
        },
        'coral-red': {
          base: '#FF4343',
          light: '#FFE7E7'
        },
        'campaign-green': '#129474'
      }
    },
    fontFamily: {
      heading: ['Monofett', 'Modak'],
      body: ['Monofett', 'Modak'],
      yotpo: 'yotpo-widget-font'
    }
  }
}
