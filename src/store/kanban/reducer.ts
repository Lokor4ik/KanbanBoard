import { v4 as uuidv4 } from 'uuid';

import { SET_CARD_DESTINATION, KanbanActionTypes } from './types';

const initialState = {
  columns: {
    [uuidv4()]: {
      name: 'Requested',
      items: [
        { id: uuidv4(), content: 'First task' },
        { id: uuidv4(), content: 'Second task' },
        { id: uuidv4(), content: 'Third task' },
        { id: uuidv4(), content: 'Fourth task' },
        { id: uuidv4(), content: 'Fifth task' },
      ],
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
  },
};

export default function reducer(state = initialState, action: KanbanActionTypes) {
  switch (action.type) {
    case SET_CARD_DESTINATION: {
      return {
        ...state,
        columns: action.payload.modifiedColumns,
      };
    }
    default:
      return state;
  }
}
