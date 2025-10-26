import React, { useState } from 'react'
import KanbanBoard from './KanbanBoard'
import { mockKanbanData } from './mockData'
import type { KanbanCard } from './types'

const KanbanBoardDemo: React.FC = () => {
  const [notification, setNotification] = useState<string>('')

  const handleCardClick = (card: KanbanCard) => {
    setNotification(`Clicked: ${card.title}`)
    setTimeout(() => setNotification(''), 3000)
  }

  const handleCardMove = (cardId: string, fromColumnId: string, toColumnId: string) => {
    setNotification(`Card moved from column ${fromColumnId} to ${toColumnId}`)
    setTimeout(() => setNotification(''), 3000)
  }

  const handleSearchChange = (value: string) => {
    console.log('Search:', value)
  }

  const handleSettingsClick = () => {
    setNotification('Settings clicked!')
    setTimeout(() => setNotification(''), 3000)
  }

  const handleFilterClick = () => {
    setNotification('Filter toggled!')
    setTimeout(() => setNotification(''), 3000)
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <KanbanBoard
        data={mockKanbanData}
        onCardClick={handleCardClick}
        onCardMove={handleCardMove}
        onSearchChange={handleSearchChange}
        onSettingsClick={handleSettingsClick}
        onFilterClick={handleFilterClick}
        showHeader={true}
      />
      
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 20px',
            background: '#00112B',
            color: '#DFDFDF',
            borderRadius: '4px',
            fontFamily: 'Macan, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          {notification}
        </div>
      )}
    </div>
  )
}

export default KanbanBoardDemo
