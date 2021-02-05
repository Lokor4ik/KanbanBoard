import { useState, CSSProperties } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

import './App.css';

type ModelGetItemStyle = (
  isDragging: boolean,
  restStyles: DraggingStyle | NotDraggingStyle | undefined
) => CSSProperties | undefined;

const getItemStyle: ModelGetItemStyle = (isDragging, restStyles) => ({
  userSelect: 'none',
  padding: 16,
  margin: '0 0 8px 0',
  minHeight: '50px',
  backgroundColor: isDragging ? '#263B4A' : '#456C86',
  color: 'white',
  ...restStyles,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 4,
  width: 250,
  minHeight: 500,
});

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

function App() {
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
    <div className="board-wrapper">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {Object.entries(columns).map(([columnId, column]) => (
          <div className="columns__item" key={columnId}>
            <h2>{column.name}</h2>
            <div className="columns__item-content">
              <Droppable droppableId={columnId} key={columnId}>
                {(providedUpper, snapshotUpper) => (
                  <div
                    ref={providedUpper.innerRef}
                    style={getListStyle(snapshotUpper.isDraggingOver)}
                    {...providedUpper.droppableProps}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(providedLower, snapshotLower) => (
                          <div
                            ref={providedLower.innerRef}
                            style={getItemStyle(
                              snapshotLower.isDragging,
                              providedLower.draggableProps.style
                            )}
                            {...providedLower.draggableProps}
                            {...providedLower.dragHandleProps}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {providedUpper.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
