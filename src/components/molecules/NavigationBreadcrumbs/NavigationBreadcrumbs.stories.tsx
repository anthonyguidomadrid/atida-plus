import React from 'react'
import { NavigationBreadcrumbs, NavigationBreadcrumbsProps } from './'

export default {
  component: NavigationBreadcrumbs,
  title: 'molecules/NavigationBreadcrumbs',
  args: {
    title: 'Home Page',
    path: '/'
  }
}

export const breadcrumbs = (args: NavigationBreadcrumbsProps): JSX.Element => (
  <NavigationBreadcrumbs {...args} />
)
breadcrumbs.args = {
  breadcrumbs: [
    {
      title: 'Home Page',
      path: '/'
    }
  ]
}
