import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import KanbanColumn from 'components/KanbanColumn/KanbanColumn';
import KanbanColumnContent from 'components/KanbanColumnContent/KanbanColumnContent';

import { RootState } from 'store/types';
import { changeCardColumn, changeCardPosition } from 'store/kanban/action';

import './KanbanContainer.scss';

const KanbanContainer = () => {
  const { columns } = useSelector((state: RootState) => state.kanban);

  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      dispatch(
        changeCardColumn({
          srcDroppableId: source.droppableId,
          destDroppableId: destination.droppableId,
          srcIndex: source.index,
          destIndex: destination.index,
        })
      );
    } else {
      dispatch(
        changeCardPosition({
          srcDroppableId: source.droppableId,
          srcIndex: source.index,
          destIndex: destination.index,
        })
      );
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
