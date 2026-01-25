import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { AppLayout } from './components/layout/AppLayout';
import { TopologyCanvas } from './components/topology/TopologyCanvas';

function App() {
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
