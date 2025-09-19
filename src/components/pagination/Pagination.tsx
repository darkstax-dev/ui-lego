import React from 'react'
import PaginationPage from './PaginationPage'
import PaginationPrevious from './PaginationPrevious'
import PaginationNext from './PaginationNext'
import PaginationGap from './PaginationGap'
import './Pagination.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPrevNext?: boolean
  maxVisiblePages?: number
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNext = true,
  maxVisiblePages = 5
}) => {
  const getVisiblePages = () => {
    const pages: (number | 'gap')[] = []
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)
      
      // Add gap if there's a jump between 1 and start
      if (startPage > 2) {
        pages.push('gap')
      }
      
      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }
      
      // Add gap if there's a jump between end and last page
      if (endPage < totalPages - 1) {
        pages.push('gap')
      }
      
      // Always show last page (if not already included)
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className="pagination" role="navigation" aria-label="Pagination">
      <div className="pagination__container">
        {showPrevNext && (
          <PaginationPrevious
            onClick={handlePrevious}
            disabled={currentPage === 1}
          />
        )}
        
        <div className="pagination__pages">
          {visiblePages.map((page, index) => (
            page === 'gap' ? (
              <PaginationGap key={`gap-${index}`} />
            ) : (
              <PaginationPage
                key={page}
                number={page}
                state={page === currentPage ? 'current' : 'default'}
                onClick={() => handlePageClick(page)}
              />
            )
          ))}
        </div>
        
        {showPrevNext && (
          <PaginationNext
            onClick={handleNext}
            disabled={currentPage === totalPages}
          />
        )}
      </div>
    </nav>
  )
}

export default Pagination
