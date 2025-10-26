import React from 'react'
import SearchField from '../inputs/SearchField'
import IconButton from '../buttons/IconButton'
import './KanbanHeader.css'

interface KanbanHeaderProps {
  title?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSettingsClick?: () => void
  onFilterClick?: () => void
  filterActive?: boolean
}

const KanbanHeader: React.FC<KanbanHeaderProps> = ({
  title = '[Kanban board]',
  searchValue = '',
  onSearchChange,
  onSettingsClick,
  onFilterClick,
  filterActive = false
}) => {
  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_settings)">
        <path d="M10.0002 0.833984L17.9168 5.41732V14.584L10.0002 19.1673L2.0835 14.584V5.41732L10.0002 0.833984ZM10.0002 2.75982L3.75016 6.37815V13.6231L10.0002 17.2415L16.2502 13.6231V6.37815L10.0002 2.75982ZM10.0002 13.334C9.11611 13.334 8.26826 12.9828 7.64314 12.3577C7.01802 11.7326 6.66683 10.8847 6.66683 10.0007C6.66683 9.1166 7.01802 8.26875 7.64314 7.64363C8.26826 7.01851 9.11611 6.66732 10.0002 6.66732C10.8842 6.66732 11.7321 7.01851 12.3572 7.64363C12.9823 8.26875 13.3335 9.1166 13.3335 10.0007C13.3335 10.8847 12.9823 11.7326 12.3572 12.3577C11.7321 12.9828 10.8842 13.334 10.0002 13.334ZM10.0002 11.6673C10.4422 11.6673 10.8661 11.4917 11.1787 11.1792C11.4912 10.8666 11.6668 10.4427 11.6668 10.0007C11.6668 9.55862 11.4912 9.1347 11.1787 8.82214C10.8661 8.50958 10.4422 8.33398 10.0002 8.33398C9.55814 8.33398 9.13421 8.50958 8.82165 8.82214C8.50909 9.1347 8.3335 9.55862 8.3335 10.0007C8.3335 10.4427 8.50909 10.8666 8.82165 11.1792C9.13421 11.4917 9.55814 11.6673 10.0002 11.6673Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_settings">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const FilterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_filter)">
        <path d="M8.33333 15H11.6667V13.3333H8.33333V15ZM2.5 5V6.66667H17.5V5H2.5ZM5 10.8333H15V9.16667H5V10.8333Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_filter">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <div className="kanban-header">
      <div className="kanban-header-content">
        <div className="kanban-header-left">
          <h1 className="kanban-header-title">{title}</h1>
        </div>
        
        <div className="kanban-header-right">
          <div className="kanban-header-search">
            <SearchField
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </div>
          
          <div className="kanban-header-actions">
            <IconButton
              variant="secondary"
              size="big"
              color="gray"
              icon={<SettingsIcon />}
              onClick={onSettingsClick}
              aria-label="Settings"
            />
            
            <IconButton
              variant="secondary"
              size="big"
              color="gray"
              state={filterActive ? 'selected' : 'default'}
              icon={<FilterIcon />}
              onClick={onFilterClick}
              aria-label="Filter"
              className={filterActive ? 'kanban-header-filter-active' : ''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanHeader
