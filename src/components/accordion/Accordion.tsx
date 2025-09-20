import React from 'react'
import './Accordion.css'

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`accordion ${className}`}>
      {children}
    </div>
  )
}

export default Accordion
