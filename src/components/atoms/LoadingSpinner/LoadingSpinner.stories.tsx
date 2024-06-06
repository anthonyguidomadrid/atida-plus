import { LoadingSpinner } from './index'
import React from 'react'

export default {
  component: LoadingSpinner,
  title: 'atoms/LoadingSpinner'
}

export const Basic = (): JSX.Element => <LoadingSpinner className="min-h-30" />
