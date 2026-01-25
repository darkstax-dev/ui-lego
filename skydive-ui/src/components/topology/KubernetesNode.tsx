import React, { useRef } from 'react'
import './KubernetesNode.css'
import { K8sNode } from '../../TopologyCanvas'
import {
  KubernetesNamespace,
  KubernetesService,
  KubernetesDeployment,
  KubernetesNode as KubernetesNodeIcon,
  KubernetesJob,
  KubernetesIngress,
  KubernetesPod,
  KubernetesSecret,
  KubernetesConfigMap,
  KubernetesPersistentVolume,
  KubernetesPersistentVolumeClaim,
  KubernetesStatefulSet
} from '../../../../src/components/icons/kubernetes'
import KubernetesMultus from '../../../../src/components/icons/kubernetes/KubernetesMultus'

interface KubernetesNodeComponentProps {
  node: K8sNode
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
  onDrag: (position: { x: number; y: number }) => void
}

const iconMap: Record<string, React.ComponentType<any>> = {
  namespace: KubernetesNamespace,
  service: KubernetesService,
  deployment: KubernetesDeployment,
  node: KubernetesNodeIcon,
  job: KubernetesJob,
  ingress: KubernetesIngress,
  pod: KubernetesPod,
  secret: KubernetesSecret,
  configmap: KubernetesConfigMap,
  persistentvolume: KubernetesPersistentVolume,
  persistentvolumeclaim: KubernetesPersistentVolumeClaim,
  statefulset: KubernetesStatefulSet,
  multus: KubernetesMultus
}

const statusColors = {
  ready: { fill: '#EBEBEB', stroke: 'rgba(0, 0, 0, 0.1)' },
  deploying: { fill: '#FAA536', stroke: '#ED8B30' },
  running: { fill: '#2B9952', stroke: '#108541' },
  error: { fill: '#AA1A00', stroke: '#B6261F' },
  terminated: { fill: '#0E2846', stroke: '#072B56' }
}

export const KubernetesNodeComponent: React.FC<KubernetesNodeComponentProps> = ({
  node,
  isSelected,
  onClick,
  onDoubleClick,
  onDrag
}) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)

  const Icon = iconMap[node.type] || KubernetesPod
  const statusColor = statusColors[node.status] || statusColors.ready

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      dragStart.current = {
        x: e.clientX - node.position.x,
        y: e.clientY - node.position.y
      }
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (dragStart.current) {
      const newX = e.clientX - dragStart.current.x
      const newY = e.clientY - dragStart.current.y
      onDrag({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    dragStart.current = null
  }

  React.useEffect(() => {
    if (dragStart.current) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragStart.current])

  return (
    <div
      ref={nodeRef}
      className={`k8s-node ${isSelected ? 'k8s-node--selected' : ''}`}
      style={{
        left: node.position.x,
        top: node.position.y
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseDown={handleMouseDown}
    >
      <div className="k8s-node__hexagon">
        {/* Glow effect for selected/certain statuses */}
        {(isSelected || node.status === 'deploying' || node.status === 'error') && (
          <svg 
            width="50" 
            height="56" 
            viewBox="0 0 50 56" 
            fill="none"
            className="k8s-node__glow"
            style={{
              filter: `drop-shadow(0 0 8px ${statusColor.stroke})`
            }}
          >
            <path 
              d="M23.6445 -1.69141C24.5003 -2.10238 25.4997 -2.10238 26.3555 -1.69141L26.5371 -1.59766L50.4268 11.8613C51.3846 12.4011 52 13.4164 52 14.542V41.458C52 42.5837 51.3846 43.5989 50.4268 44.1387L26.5371 57.5977C25.5842 58.1345 24.4158 58.1345 23.4629 57.5977L-0.426758 44.1387C-1.38456 43.5989 -2 42.5836 -2 41.458V14.542C-2 13.4164 -1.38457 12.4011 -0.426758 11.8613L23.4629 -1.59766L23.6445 -1.69141Z" 
              stroke={statusColor.stroke}
              strokeOpacity="0.2"
              strokeWidth="4"
            />
          </svg>
        )}
        
        {/* Main hexagon */}
        <svg width="50" height="56" viewBox="0 0 50 56" fill="none">
          <path 
            d="M24.1992 -0.290039C24.6951 -0.569392 25.3049 -0.569392 25.8008 -0.290039L49.6904 13.168C50.1875 13.4481 50.5 13.9703 50.5 14.542V41.458C50.5 42.0297 50.1875 42.5519 49.6904 42.832L25.8008 56.29C25.3049 56.5694 24.6951 56.5694 24.1992 56.29L0.30957 42.832C-0.18747 42.5519 -0.5 42.0297 -0.5 41.458V14.542C-0.5 13.9703 -0.187471 13.4481 0.30957 13.168L24.1992 -0.290039Z" 
            fill={statusColor.fill}
            stroke={statusColor.stroke}
          />
        </svg>
        
        <div className="k8s-node__icon">
          <Icon width={24} height={24} fill="#072B56" />
        </div>
        
        {node.badge && (
          <div className="k8s-node__badge">
            <span>{node.badge}</span>
          </div>
        )}
      </div>
      
      <div className="k8s-node__label">{node.name}</div>
    </div>
  )
}
