import React, { useState, useRef, useCallback } from 'react'
import './SliderField.css'

interface SliderFieldProps {
  label?: string
  description?: string
  value: [number, number]
  onChange: (value: [number, number]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  prefix?: string
  suffix?: string
  id?: string
}

const SliderField: React.FC<SliderFieldProps> = ({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  prefix = '$',
  suffix = '',
  id
}) => {
  const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<'start' | 'end' | null>(null)

  const [minValue, maxValue] = value

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return min

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    const rawValue = min + (percentage / 100) * (max - min)
    return Math.round(rawValue / step) * step
  }, [min, max, step])

  const handleMouseDown = (type: 'start' | 'end') => (event: React.MouseEvent) => {
    if (disabled) return
    event.preventDefault()
    setIsDragging(type)
  }

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || disabled) return

    const newValue = getValueFromPosition(event.clientX)

    if (isDragging === 'start') {
      const newMinValue = Math.min(newValue, maxValue)
      onChange([newMinValue, maxValue])
    } else {
      const newMaxValue = Math.max(newValue, minValue)
      onChange([minValue, newMaxValue])
    }
  }, [isDragging, disabled, getValueFromPosition, minValue, maxValue, onChange])

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const minPercentage = getPercentage(minValue)
  const maxPercentage = getPercentage(maxValue)

  return (
    <div className={`slider-field ${disabled ? 'slider-field--disabled' : ''}`}>
      {label && (
        <div className="slider-field__header">
          <label htmlFor={sliderId} className="slider-field__label">
            {label}
          </label>
          <div className="slider-field__output">
            <span className="slider-field__prefix">{prefix}</span>
            <span className="slider-field__value">{minValue}-{maxValue}</span>
            {suffix && <span className="slider-field__suffix">{suffix}</span>}
          </div>
        </div>
      )}
      
      <div className="slider-field__slider" ref={sliderRef}>
        <div className="slider-field__track">
          <div 
            className="slider-field__range"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          <div
            className="slider-field__handle slider-field__handle--start"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('start')}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={minValue}
            aria-label="Minimum value"
            tabIndex={disabled ? -1 : 0}
          />
          
          <div
            className="slider-field__handle slider-field__handle--end"
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('end')}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={maxValue}
            aria-label="Maximum value"
            tabIndex={disabled ? -1 : 0}
          />
        </div>
      </div>

      {description && (
        <div className="slider-field__description">
          {description}
        </div>
      )}
    </div>
  )
}

export default SliderField
