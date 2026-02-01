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
  label,
}: KubernetesIconWrapperProps) {
  const IconComponent = iconMap[type];
  const borderColor = statusBorderColors[status] ?? 'transparent';

  if (!IconComponent) {
    console.warn(`No icon found for type: ${type}`);
    return null;
  }

  return (
    <div className="KubernetesIconWrapper flex flex-col items-center gap-0.5 relative">
      {/* Hexagonal Background with Theme-Aware Styling */}
      <div className="relative w-[56px]" data-anchor="node-body">
        {/* Outer hexagon */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <g transform="matrix(0.975 0 0 0.975 3.5 0.65)">
            <path
              d="M24.1992 -0.290039C24.6951 -0.569392 25.3049 -0.569392 25.8008 -0.290039L49.6904 13.168C50.1875 13.4481 50.5 13.9703 50.5 14.542V41.458C50.5 42.0297 50.1875 42.5519 49.6904 42.832L25.8008 56.29C25.3049 56.5694 24.6951 56.5694 24.1992 56.29L0.30957 42.832C-0.18747 42.5519 -0.5 42.0297 -0.5 41.458V14.542C-0.5 13.9703 -0.187471 13.4481 0.30957 13.168L24.1992 -0.290039Z"
              fill="var(--k8s-hexagon-fill)"
              stroke={borderColor}
              strokeWidth="2"
            />
          </g>
        </svg>

        {/* Inner hexagon with theme-aware fill and status stroke */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          className="relative"
        >
          <g transform="matrix(0.975 0 0 0.975 3.5 0.65)">
            <path
              d="M24.4449 0.145144C24.7884 -0.0483814 25.2116 -0.0483813 25.5551 0.145144L49.4449 13.6035C49.7884 13.797 50 14.1546 50 14.5417V41.4583C50 41.8454 49.7884 42.203 49.4449 42.3965L25.5551 55.8549C25.2116 56.0484 24.7884 56.0484 24.4449 55.8549L0.555144 42.3965C0.21162 42.203 0 41.8454 0 41.4583V14.5417C0 14.1546 0.21162 13.797 0.555144 13.6035L24.4449 0.145144Z"
              fill="var(--k8s-hexagon-fill)"
              stroke={borderColor}
              strokeWidth="2"
            />
          </g>
        </svg>

        {/* K8s Icon - theme-aware color */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <IconComponent fill="var(--k8s-icon-fill)" />
        </div>

        {/* Indicator Badge */}
        {showIndicator && indicatorCount != null && (
          <div
            className="absolute -bottom-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--Blue-Blue-Gray-600, #868D97)' }}
          >
            <span className="text-white font-macan-mono-stencil text-xs font-medium leading-[120%]">
              {indicatorCount}
            </span>
          </div>
        )}
      </div>

      {/* Label - theme-aware text color */}
      {label && (
        <div
          data-anchor="node-label"
          className="font-macan-mono text-[8px] font-medium leading-normal text-center"
          style={{ color: 'var(--k8s-icon-text)' }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
