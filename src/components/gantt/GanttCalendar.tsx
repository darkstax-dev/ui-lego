import React, { useState, useMemo } from 'react'
import './GanttCalendar.css'

interface GanttCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onClose: () => void
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const GanttCalendar: React.FC<GanttCalendarProps> = ({
  selectedDate,
  onDateSelect,
  onClose,
}) => {
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth())
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear())
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate()
  }, [viewMonth, viewYear])

  const firstDayOfMonth = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).getDay()
  }, [viewMonth, viewYear])

  const prevMonthDays = useMemo(() => {
    const prevMonth = new Date(viewYear, viewMonth, 0)
    const totalDays = prevMonth.getDate()
    const days: number[] = []
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(totalDays - i)
    }
    return days
  }, [viewMonth, viewYear, firstDayOfMonth])

  const nextMonthDays = useMemo(() => {
    const totalCells = prevMonthDays.length + daysInMonth
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)
    const days: number[] = []
    for (let i = 1; i <= remaining; i++) {
      days.push(i)
    }
    return days
  }, [prevMonthDays, daysInMonth])

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const newDate = new Date(viewYear, viewMonth, day)
      onDateSelect(newDate)
      onClose()
    }
  }

  const isSelected = (day: number): boolean => {
    return (
      day === selectedDate.getDate() &&
      viewMonth === selectedDate.getMonth() &&
      viewYear === selectedDate.getFullYear()
    )
  }

  const isToday = (day: number): boolean => {
    const today = new Date()
    return (
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    )
  }

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const arr: number[] = []
    for (let y = currentYear - 10; y <= currentYear + 10; y++) {
      arr.push(y)
    }
    return arr
  }, [])

  return (
    <div className="gantt-calendar">
      {/* Header with month/year selectors and navigation */}
      <div className="gantt-calendar-header">
        <button className="gantt-calendar-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="gantt-calendar-selectors">
          {/* Month dropdown */}
          <div className="gantt-calendar-select-wrapper">
            <button
              className="gantt-calendar-select-btn"
              onClick={() => { setShowMonthDropdown(!showMonthDropdown); setShowYearDropdown(false) }}
            >
              <span>{MONTHS[viewMonth]}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {showMonthDropdown && (
              <div className="gantt-calendar-dropdown">
                {MONTHS.map((month, index) => (
                  <button
                    key={month}
                    className={`gantt-calendar-dropdown-item ${index === viewMonth ? 'active' : ''}`}
                    onClick={() => { setViewMonth(index); setShowMonthDropdown(false) }}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year dropdown */}
          <div className="gantt-calendar-select-wrapper">
            <button
              className="gantt-calendar-select-btn"
              onClick={() => { setShowYearDropdown(!showYearDropdown); setShowMonthDropdown(false) }}
            >
              <span>{viewYear}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {showYearDropdown && (
              <div className="gantt-calendar-dropdown gantt-calendar-dropdown--year">
                {years.map((year) => (
                  <button
                    key={year}
                    className={`gantt-calendar-dropdown-item ${year === viewYear ? 'active' : ''}`}
                    onClick={() => { setViewYear(year); setShowYearDropdown(false) }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="gantt-calendar-nav-btn" onClick={handleNextMonth} aria-label="Next month">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day of week headers */}
      <div className="gantt-calendar-weekdays">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="gantt-calendar-weekday">{day}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="gantt-calendar-grid">
        {/* Previous month overflow days */}
        {prevMonthDays.map((day, index) => (
          <button
            key={`prev-${index}`}
            className="gantt-calendar-day gantt-calendar-day--other-month"
            onClick={() => handleDayClick(day, false)}
          >
            {day}
          </button>
        ))}

        {/* Current month days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={`current-${day}`}
            className={`gantt-calendar-day ${isSelected(day) ? 'gantt-calendar-day--selected' : ''} ${isToday(day) ? 'gantt-calendar-day--today' : ''}`}
            onClick={() => handleDayClick(day, true)}
          >
            {day}
          </button>
        ))}

        {/* Next month overflow days */}
        {nextMonthDays.map((day, index) => (
          <button
            key={`next-${index}`}
            className="gantt-calendar-day gantt-calendar-day--other-month"
            onClick={() => handleDayClick(day, false)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GanttCalendar
