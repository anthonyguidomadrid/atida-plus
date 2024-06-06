import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { theme } from '../tailwind.config'
import '../src/styles/globals.css'
import { i18nToolbar, withI18n } from './decorators/withI18n'
import { withRouter } from './decorators/withRouter'
import { setConfig } from 'next/config'
import publicRuntimeConfig from '../runtimeConfig'

// Allows us to use `publicRuntimeConfig` in stories
// https://dev.to/justincy/publicruntimeconfig-undefined-when-using-storybook-with-next-js-5ea9
setConfig({ publicRuntimeConfig })

export const decorators = [withI18n, withRouter]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    grid: {
      cellSize: 8,
      opacity: 0.5,
      cellAmount: 8
    }
  },
  viewport: {
    viewports: {
      xs: {
        name: 'Design System: XS',
        styles: {
          width: theme.screens.xs,
          height: '100%'
        }
      },
      sm: {
        name: 'Design System: SM',
        styles: {
          width: theme.screens.sm,
          height: '100%'
        }
      },
      md: {
        name: 'Design System: MD',
        styles: {
          width: theme.screens.md,
          height: '100%'
        }
      },
      lg: {
        name: 'Design System: LG',
        styles: {
          width: theme.screens.lg,
          height: '100%'
        }
      },
      ...INITIAL_VIEWPORTS
    }
  }
}

export const globalTypes = {
  ...i18nToolbar
}
