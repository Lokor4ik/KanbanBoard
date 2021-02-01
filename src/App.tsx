import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './App.css';

interface NotDraggingStyle {
  transform?: string;
  transition?: 'none';
}
interface DraggingStyle {
  position: 'fixed';
  top: number;
  left: number;
  boxSizing: 'border-box';
  width: number;
  height: number;
  transition: 'none';
  transform?: string;
  zIndex: number;
  opacity?: number;
  pointerEvents: 'none';
}
interface ItemsModel {
  id: string;
  content: string;
}

type DraggableStyleModel = DraggingStyle | NotDraggingStyle | undefined;

const getItems = (count: number) =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: uuidv4(),
    content: `item ${k}`,
  }));

const reorder = (list: ItemsModel[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableStyleModel) => ({
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

function App() {
  const [items, setItems] = useState<ItemsModel[]>(getItems(10));
  const onDragEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const newItems = reorder(items, result.source.index, result.destination.index);

      setItems([...newItems]);
    },
    [items]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-wrapper">
        <Droppable droppableId="droppable-1">
          {(providedUpper, snapshotUpper) => (
            <div
              {...providedUpper.droppableProps}
              ref={providedUpper.innerRef}
              style={getListStyle(snapshotUpper.isDraggingOver)}
            >
              {items.map((item: ItemsModel, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(providedLower, snapshotLower) => (
                    <div
                      ref={providedLower.innerRef}
                      {...providedLower.draggableProps}
                      {...providedLower.dragHandleProps}
                      style={getItemStyle(
                        snapshotLower.isDragging,
                        providedLower.draggableProps.style
                      )}
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

        <Droppable droppableId="droppable-2">
          {(providedUpper, snapshotUpper) => (
            <div
              {...providedUpper.droppableProps}
              ref={providedUpper.innerRef}
              style={getListStyle(snapshotUpper.isDraggingOver)}
            >
              {items.map((item: ItemsModel, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(providedLower, snapshotLower) => (
                    <div
                      ref={providedLower.innerRef}
                      {...providedLower.draggableProps}
                      {...providedLower.dragHandleProps}
                      style={getItemStyle(
                        snapshotLower.isDragging,
                        providedLower.draggableProps.style
                      )}
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
    </DragDropContext>
  );
}

export default App;
