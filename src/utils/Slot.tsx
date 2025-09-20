import React, { forwardRef, isValidElement, cloneElement } from 'react'

export type SlottableProps<E extends React.ElementType> = {
  asChild?: boolean
  as?: E
} & React.ComponentPropsWithoutRef<E>

/**
 * Slot: clones the only child and merges props/ref into it.
 */
export const Slot = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  function Slot({ children, ...props }, ref) {
    if (isValidElement(children)) {
      return cloneElement(children as any, { ...props, ref })
    }
    return <span ref={ref as any} {...props}>{children}</span>
  }
)

export type PolymorphicRef<E extends React.ElementType> = React.ComponentPropsWithRef<E>["ref"]

export type PolymorphicProps<E extends React.ElementType, P> = P & {
  as?: E
  asChild?: boolean
} & Omit<React.ComponentPropsWithoutRef<E>, keyof P | 'as' | 'asChild'>
