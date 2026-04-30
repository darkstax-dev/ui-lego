import React, { useState, useRef, useEffect } from 'react'
import { formatTimeLabel } from './utils'
import GanttCalendar from './GanttCalendar'
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
  /** When true, shows input-style fields for Start/End time instead of slider */
  inputMode?: boolean
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
  inputMode = false,
}) => {
  const [isDragging, setIsDragging] = useState<'start' | 'end' | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const calendarWrapperRef = useRef<HTMLDivElement>(null)

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
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, minTime, maxTime, startTime, endTime, totalDuration, onChange])

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarWrapperRef.current && !calendarWrapperRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

  const handleCalendarDateSelect = (date: Date) => {
    if (onDateChange) {
      onDateChange(date)
    }
    setShowCalendar(false)
  }

  const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className={`time-range-slider ${className}`}>
      <div className="time-range-slider-header">
        {/* Left side: Select Date with calendar icon */}
        {onDateChange && (
          <div className="time-range-date-picker" ref={calendarWrapperRef}>
            <button
              className="date-picker-trigger"
              onClick={() => setShowCalendar(!showCalendar)}
              aria-label="Select date"
            >
              <span className="date-picker-trigger-text">
                {selectedDate ? formatDisplayDate(selectedDate) : 'Select Date'}
              </span>
              <svg className="date-picker-trigger-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6667 1.33333V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33325 1.33333V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 6.66667H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Calendar popup */}
            {showCalendar && (
              <div className="date-picker-calendar-popup">
                <GanttCalendar
                  selectedDate={selectedDate || new Date()}
                  onDateSelect={handleCalendarDateSelect}
                  onClose={() => setShowCalendar(false)}
                />
              </div>
            )}
          </div>
        )}

        {/* Right side: time inputs or slider */}
        {inputMode ? (
          <>
            <div className="time-range-input-field">
              <span className="time-range-input-text">Start time</span>
              <svg className="time-range-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="time-range-input-field">
              <span className="time-range-input-text">End time</span>
              <svg className="time-range-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </>
        ) : (
          <div className="time-range-slider-right">
            <div className="time-range-slider-labels">
              <span className="time-range-label">{formatTimeLabel(startTime)}</span>
              <span className="time-range-label">{formatTimeLabel(endTime)}</span>
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
        )}
      </div>
    </div>
  )
}

export default TimeRangeSlider