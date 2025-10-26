import React, { useState, useRef, useEffect } from 'react'
import Dropdown from '../dropdown/Dropdown'
import DropdownItem from '../dropdown/DropdownItem'
import FullscreenFill from '../icons/system/FullscreenFill'
import EditLine from '../icons/system/EditLine'
import ArrowRightLine from '../icons/system/ArrowRightLine'
import DeleteBin7Line from '../icons/system/DeleteBin7Line'
import './KanbanCardMenu.css'

interface KanbanCardMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenTask?: () => void
  onEditName?: () => void
  onMoveTo?: () => void
  onDelete?: () => void
}

const KanbanCardMenu: React.FC<KanbanCardMenuProps> = ({
  isOpen,
  onClose,
  onOpenTask,
  onEditName,
  onMoveTo,
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
    <div className="kanban-card-menu-container" ref={menuRef}>
      <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        position="absolute"
        size="compact"
      >
        <DropdownItem
          leadingIcon={<FullscreenFill width={18} height={18} />}
          onClick={() => {
            onOpenTask?.()
            onClose()
          }}
        >
          Open task
        </DropdownItem>

        <DropdownItem
          leadingIcon={<EditLine width={18} height={18} />}
          onClick={() => {
            onEditName?.()
            onClose()
          }}
        >
          Edit name
        </DropdownItem>

        <DropdownItem
          leadingIcon={<ArrowRightLine width={18} height={18} />}
          trailingIcon={<ArrowRightLine width={18} height={18} />}
          onClick={() => {
            onMoveTo?.()
            onClose()
          }}
        >
          Move to
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

export default KanbanCardMenu
