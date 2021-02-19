export const SET_CARD_DESTINATION = 'SET_CARD_DESTINATION';

interface ChangeCardDistinationPayload {
  modifiedColumns: TypeKanbanColumns;
}

interface ChangeCardDistinationAction {
  type: string;
  payload: ChangeCardDistinationPayload;
}

export type KanbanActionTypes = ChangeCardDistinationAction;

export interface TypeKanbanColumns {
  [key: string]: {
    name: string;
    items: Array<{ id: string; content: string }>;
  };
}

export type ParamsChangeCardPosition = {
  srcDroppableId: string;
  srcIndex: number;
  destIndex: number;
};

export type ParamsChangeCardColumn = ParamsChangeCardPosition & {
  destDroppableId: string;
};
