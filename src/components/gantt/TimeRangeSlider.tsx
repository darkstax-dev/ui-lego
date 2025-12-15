import React, { useState, useRef, useEffect } from 'react'
import { formatTimeLabel } from './utils'
import './TimeRangeSlider.css'

export interface TimeRangeSliderProps {
  startTime: Date
  endTime: Date
  minTime: Date
  maxTime: Date
  onChange: (start: Date, end: Date) => void
  selectedDate?: Date
  onDateChange?: (date: Date) => void
  className?: string
}

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  startTime,
  endTime,
  minTime,
  maxTime,
  onChange,
  selectedDate,
  onDateChange,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState<'start' | 'end' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const totalDuration = maxTime.getTime() - minTime.getTime()
  const startPercent = ((startTime.getTime() - minTime.getTime()) / totalDuration) * 100
  const endPercent = ((endTime.getTime() - minTime.getTime()) / totalDuration) * 100

  const handleMouseDown = (type: 'start' | 'end') => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(type)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
      const timestamp = minTime.getTime() + (percent / 100) * totalDuration

      // Round to nearest 30 minutes
      const roundedTimestamp = Math.round(timestamp / (30 * 60 * 1000)) * (30 * 60 * 1000)
      const newDate = new Date(roundedTimestamp)

      if (isDragging === 'start') {
        if (newDate < endTime) {
          onChange(newDate, endTime)
        }
      } else if (isDragging === 'end') {
        if (newDate > startTime) {
          onChange(startTime, newDate)
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(null)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, minTime, maxTime, startTime, endTime, totalDuration, onChange, onDateChange, selectedDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onDateChange && e.target.value) {
      const newDate = new Date(e.target.value)
      onDateChange(newDate)
    }
  }

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className={`time-range-slider ${className}`}>
      <div className="time-range-slider-header">
        {onDateChange && (
          <div className="time-range-date-picker">
            <label htmlFor="gantt-date-picker" className="date-picker-label">
              Select Date
            </label>
            <input
              id="gantt-date-picker"
              type="date"
              className="date-picker-input"
              value={selectedDate ? formatDateForInput(selectedDate) : ''}
              onChange={handleDateChange}
            />
          </div>
        )}
        <div className="time-range-slider-labels">
          <span className="time-range-label">{formatTimeLabel(startTime)}</span>
          <span className="time-range-label">{formatTimeLabel(endTime)}</span>
        </div>
      </div>
      <div ref={sliderRef} className="time-range-slider-track">
        <div
          className="time-range-slider-range"
          style={{
            left: `${startPercent}%`,
            width: `${endPercent - startPercent}%`,
          }}
        />
        <button
          className="time-range-slider-thumb start"
          style={{ left: `${startPercent}%` }}
          onMouseDown={handleMouseDown('start')}
          aria-label="Start time"
        />
        <button
          className="time-range-slider-thumb end"
          style={{ left: `${endPercent}%` }}
          onMouseDown={handleMouseDown('end')}
          aria-label="End time"
        />
      </div>
    </div>
  )
}

export default TimeRangeSlider
