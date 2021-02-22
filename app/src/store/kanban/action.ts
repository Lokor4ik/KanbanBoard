import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from 'store/types';
import { SET_CARD_DESTINATION, ParamsChangeCardColumn, ParamsChangeCardPosition } from './types';

export const changeCardColumn = ({
  srcDroppableId,
  destDroppableId,
  srcIndex,
  destIndex,
}: ParamsChangeCardColumn): ThunkAction<void, RootState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  const { columns } = getState().kanban;

  const sourceColumn = columns[srcDroppableId];
  const destColumn = columns[destDroppableId];
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];

  const [removed] = sourceItems.splice(srcIndex, 1);
  destItems.splice(destIndex, 0, removed);

  const modifiedColumns = {
    ...columns,
    [srcDroppableId]: {
      ...sourceColumn,
      items: sourceItems,
    },
    [destDroppableId]: {
      ...destColumn,
      items: destItems,
    },
  };

  dispatch({
    type: SET_CARD_DESTINATION,
    payload: { modifiedColumns },
  });
};

export const changeCardPosition = ({
  srcDroppableId,
  srcIndex,
  destIndex,
}: ParamsChangeCardPosition): ThunkAction<void, RootState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  const { columns } = getState().kanban;

  const column = columns[srcDroppableId];
  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(srcIndex, 1);
  copiedItems.splice(destIndex, 0, removed);

  const modifiedColumns = {
    ...columns,
    [srcDroppableId]: {
      ...column,
      items: copiedItems,
    },
  };

  dispatch({
    type: SET_CARD_DESTINATION,
    payload: { modifiedColumns },
  });
};
