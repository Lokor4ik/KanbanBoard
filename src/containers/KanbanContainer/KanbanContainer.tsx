import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import KanbanColumn from 'components/KanbanColumn/KanbanColumn';
import KanbanColumnContent from 'components/KanbanColumnContent/KanbanColumnContent';

import './KanbanContainer.scss';

const itemsFromBackend = [
  { id: uuidv4(), content: 'First task' },
  { id: uuidv4(), content: 'Second task' },
  { id: uuidv4(), content: 'Third task' },
  { id: uuidv4(), content: 'Fourth task' },
  { id: uuidv4(), content: 'Fifth task' },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: 'Requested',
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: 'To do',
    items: [],
  },
  [uuidv4()]: {
    name: 'In Progress',
    items: [],
  },
  [uuidv4()]: {
    name: 'Done',
    items: [],
  },
};

const KanbanContainer = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];

      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className="kanban__wrapper">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {Object.entries(columns).map(([columnId, column]) => (
          <KanbanColumn key={columnId} columnId={columnId} column={column}>
            <KanbanColumnContent columnId={columnId} column={column} />
          </KanbanColumn>
        ))}
      </DragDropContext>
    </div>
  );
};

export default KanbanContainer;
