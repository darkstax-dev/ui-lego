import React from 'react'
import { 
  EyeLine, 
  Timer2Line, 
  EditLine, 
  ShieldLine, 
  Shape2Line, 
  InboxUnarchiveFill, 
  PlayCircleLine, 
  DeleteBack2Line, 
  DeleteBin7Line 
} from '../../icons/system'
import './OptionBar.css'

export interface OptionBarItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'highlighted' | 'danger'
  disabled?: boolean
}

export interface OptionBarProps {
  items?: OptionBarItem[]
  onOpen?: () => void
  onVersionHistory?: () => void
  onEdit?: () => void
  onScenarioAccessibility?: () => void
  onScenarioNodes?: () => void
  onDeploy?: () => void
  onRun?: () => void
  onDeleteNamespace?: () => void
  onDelete?: () => void
  className?: string
}

const defaultItems = (props: OptionBarProps): OptionBarItem[] => [
  {
    id: 'open',
    label: 'Open',
    icon: <EyeLine width={18} height={18} fill="white" />,
    onClick: props.onOpen,
    variant: 'default'
  },
  {
    id: 'version-history',
    label: 'Version history',
    icon: <Timer2Line width={18} height={18} fill="white" />,
    onClick: props.onVersionHistory,
    variant: 'default'
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <EditLine width={18} height={18} fill="#DFDFDF" />,
    onClick: props.onEdit,
    variant: 'default'
  },
  {
    id: 'scenario-accessibility',
    label: 'Scenario accessibility',
    icon: <ShieldLine width={18} height={18} fill="#DFDFDF" />,
    onClick: props.onScenarioAccessibility,
    variant: 'default'
  },
  {
    id: 'scenario-nodes',
    label: 'Scenario nodes',
    icon: <Shape2Line width={18} height={18} fill="#DFDFDF" />,
    onClick: props.onScenarioNodes,
    variant: 'default'
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: <InboxUnarchiveFill width={18} height={18} fill="#DFDFDF" />,
    onClick: props.onDeploy,
    variant: 'highlighted'
  },
  {
    id: 'run',
    label: 'Run',
    icon: <PlayCircleLine width={18} height={18} fill="#DFDFDF" />,
    onClick: props.onRun,
    variant: 'default'
  },
  {
    id: 'delete-namespace',
    label: 'Delete namespace',
    icon: <DeleteBack2Line width={18} height={18} fill="#DFDFDF" />,
    onClick: props.onDeleteNamespace,
    variant: 'default'
  },
  {
    id: 'divider',
    label: '',
    icon: null,
    variant: 'default'
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <DeleteBin7Line width={18} height={18} fill="#FF3B31" />,
    onClick: props.onDelete,
    variant: 'danger'
  }
]

const OptionBar: React.FC<OptionBarProps> = (props) => {
  const { items, className = '' } = props
  const optionItems = items || defaultItems(props)

  const handleItemClick = (item: OptionBarItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, item: OptionBarItem) => {
    if ((e.key === 'Enter' || e.key === ' ') && !item.disabled && item.onClick) {
      e.preventDefault()
      item.onClick()
    }
  }

  return (
    <div className={`option-bar ${className}`}>
      <div className="option-bar__container">
        {optionItems.map((item) => {
          if (item.id === 'divider') {
            return (
              <div key={item.id} className="option-bar__divider">
                <svg width="220" height="2" viewBox="0 0 220 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1H220" stroke="#9A9B9C" strokeOpacity="0.4" strokeDasharray="4 4"/>
                </svg>
              </div>
            )
          }

          return (
            <div
              key={item.id}
              className={`option-bar__item ${item.variant === 'highlighted' ? 'option-bar__item--highlighted' : ''} ${item.variant === 'danger' ? 'option-bar__item--danger' : ''} ${item.disabled ? 'option-bar__item--disabled' : ''}`}
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              role="button"
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled}
            >
              {item.icon && (
                <div className="option-bar__icon">
                  {item.icon}
                </div>
              )}
              {item.label && (
                <div className={`option-bar__label ${item.variant === 'danger' ? 'option-bar__label--danger' : ''}`}>
                  {item.label}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OptionBar
