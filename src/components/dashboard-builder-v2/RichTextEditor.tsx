import React, { useState, useRef } from 'react'
import './RichTextEditor.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    updateButtonStates()
  }

  const updateButtonStates = () => {
    setIsBold(document.queryCommandState('bold'))
    setIsItalic(document.queryCommandState('italic'))
    setIsUnderline(document.queryCommandState('underline'))
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = `<img src="${event.target?.result}" style="max-width: 100%; height: auto; margin: 10px 0;" />`
        document.execCommand('insertHTML', false, img)
        handleInput()
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLinkInsert = () => {
    const url = prompt('Enter URL:')
    if (url) {
      handleFormat('createLink', url)
    }
  }

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            className={`toolbar-btn ${isBold ? 'active' : ''}`}
            onClick={() => handleFormat('bold')}
            title="Bold (Ctrl+B)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2h5a3 3 0 0 1 0 6H4V2z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 8h6a3 3 0 0 1 0 6H4V8z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          
          <button
            type="button"
            className={`toolbar-btn ${isItalic ? 'active' : ''}`}
            onClick={() => handleFormat('italic')}
            title="Italic (Ctrl+I)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2h4M2 14h4M8 2l-4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button
            type="button"
            className={`toolbar-btn ${isUnderline ? 'active' : ''}`}
            onClick={() => handleFormat('underline')}
            title="Underline (Ctrl+U)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2v6a4 4 0 0 0 8 0V2M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => handleFormat('justifyLeft')}
            title="Align Left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12M2 6h8M2 9h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => handleFormat('justifyCenter')}
            title="Align Center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12M4 6h8M2 9h12M4 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => handleFormat('justifyRight')}
            title="Align Right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 3h12M6 6h8M2 9h12M6 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => handleFormat('insertUnorderedList')}
            title="Bullet List"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="3" cy="4" r="1" fill="currentColor"/>
              <circle cx="3" cy="8" r="1" fill="currentColor"/>
              <circle cx="3" cy="12" r="1" fill="currentColor"/>
              <path d="M6 4h8M6 8h8M6 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => handleFormat('insertOrderedList')}
            title="Numbered List"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4h8M6 8h8M6 12h8M2 4h1M2 8h1M2 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={handleLinkInsert}
            title="Insert Link"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.5 9.5l3-3M8.5 11l2.5-2.5a2.83 2.83 0 0 0-4-4L4.5 7a2.83 2.83 0 0 0 4 4l.5-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Insert Image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="5.5" cy="6.5" r="1" fill="currentColor"/>
              <path d="M14 10l-3-3-4 4-2-2-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={(e) => handleFormat('fontSize', e.target.value)}
            defaultValue="3"
          >
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
          
          <input
            type="color"
            className="toolbar-color"
            onChange={(e) => handleFormat('foreColor', e.target.value)}
            title="Text Color"
          />
        </div>
      </div>

      <div
        ref={editorRef}
        className="rich-text-content"
        contentEditable
        onInput={handleInput}
        onKeyUp={updateButtonStates}
        onClick={updateButtonStates}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />
    </div>
  )
}

export default RichTextEditor
