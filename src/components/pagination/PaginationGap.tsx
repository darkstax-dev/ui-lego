import React from 'react'
import './PaginationGap.css'

const PaginationGap: React.FC = () => {
  return (
    <div className="pagination-gap" aria-label="More pages">
      <span className="pagination-gap__text">...</span>
    </div>
  )
}

export default PaginationGap
