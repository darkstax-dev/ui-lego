import { TopologyNode, NodeGroup } from '@/types/graph';
import { GroupingRule } from '@/types/config';

export class GroupingEngine {
  applyGroupingRules(
    nodes: TopologyNode[],
    rules: GroupingRule[]
  ): NodeGroup[] {
    const groups: NodeGroup[] = [];

    const enabledRules = rules.filter(rule => rule.enabled);

    for (const rule of enabledRules) {
      const ruleGroups = this.applyRule(nodes, rule);
      groups.push(...ruleGroups);
    }

    return groups;
  }

  private applyRule(nodes: TopologyNode[], rule: GroupingRule): NodeGroup[] {
    const { criteria } = rule;

    switch (criteria.type) {
      case 'property-match':
        return this.applyPropertyMatchRule(nodes, rule);
      case 'pattern-match':
        return this.applyPatternMatchRule(nodes, rule);
      case 'manual':
        return this.applyManualRule(nodes, rule);
      default:
        console.warn(`Unknown grouping criteria type: ${criteria.type}`);
        return [];
    }
  }

  private applyPropertyMatchRule(nodes: TopologyNode[], rule: GroupingRule): NodeGroup[] {
    const { criteria } = rule;
    const groups: NodeGroup[] = [];

    if (!criteria.ownerProperty || !criteria.ownerValue) {
      return groups;
    }

    const ownerValues = Array.isArray(criteria.ownerValue) 
      ? criteria.ownerValue 
      : [criteria.ownerValue];

    const potentialOwners = nodes.filter(node => {
      const propValue = node.data.metadata[criteria.ownerProperty!];
      return ownerValues.some(val => 
        this.matchValue(propValue, val, node.id)
      );
    });

    for (const owner of potentialOwners) {
      const members = this.findMembers(nodes, owner, criteria);
      
      if (members.length > 0) {
        groups.push({
          id: `${rule.id}-${owner.id}`,
          ownerId: owner.id,
          memberIds: members.map(m => m.id),
          collapsed: false,
          level: 1,
          depth: 1,
        });
      }
    }

    return groups;
  }

  private applyPatternMatchRule(nodes: TopologyNode[], rule: GroupingRule): NodeGroup[] {
    const { criteria } = rule;
    const groups: NodeGroup[] = [];

    if (!criteria.pattern) {
      return groups;
    }

    const regex = new RegExp(criteria.pattern);
    const matchingNodes = nodes.filter(node => 
      regex.test(node.id) || regex.test(node.data.label)
    );

    if (matchingNodes.length > 1) {
      const owner = matchingNodes[0];
      const members = matchingNodes.slice(1);

      groups.push({
        id: `${rule.id}-pattern`,
        ownerId: owner.id,
        memberIds: members.map(m => m.id),
        collapsed: false,
        level: 1,
        depth: 1,
      });
    }

    return groups;
  }

  private applyManualRule(nodes: TopologyNode[], rule: GroupingRule): NodeGroup[] {
    const { criteria } = rule;
    const groups: NodeGroup[] = [];

    if (!criteria.manualGroups) {
      return groups;
    }

    for (const manualGroup of criteria.manualGroups) {
      const ownerExists = nodes.some(n => n.id === manualGroup.ownerId);
      const validMembers = manualGroup.memberIds.filter(memberId =>
        nodes.some(n => n.id === memberId)
      );

      if (ownerExists && validMembers.length > 0) {
        groups.push({
          id: `${rule.id}-${manualGroup.ownerId}`,
          ownerId: manualGroup.ownerId,
          memberIds: validMembers,
          collapsed: false,
          level: 1,
          depth: 1,
        });
      }
    }

    return groups;
  }

  private findMembers(
    nodes: TopologyNode[],
    owner: TopologyNode,
    criteria: any
  ): TopologyNode[] {
    if (!criteria.memberProperty || !criteria.memberValue) {
      return [];
    }

    const memberValues = Array.isArray(criteria.memberValue)
      ? criteria.memberValue
      : [criteria.memberValue];

    return nodes.filter(node => {
      if (node.id === owner.id) return false;

      const propValue = node.data.metadata[criteria.memberProperty];
      return memberValues.some((val: string) =>
        this.matchValue(propValue, val, owner.id)
      );
    });
  }

  private matchValue(actualValue: string | number | boolean, expectedValue: string, ownerId: string): boolean {
    const processedExpected = expectedValue.replace('${ownerId}', ownerId);

    if (typeof actualValue === 'string') {
      return actualValue === processedExpected;
    } else if (typeof actualValue === 'number') {
      return actualValue === parseFloat(processedExpected);
    } else if (typeof actualValue === 'boolean') {
      return actualValue === (processedExpected === 'true');
    }

    return String(actualValue) === processedExpected;
  }
}
