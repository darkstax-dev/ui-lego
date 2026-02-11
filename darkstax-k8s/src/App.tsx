import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { AppLayout } from './components/layout/AppLayout';
import { TopologyCanvas } from './components/topology/TopologyCanvas';
import { useTheme } from './hooks/useTheme';

function App() {
  // Initialize theme hook to enable dark mode support
  useTheme();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.data.current) {
      console.log('Dropped resource:', active.data.current, 'onto:', over.id);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AppLayout>
        <TopologyCanvas />
      </AppLayout>
    </DndContext>
  );
}

export default App;
