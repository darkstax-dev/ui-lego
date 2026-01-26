import { statusColors } from '../../data/k8sTemplates';
import type { K8sResourceType } from '../../types';

// Import K8s icons from ui-lego source via Vite alias
import KubernetesNamespace from '@icons/kubernetes/KubernetesNamespace';
import KubernetesService from '@icons/kubernetes/KubernetesService';
import KubernetesDeployment from '@icons/kubernetes/KubernetesDeployment';
import KubernetesJob from '@icons/kubernetes/KubernetesJob';
import KubernetesIngress from '@icons/kubernetes/KubernetesIngress';
import KubernetesPod from '@icons/kubernetes/KubernetesPod';
import KubernetesSecret from '@icons/kubernetes/KubernetesSecret';
import KubernetesConfigMap from '@icons/kubernetes/KubernetesConfigMap';
import KubernetesPersistentVolume from '@icons/kubernetes/KubernetesPersistentVolume';
import KubernetesPersistentVolumeClaim from '@icons/kubernetes/KubernetesPersistentVolumeClaim';
import KubernetesStatefulSet from '@icons/kubernetes/KubernetesStatefulSet';
import KubernetesNode from '@icons/kubernetes/KubernetesNode';
import KubernetesMultus from '@icons/kubernetes/KubernetesMultus';

import BuildingFill from '@icons/BuildingFill';
import MobileTowerFill from '@icons/MobileTowerFill';

interface KubernetesIconWrapperProps {
  type: K8sResourceType;
  status?: 'ready' | 'deploying' | 'active' | 'error' | 'terminated';
  showIndicator?: boolean;
  indicatorCount?: number;
  label?: string;
}

const iconMap: Record<K8sResourceType, React.ComponentType<any>> = {
  namespace: KubernetesNamespace,
  datacenter: BuildingFill,
  mobiletower: MobileTowerFill,
  service: KubernetesService,
  deployment: KubernetesDeployment,
  job: KubernetesJob,
  ingress: KubernetesIngress,
  pod: KubernetesPod,
  secret: KubernetesSecret,
  configmap: KubernetesConfigMap,
  persistentvolume: KubernetesPersistentVolume,
  persistentvolumeclaim: KubernetesPersistentVolumeClaim,
  statefulset: KubernetesStatefulSet,
  node: KubernetesNode,
  multus: KubernetesMultus,
};

const statusBorderColors: Record<string, string> = {
  ready: 'transparent',
  deploying: statusColors.deploying.hex,
  active: statusColors.active.hex,
  error: statusColors.error.hex,
  terminated: statusColors.terminated.hex,
};

export function KubernetesIconWrapper({ 
  type, 
  status = 'ready', 
  showIndicator = false,
  indicatorCount,
  label 
}: KubernetesIconWrapperProps) {
  const IconComponent = iconMap[type];
  
  if (!IconComponent) {
    console.warn(`No icon found for type: ${type}`);
    return null;
  }

  const borderColor = statusBorderColors[status] || 'transparent';
  const fillColor = statusColors[status]?.hex || statusColors.ready.hex;
  const indicatorBg = fillColor;
  const indicatorTextClass = status === 'ready' ? 'text-blue-dark-950' : 'text-white';

  return (
    <div className="KubernetesIconWrapper flex flex-col items-center gap-2 relative">
      {/* Hexagonal Background with Status Color */}
      <div className="relative w-[52px]">
        {/* Outer hexagon border (for status indicator) */}
        {status !== 'ready' && (
          <svg 
            width="50" 
            height="56" 
            viewBox="0 0 50 56" 
            fill="none" 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ filter: 'blur(4px)' }}
          >
            <path
              d="M23.6445 -1.69141C24.5003 -2.10238 25.4997 -2.10238 26.3555 -1.69141L26.5371 -1.59766L50.4268 11.8613C51.3846 12.4011 52 13.4164 52 14.542V41.458C52 42.5837 51.3846 43.5989 50.4268 44.1387L26.5371 57.5977C25.5842 58.1345 24.4158 58.1345 23.4629 57.5977L-0.426758 44.1387C-1.38456 43.5989 -2 42.5836 -2 41.458V14.542C-2 13.4164 -1.38457 12.4011 -0.426758 11.8613L23.4629 -1.59766L23.6445 -1.69141Z"
              stroke={borderColor}
              strokeOpacity="0.2"
              strokeWidth="4"
            />
          </svg>
        )}
        
        {/* Inner hexagon with semi-transparent white fill */}
        <svg 
          width="50" 
          height="56" 
          viewBox="0 0 50 56" 
          fill="none"
          className="relative"
        >
          <path
            d="M24.4449 0.145144C24.7884 -0.0483814 25.2116 -0.0483813 25.5551 0.145144L49.4449 13.6035C49.7884 13.797 50 14.1546 50 14.5417V41.4583C50 41.8454 49.7884 42.203 49.4449 42.3965L25.5551 55.8549C25.2116 56.0484 24.7884 56.0484 24.4449 55.8549L0.555144 42.3965C0.21162 42.203 0 41.8454 0 41.4583V14.5417C0 14.1546 0.21162 13.797 0.555144 13.6035L24.4449 0.145144Z"
            fill={status === 'ready' ? fillColor : 'rgba(255, 255, 255, 0.4)'}
            stroke={status !== 'ready' ? borderColor : 'rgba(0,0,0,0.1)'}
            strokeWidth="1"
          />
        </svg>

        {/* K8s Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <IconComponent />
        </div>

        {/* Indicator Badge */}
        {showIndicator && indicatorCount != null && (
          <div
            className="absolute -bottom-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border border-blue-dark-950/30"
            style={{ backgroundColor: indicatorBg }}
          >
            <span className={`${indicatorTextClass} font-macan-mono-stencil text-xs font-medium leading-tight`}>
              {indicatorCount}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      {label && (
        <div className="text-blue-dark-950 font-macan-mono text-sm font-book leading-tight text-center">
          {label}
        </div>
      )}
    </div>
  );
}
