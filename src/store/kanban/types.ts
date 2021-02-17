export const SET_CARD_COLUMN = 'SET_CARD_COLUMN';
export const SET_CARD_POSITION = 'SET_CARD_POSITION';

interface ChangeCardDistinationPayload {
  sourceDroppableId: string;
  destinationDroppableId: string;
}

interface ChangeCardDistinationAction {
  type: string;
  payload: ChangeCardDistinationPayload;
}

export type KanbanActionTypes = ChangeCardDistinationAction;
