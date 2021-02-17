import { CSSProperties } from 'react';

import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

export type PropsKanbanColumn = PropsKanbanColumnContent & {
  children: React.ReactNode;
};

export type PropsKanbanColumnContent = {
  columnId: string;
  column: {
    name: string;
    items: Array<{ id: string; content: string }>;
  };
};

export type TypeGetItemStyle = (
  isDragging: boolean,
  restStyles: DraggingStyle | NotDraggingStyle | undefined
) => CSSProperties | undefined;
