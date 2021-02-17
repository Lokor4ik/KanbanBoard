import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { SET_CARD_COLUMN, SET_CARD_POSITION } from './types';

export const changeCardDistination = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch({
    type: SET_CARD_COLUMN,
    payload: {},
  });
  dispatch({
    type: SET_CARD_POSITION,
    payload: {},
  });
};
