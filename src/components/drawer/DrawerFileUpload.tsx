import React, { useRef, useState } from 'react'
import './DrawerFileUpload.css'

interface DrawerFileUploadProps {
  title: string
  onFileSelect: (files: FileList | null) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  id?: string
}

const DrawerFileUpload: React.FC<DrawerFileUploadProps> = ({
  title,
  onFileSelect,
  accept,
  multiple = false,
  disabled = false,
  id
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const uploadId = id || `drawer-upload-${Math.random().toString(36).substr(2, 9)}`

  const handleFileSelect = (files: FileList | null) => {
    if (!files || disabled) return
    onFileSelect(files)
  }

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    if (!disabled) {
      handleFileSelect(event.dataTransfer.files)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files)
    event.target.value = ''
  }

  return (
    <div 
      className={`drawer-file-upload ${disabled ? 'drawer-file-upload--disabled' : ''} ${isDragOver ? 'drawer-file-upload--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        id={uploadId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="drawer-file-upload__input"
        aria-hidden="true"
      />
      
      <div className="drawer-file-upload__content">
        <div className="drawer-file-upload__text-section">
          <div className="drawer-file-upload__title">{title}</div>
          <div className="drawer-file-upload__action">
            <button 
              type="button" 
              className="drawer-file-upload__link-button"
              onClick={handleClick}
              disabled={disabled}
            >
              <div className="drawer-file-upload__link-text">Click to upload</div>
              <div className="drawer-file-upload__link-underline" />
            </button>
            <span className="drawer-file-upload__drag-text">or drag and drop</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerFileUpload
