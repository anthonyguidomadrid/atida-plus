import { MinimalFooter, MinimalFooterProps } from '.'
import {
  termsConditionsLinks,
  copyright,
  languages
} from './MinimalFooter.mock'

export default {
  component: MinimalFooter,
  title: 'organisms/MinimalFooter',
  args: {
    termsConditionsLinks,
    copyright,
    languages
  }
}

export const withContentFromDesign = (
  args: MinimalFooterProps
): JSX.Element => <MinimalFooter {...args} />
