import React, { forwardRef } from 'react'
import './PlusButton.css'
import { Slot, PolymorphicProps } from '../../utils/Slot'

export type PlusButtonState = 'default' | 'hover' | 'disabled'

type OwnProps = {
  state?: PlusButtonState
  disabled?: boolean
  className?: string
  'aria-label'?: string
  asChild?: boolean
}

const PlusButton = forwardRef<HTMLButtonElement, PolymorphicProps<'button', OwnProps>>(function PlusButton({
  state = 'default',
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Add',
  asChild = false,
  ...props
}, ref) {
  const actualState = disabled ? 'disabled' : state

  const buttonClass = [
    'plus-button',
    `plus-button--${actualState}`,
    className
  ].filter(Boolean).join(' ')

  const Comp: any = asChild ? Slot : (props.as ?? 'button')

  return (
    <Comp
      className={buttonClass}
      disabled={disabled}
      aria-label={ariaLabel}
      ref={ref}
      {...props}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g clipPath="url(#clip0_plus_button)">
          <path 
            d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" 
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_plus_button">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </Comp>
  )
})

export default React.memo(PlusButton)
