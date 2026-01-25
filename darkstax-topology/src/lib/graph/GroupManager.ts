import { TopologyNode, NodeGroup } from '@/types/graph';

export class GroupManager {
  private groups: Map<string, NodeGroup> = new Map();
  private nodeToGroup: Map<string, string> = new Map();

  constructor() {}

  createGroup(ownerId: string, memberIds: string[]): NodeGroup {
    const group: NodeGroup = {
      id: `group-${ownerId}`,
      ownerId,
      memberIds,
      collapsed: false,
      level: 1,
      depth: 1,
    };

    this.groups.set(group.id, group);
    memberIds.forEach(memberId => {
      this.nodeToGroup.set(memberId, group.id);
    });

    return group;
  }

  addMemberToGroup(groupId: string, nodeId: string) {
    const group = this.groups.get(groupId);
    if (group && !group.memberIds.includes(nodeId)) {
      group.memberIds.push(nodeId);
      this.nodeToGroup.set(nodeId, groupId);
    }
  }

  removeMemberFromGroup(groupId: string, nodeId: string) {
    const group = this.groups.get(groupId);
    if (group) {
      group.memberIds = group.memberIds.filter(id => id !== nodeId);
      this.nodeToGroup.delete(nodeId);
    }
  }

  collapseGroup(groupId: string, nodes: TopologyNode[]): TopologyNode[] {
    const group = this.groups.get(groupId);
    if (!group) return nodes;

    group.collapsed = true;

    return nodes.map(node => {
      if (group.memberIds.includes(node.id)) {
        return { ...node, hidden: true };
      }
      return node;
    });
  }

  expandGroup(groupId: string, nodes: TopologyNode[]): TopologyNode[] {
    const group = this.groups.get(groupId);
    if (!group) return nodes;

    group.collapsed = false;

    return nodes.map(node => {
      if (group.memberIds.includes(node.id)) {
        return { ...node, hidden: false };
      }
      return node;
    });
  }

  toggleGroup(groupId: string, nodes: TopologyNode[]): TopologyNode[] {
    const group = this.groups.get(groupId);
    if (!group) return nodes;

    return group.collapsed 
      ? this.expandGroup(groupId, nodes)
      : this.collapseGroup(groupId, nodes);
  }

  getGroupForNode(nodeId: string): NodeGroup | undefined {
    const groupId = this.nodeToGroup.get(nodeId);
    return groupId ? this.groups.get(groupId) : undefined;
  }

  getAllGroups(): NodeGroup[] {
    return Array.from(this.groups.values());
  }

  deleteGroup(groupId: string) {
    const group = this.groups.get(groupId);
    if (group) {
      group.memberIds.forEach(nodeId => {
        this.nodeToGroup.delete(nodeId);
      });
      this.groups.delete(groupId);
    }
  }
}
