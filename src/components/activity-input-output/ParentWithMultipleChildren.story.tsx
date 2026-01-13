import React from 'react'
import type { StoryObj } from '@storybook/react-vite'
import ActivityInputOutput from './ActivityInputOutput'

type Story = StoryObj<typeof ActivityInputOutput>

export const ParentWithMultipleChildren: Story = {
  args: {
    initialNodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 250 },
        data: { label: 'Start' },
      },
      {
        id: 'execution-1',
        type: 'execution',
        position: { x: 300, y: 250 },
        data: {
          label: 'parent-node',
          id: 'execution-1',
          onDelete: () => {},
          onAddInput: () => {},
          onAddOutput: () => {},
          onToggleInputGroup: () => {},
          onToggleOutputGroup: () => {},
          onCollapse: () => {},
          hasInputs: true,
          hasOutputs: true,
        },
      },
      // Input group container (centered relative to execution node)
      {
        id: 'execution-1-input-group',
        type: 'groupBackground',
        position: { x: 200, y: 50 },
        data: { type: 'input', count: 3, isCollapsed: false },
      },
      // Input child nodes (positioned relative to group)
      {
        id: 'execution-1-input-1',
        type: 'input',
        position: { x: 60, y: 40 },
        data: { label: 'Input 1' },
        parentId: 'execution-1-input-group',
        extent: 'parent',
      },
      {
        id: 'execution-1-input-2',
        type: 'input',
        position: { x: 180, y: 40 },
        data: { label: 'Input 2' },
        parentId: 'execution-1-input-group',
        extent: 'parent',
      },
      {
        id: 'execution-1-input-3',
        type: 'input',
        position: { x: 300, y: 40 },
        data: { label: 'Input 3' },
        parentId: 'execution-1-input-group',
        extent: 'parent',
      },
      // Output group container (centered relative to execution node)
      {
        id: 'execution-1-output-group',
        type: 'groupBackground',
        position: { x: 200, y: 380 },
        data: { type: 'output', count: 3, isCollapsed: false },
      },
      // Output child nodes (positioned relative to group)
      {
        id: 'execution-1-output-1',
        type: 'output',
        position: { x: 60, y: 40 },
        data: { label: 'Output 1' },
        parentId: 'execution-1-output-group',
        extent: 'parent',
      },
      {
        id: 'execution-1-output-2',
        type: 'output',
        position: { x: 180, y: 40 },
        data: { label: 'Output 2' },
        parentId: 'execution-1-output-group',
        extent: 'parent',
      },
      {
        id: 'execution-1-output-3',
        type: 'output',
        position: { x: 300, y: 40 },
        data: { label: 'Output 3' },
        parentId: 'execution-1-output-group',
        extent: 'parent',
      },
      {
        id: 'stop',
        type: 'stop',
        position: { x: 550, y: 250 },
        data: { label: 'Stop' },
      },
    ],
    initialEdges: [
      {
        id: 'e-start-execution-1',
        source: 'start',
        target: 'execution-1',
        type: 'default',
        className: 'custom-edge',
      },
      // Input edges
      {
        id: 'e-execution-1-input-1-execution-1',
        source: 'execution-1-input-1',
        target: 'execution-1',
        targetHandle: 'top',
        type: 'default',
        className: 'custom-edge',
      },
      {
        id: 'e-execution-1-input-2-execution-1',
        source: 'execution-1-input-2',
        target: 'execution-1',
        targetHandle: 'top',
        type: 'default',
        className: 'custom-edge',
      },
      {
        id: 'e-execution-1-input-3-execution-1',
        source: 'execution-1-input-3',
        target: 'execution-1',
        targetHandle: 'top',
        type: 'default',
        className: 'custom-edge',
      },
      // Output edges
      {
        id: 'e-execution-1-execution-1-output-1',
        source: 'execution-1',
        sourceHandle: 'bottom',
        target: 'execution-1-output-1',
        type: 'default',
        className: 'custom-edge',
      },
      {
        id: 'e-execution-1-execution-1-output-2',
        source: 'execution-1',
        sourceHandle: 'bottom',
        target: 'execution-1-output-2',
        type: 'default',
        className: 'custom-edge',
      },
      {
        id: 'e-execution-1-execution-1-output-3',
        source: 'execution-1',
        sourceHandle: 'bottom',
        target: 'execution-1-output-3',
        type: 'default',
        className: 'custom-edge',
      },
      {
        id: 'e-execution-1-stop',
        source: 'execution-1',
        target: 'stop',
        type: 'default',
        className: 'custom-edge',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="activity-input-output-story-fullscreen">
        <Story />
      </div>
    ),
  ],
}
