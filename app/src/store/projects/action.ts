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
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  PROJECTS_ONE_PROJECT_FAILURE,
  PROJECTS_FIND_USER_FAILURE,
  PROJECTS_FAILURE,
  CLEAR_ERRORS,
  ParamsNewProject,
  ParamsGetOneProject,
  ParamsGetUserByEmail,
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
      type: PROJECTS_ONE_PROJECT_FAILURE,
    });
  }
};

export const getUserByEmail = ({
  user,
  enqueueSnackbar,
}: ParamsGetUserByEmail & ProviderContextNotistack): RootThunkAction => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_REQUEST,
    });

    const headers = getFetchHeaders();
    const { user: userData, message } = await request(
      `/api/user?email=${user}`,
      'GET',
      null,
      headers
    );

    enqueueSnackbar(message.msg, {
      variant: message.severity,
    });

    dispatch({
      type: GET_USER_SUCCESS,
      payload: { userData },
    });
  } catch (error) {
    const errors = handleErrors(error);

    errors.map(({ msg, severity }) =>
      enqueueSnackbar(msg, {
        variant: severity,
      })
    );

    dispatch({
      type: PROJECTS_FIND_USER_FAILURE,
    });
  }
};

export const clearProjectErrors = (): RootThunkAction => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
