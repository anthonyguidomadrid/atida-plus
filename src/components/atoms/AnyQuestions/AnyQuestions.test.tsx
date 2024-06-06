import { render, screen } from '@testing-library/react'
import { AnyQuestions, AnyQuestionsProps } from './index'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

const store = createStore(rootReducer, {})

describe(AnyQuestions, () => {
  const setup = (props: Partial<AnyQuestionsProps> = {}) =>
    render(
      <Provider store={store}>
        <AnyQuestions {...props} />
      </Provider>
    )

  it('renders Any Questions? title', () => {
    setup()
    expect(screen.getByTestId('questionsTitle')).toHaveTextContent(
      'confirmation.any-questions-title'
    )
  })

  it('renders message', () => {
    setup()
    expect(screen.getByTestId('questionsMsg')).toHaveTextContent(
      'confirmation.any-questions-subtitle'
    )
  })

  it('renders Go to chat button', () => {
    setup()
    expect(screen.getByTestId('anyQuestionsContactUsLink')).toBeInTheDocument()
  })

  it('renders Go to FAQ button', () => {
    setup()
    expect(screen.getByTestId('anyQuestionsFAQLink')).toBeInTheDocument()
  })
})
