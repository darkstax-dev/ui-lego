import React, { useState, useRef, useEffect } from 'react'
import Dropdown from '../dropdown/Dropdown'
import DropdownItem from '../dropdown/DropdownItem'
import EditLine from '../icons/system/EditLine'
import ArchiveLine from '../icons/system/ArchiveLine'
import DeleteBin7Line from '../icons/system/DeleteBin7Line'
import './KanbanColumnMenu.css'

interface KanbanColumnMenuProps {
  isOpen: boolean
  onClose: () => void
  onRename?: () => void
  onArchive?: () => void
  onDelete?: () => void
}

const KanbanColumnMenu: React.FC<KanbanColumnMenuProps> = ({
  isOpen,
  onClose,
  onRename,
  onArchive,
  onDelete
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="kanban-column-menu-container" ref={menuRef}>
      <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        position="absolute"
        size="compact"
      >
        <DropdownItem
          leadingIcon={<EditLine width={18} height={18} />}
          onClick={() => {
            onRename?.()
            onClose()
          }}
        >
          Rename
        </DropdownItem>

        <DropdownItem
          leadingIcon={<ArchiveLine width={18} height={18} />}
          onClick={() => {
            onArchive?.()
            onClose()
          }}
        >
          Archive
        </DropdownItem>

        <div className="dropdown-divider" />

        <DropdownItem
          variant="danger"
          leadingIcon={<DeleteBin7Line width={18} height={18} />}
          onClick={() => {
            onDelete?.()
            onClose()
          }}
        >
          Delete
        </DropdownItem>
      </Dropdown>
    </div>
  )
}

export default KanbanColumnMenu
