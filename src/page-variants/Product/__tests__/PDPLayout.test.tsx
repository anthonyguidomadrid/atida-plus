import { render, screen } from '@testing-library/react'
import { PDPLayout } from '../PDPLayout'

describe(PDPLayout, () => {
  it('renders the Back button', () => {
    render(
      <PDPLayout>
        <div>Child</div>
      </PDPLayout>
    )
    expect(screen.queryByTestId('pdpBackButton')).toBeInTheDocument()
  })
  it('renders the layout component', () => {
    render(
      <PDPLayout>
        <div>Child</div>
      </PDPLayout>
    )
    expect(screen.queryByTestId('pdpLayout')).toBeInTheDocument()
  })
  it('renders the children components', () => {
    render(
      <PDPLayout>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </PDPLayout>
    )
    expect(screen.queryByText('Child 1')).toBeInTheDocument()
    expect(screen.queryByText('Child 2')).toBeInTheDocument()
    expect(screen.queryByText('Child 3')).toBeInTheDocument()
  })
})
