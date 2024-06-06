import { AnyQuestions, AnyQuestionsProps } from './index'

export default {
  component: AnyQuestions,
  title: 'atoms/AnyQuestions'
}

export const Basic = (args: AnyQuestionsProps): JSX.Element => (
  <AnyQuestions {...args} />
)

export const FullWidth = (args: AnyQuestionsProps): JSX.Element => (
  <AnyQuestions {...args} />
)
FullWidth.args = {
  isFullWidth: true
}
