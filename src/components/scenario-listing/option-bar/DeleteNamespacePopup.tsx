import React, { useState } from 'react'
import './DeleteNamespacePopup.css'
import Button from '../../buttons/Button'
import Checkbox from '../../checkbox/Checkbox'

export interface DeleteNamespacePopupProps {
  isOpen: boolean
  onClose: () => void
  onDelete?: (selectedNamespaces: string[]) => void
  namespaces?: string[]
}

const defaultNamespaces = ['namespace1']

const DeleteNamespacePopup: React.FC<DeleteNamespacePopupProps> = ({
  isOpen,
  onClose,
  onDelete,
  namespaces = defaultNamespaces
}) => {
  const [selectedNamespaces, setSelectedNamespaces] = useState<string[]>([])

  const handleNamespaceToggle = (namespace: string, checked: boolean) => {
    if (checked) {
      setSelectedNamespaces(prev => [...prev, namespace])
    } else {
      setSelectedNamespaces(prev => prev.filter(ns => ns !== namespace))
    }
  }

  const handleDelete = () => {
    onDelete?.(selectedNamespaces)
    onClose()
  }

  const handleClose = () => {
    setSelectedNamespaces([])
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="delete-namespace-popup-overlay" onClick={handleOverlayClick}>
      <div className="delete-namespace-popup">
        <div className="delete-namespace-popup__header">
          <h2 className="delete-namespace-popup__title">Delete NameSpace</h2>
          <button 
            className="delete-namespace-popup__close" 
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="delete-namespace-popup__content">
          <div className="delete-namespace-popup__section">
            <h3 className="delete-namespace-popup__section-title">NAMESPACE</h3>
            
            <div className="delete-namespace-popup__namespaces">
              {namespaces.map((namespace) => (
                <div key={namespace} className="delete-namespace-popup__namespace-item">
                  <Checkbox
                    checked={selectedNamespaces.includes(namespace)}
                    onChange={(checked) => handleNamespaceToggle(namespace, checked)}
                    label={namespace}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="delete-namespace-popup__footer">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClose}
            className="delete-namespace-popup__close-button"
          >
            CLOSE
          </Button>
          <Button
            variant="primary-simple"
            size="sm"
            onClick={handleDelete}
            disabled={selectedNamespaces.length === 0}
            className="delete-namespace-popup__delete-button"
          >
            DELETE
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteNamespacePopup
