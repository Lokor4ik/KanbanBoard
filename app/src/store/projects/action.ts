import request from 'services/axios';
import headers from 'assets/variables/fetchHeaders';
import handleErrors from 'utils/actionErrors';

import { RootThunkAction } from 'store/types';

import { PROJECT_LOADING_REQUEST, PROJECT_LOADING_SUCCESS, PROJECTS_FAILURE } from './types';

export const getProjects = (): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_LOADING_REQUEST,
    });

    const rows = await request('/api/project', 'GET', null, headers);

    dispatch({
      type: PROJECT_LOADING_SUCCESS,
      payload: { rows },
    });
  } catch (error) {
    const errors = handleErrors(error);

    dispatch({
      type: PROJECTS_FAILURE,
      payload: { errors },
    });
  }
};
