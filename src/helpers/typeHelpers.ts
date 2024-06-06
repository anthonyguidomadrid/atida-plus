import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type ComponentPropsWithoutRefAndChildren<C extends ElementType> = Omit<
  ComponentPropsWithoutRef<C>,
  'children'
>
