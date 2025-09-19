import React, { useRef, useState } from 'react'
import './FileUpload.css'

interface FileUploadProps {
  onFileSelect: (files: FileList | null) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  maxSize?: number // in bytes
  title?: string
  description?: string
  id?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept,
  multiple = false,
  disabled = false,
  maxSize,
  title = 'Name',
  description = 'Click to upload or drag and drop',
  id
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const uploadId = id || `upload-${Math.random().toString(36).substr(2, 9)}`

  const handleFileSelect = (files: FileList | null) => {
    if (!files || disabled) return

    // Check file size if maxSize is specified
    if (maxSize) {
      const oversizedFiles = Array.from(files).filter(file => file.size > maxSize)
      if (oversizedFiles.length > 0) {
        alert(`Some files are too large. Maximum size is ${(maxSize / 1024 / 1024).toFixed(1)}MB`)
        return
      }
    }

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
    // Reset input value to allow selecting the same file again
    event.target.value = ''
  }

  const UploadIcon = () => (
    <svg 
      className="file-upload__icon" 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none"
    >
      <path 
        d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z" 
        fill="currentColor"
      />
    </svg>
  )

  return (
    <div 
      className={`file-upload ${disabled ? 'file-upload--disabled' : ''} ${isDragOver ? 'file-upload--drag-over' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload files"
    >
      <input
        ref={fileInputRef}
        id={uploadId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="file-upload__input"
        aria-hidden="true"
      />
      
      <div className="file-upload__content">
        <div className="file-upload__icon-button">
          <UploadIcon />
        </div>
        
        <div className="file-upload__text">
          <div className="file-upload__title">
            {title}
          </div>
          
          <div className="file-upload__description">
            <span className="file-upload__link">Click to upload</span>
            <span className="file-upload__or"> or drag and drop</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
