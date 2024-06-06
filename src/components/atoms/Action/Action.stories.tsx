import { Action, ActionProps } from './index'
import React from 'react'

export default {
  component: Action,
  title: 'atoms/Action'
}

export const Basic = (args: ActionProps): JSX.Element => (
  <Action {...args}>
    <ul className="list-disc ml-3">
      <li>Content 1</li>
      <li>Content 2</li>
      <li>Content 3</li>
    </ul>
  </Action>
)

Basic.args = {
  testId: 'someId'
}
