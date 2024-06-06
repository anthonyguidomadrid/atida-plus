import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Modal, useModalState } from '.'
import userEvent, { TargetElement } from '@testing-library/user-event'

describe('Modal', () => {
  it('renders the modal hidden', async () => {
    const { result } = renderHook(() => useModalState())

    render(
      <Modal
        isVisible={result.current[0]}
        setIsVisible={result.current[1]}
        headerText="Hello World Header!"
        body="Hello World!"
      />
    )

    expect(screen.getByTestId('modalComponent')).toHaveClass(
      'modal fixed w-full h-full top-0 left-0 flex z-40 opacity-0 pointer-events-none'
    )
    expect(screen.getByTestId('modalComponentHeaderText')).toHaveTextContent(
      'Hello World Header!'
    )
    expect(screen.getByTestId('modalComponentBody').childElementCount).toBe(2)
    expect(screen.getByTestId('modalComponentBody')).toHaveClass('px-2')
  })

  it('renders the modal visible', async () => {
    const { result } = renderHook(() => useModalState())

    act(() => result.current[1](true))

    render(
      <Modal
        isVisible={result.current[0]}
        setIsVisible={result.current[1]}
        headerText="Hello World Header!"
        body="Hello World!"
      />
    )

    expect(screen.getByTestId('modalComponent')).toHaveClass(
      'modal fixed w-full h-full top-0 left-0 flex z-40 modal-active bg-overlay'
    )
    expect(screen.getByTestId('modalComponentHeaderText')).toHaveTextContent(
      'Hello World Header!'
    )
    expect(screen.getByTestId('modalComponentBody').childElementCount).toBe(2)
    expect(screen.getByTestId('modalComponentBody')).toHaveClass('px-2')
  })

  it('closes the modal when the escape key is pressed', () => {
    const { result } = renderHook(() => useModalState())

    render(
      <Modal
        isVisible={result.current[0]}
        setIsVisible={result.current[1]}
        headerText="Hello World Header!"
        body="Hello World!"
      />
    )

    act(() => result.current[1](true))

    fireEvent.keyDown(document.body, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    })

    expect(result.current[0]).toBeFalsy()
  })

  it('closes the modal when click on close button', () => {
    const { result } = renderHook(() => useModalState())

    render(
      <Modal
        isVisible={result.current[0]}
        setIsVisible={result.current[1]}
        headerText="Hello World Header!"
        body="Hello World!"
      />
    )

    act(() => result.current[1](true))

    userEvent.click(document.getElementById('modal-close') as TargetElement)

    expect(result.current[0]).toBeFalsy()
  })
})
