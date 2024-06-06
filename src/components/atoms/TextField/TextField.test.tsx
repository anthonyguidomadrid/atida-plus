import { render, screen } from '@testing-library/react'
import { TextField } from '.'

describe('TextField', () => {
  const placeholder = 'Placeholder'

  it('renders text field', () => {
    render(<TextField isWide={false} placeholder={placeholder} />)
    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument()
  })

  it('renders full width text field when iswide prop is provided', () => {
    render(<TextField placeholder={placeholder} />)

    const inputNode = screen.getByPlaceholderText('Placeholder')
    expect(inputNode.classList.contains('w-full')).toBe(true)
  })
})
