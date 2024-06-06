import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearStateErrors } from '~domains/redux'

type GlobalHooksProps = { children?: ReactNode }

export const GlobalHooks = ({ children }: GlobalHooksProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearStateErrors())
  }, [dispatch])

  return <>{children}</>
}
