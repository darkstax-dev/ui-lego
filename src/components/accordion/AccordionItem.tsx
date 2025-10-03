import React, { useState } from 'react'
import ChevronUp from '../icons/ChevronUp'
import ChevronDown from '../icons/ChevronDown'
import './AccordionItem.css'

interface AccordionItemProps {
  title: string
  content: string | React.ReactNode
  defaultOpen?: boolean
  className?: string
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  defaultOpen = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`accordion-item ${isOpen ? 'accordion-item--open' : 'accordion-item--closed'} ${className}`}>
      <button 
        className="accordion-item__header" 
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className="accordion-item__title">
          {title}
        </div>
        <div className="accordion-item__icon">
          {isOpen ? <ChevronUp stroke="var(--sds-color-text-default-default)" /> : <ChevronDown stroke="var(--sds-color-text-default-default)" />}
        </div>
      </button>
      {isOpen && (
        <div className="accordion-item__content">
          <div className="accordion-item__body">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}

export default AccordionItem
