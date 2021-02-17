import { SET_COLUMNS } from './types';

const initialState = {
  columns: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COLUMNS: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
