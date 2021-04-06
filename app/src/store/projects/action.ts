import request from 'services/axios';
import getFetchHeaders from 'utils/getFetchHeaders';
import handleErrors from 'utils/actionErrors';

import { RootThunkAction, ProviderContextNotistack } from 'store/types';

import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  CREATE_NEW_PROJECT_REQUEST,
  CREATE_NEW_PROJECT_SUCCESS,
  GET_ONE_PROJECT_REQUEST,
  GET_ONE_PROJECT_SUCCESS,
  PROJECTS_FAILURE,
  ParamsNewProject,
  ParamsGetOneProject,
} from './types';

export const getProjects = ({
  enqueueSnackbar,
}: ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: PROJECTS_LOADING_REQUEST,
    });

    const headers = getFetchHeaders();
    const rows = await request('/api/project', 'GET', null, headers);

    dispatch({
      type: PROJECTS_LOADING_SUCCESS,
      payload: { rows },
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_FAILURE,
    });
  }
};

export const createNewProject = ({
  enqueueSnackbar,
  name,
  key,
  lead,
}: ParamsNewProject & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEW_PROJECT_REQUEST,
    });

    const headers = getFetchHeaders();
    const body = JSON.stringify({ name, key, lead });
    const { msg, severity } = await request('/api/project', 'POST', body, headers);

    enqueueSnackbar(msg, {
      variant: severity,
    });

    dispatch({
      type: CREATE_NEW_PROJECT_SUCCESS,
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_FAILURE,
    });
  }
};

export const getOneProject = ({
  id,
  enqueueSnackbar,
}: ParamsGetOneProject & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: GET_ONE_PROJECT_REQUEST,
    });

    const headers = getFetchHeaders();
    const project = await request(`/api/project/one?id=${id}`, 'GET', null, headers);

    dispatch({
      type: GET_ONE_PROJECT_SUCCESS,
      payload: { project },
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_FAILURE,
    });
  }
};
