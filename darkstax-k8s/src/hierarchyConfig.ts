import type { HierarchyConfig, Category, GroupingRule } from './hierarchy';
import type { K8sNodeData, K8sNodeGroup } from './types';
import hierarchyConfigJson from './config/kubernetes-hierarchy.json';

export const hierarchyConfig: HierarchyConfig = hierarchyConfigJson as HierarchyConfig;

export function getLaneCategories(config: HierarchyConfig): Array<{ id: string; label: string; height: number | 'auto' }> {
  return config.categories
    .filter(cat => cat.laneConfig.display)
    .sort((a, b) => (a.laneConfig.order || 0) - (b.laneConfig.order || 0))
    .map(cat => ({
      id: cat.id,
      label: cat.label,
      height: cat.laneConfig.height
    }));
}

export function buildGroupsFromRules(
  nodes: K8sNodeData[],
  groupingRules: GroupingRule[]
): K8sNodeGroup[] {
  const groups: K8sNodeGroup[] = [];
  const enabledRules = groupingRules
    .filter(rule => rule.enabled)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));

  enabledRules.forEach(rule => {
    if (rule.criteria.type === 'property-match') {
      const { ownerProperty, ownerValue, memberProperty, memberValue } = rule.criteria;
      
      if (!ownerProperty || !ownerValue || !memberProperty || !memberValue) {
        return;
      }

      const ownerNodes = nodes.filter(node => {
        const propValue = node.metadata[ownerProperty];
        return propValue === ownerValue;
      });

      ownerNodes.forEach(ownerNode => {
        const memberValueResolved = memberValue.replace('${ownerId}', ownerNode.id);
        
        const memberNodes = nodes.filter(node => {
          const propValue = node.metadata[memberProperty];
          return propValue === memberValueResolved;
        });

        if (memberNodes.length > 0) {
          groups.push({
            id: `group-${ownerNode.id}`,
            ownerId: ownerNode.id,
            memberIds: memberNodes.map(n => n.id),
            collapsed: rule.defaultCollapsed || false,
            level: rule.hierarchyLevel || 0,
            depth: (rule.hierarchyLevel || 0) + 1
          });
        }
      });
    }
  });

  return groups;
}

export function getCategoryForResourceType(
  resourceType: string,
  config: HierarchyConfig
): Category | undefined {
  return config.categories.find(cat => 
    cat.resourceTypes.includes(resourceType)
  );
}

export function getGroupStyleForRule(
  ruleId: string,
  config: HierarchyConfig
): GroupingRule['style'] | undefined {
  const rule = config.groupingRules.find(r => r.id === ruleId);
  return rule?.style;
}

export function isResourceCollapsible(
  resourceType: string,
  config: HierarchyConfig
): boolean {
  const rule = config.groupingRules.find(r => 
    r.enabled && 
    r.criteria.ownerValue === resourceType
  );
  return rule?.collapsible || false;
}

export function getHierarchyLevelForResource(
  resourceType: string,
  config: HierarchyConfig
): number {
  const level = config.hierarchyLevels.find(l => 
    l.resourceTypes.includes(resourceType)
  );
  return level?.level || 0;
}

export function canResourceContain(
  parentType: string,
  childType: string,
  config: HierarchyConfig
): boolean {
  const level = config.hierarchyLevels.find(l => 
    l.resourceTypes.includes(parentType)
  );
  return level?.canContain?.includes(childType) || false;
}
