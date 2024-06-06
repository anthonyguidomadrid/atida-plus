import { render, screen } from '@testing-library/react'
import { Select } from '.'

describe(Select, () => {
  it('renders select', () => {
    render(
      <Select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('combobox').children).toHaveLength(3)
  })
})
