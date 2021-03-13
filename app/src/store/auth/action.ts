import request from 'services/axios';
import handleErrors from 'utils/actionErrors';

import { RootThunkAction } from 'store/types';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  MAIN_LOADED_SUCCESS,
  USER_LOADING_REQUEST,
  USER_LOADED_SUCCESS,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_ERRORS,
  ParamsRegisterUser,
  ParamsLoginUser,
} from './types';

export const loadUser = (): RootThunkAction => async (dispatch) => {
  if (localStorage.token) {
    try {
      dispatch({ type: USER_LOADING_REQUEST });

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      };
      const { data } = await await request('/api/auth', 'GET', null, headers);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: { user: data },
      });
    } catch (error) {
      localStorage.removeItem('token');

      const errors = handleErrors(error);

      dispatch({
        type: AUTH_ERROR,
        payload: { errors },
      });
    }
  } else {
    dispatch({
      type: MAIN_LOADED_SUCCESS,
    });
  }
};

export const registerUser = ({
  name,
  email,
  password,
}: ParamsRegisterUser): RootThunkAction => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.token,
    };
    const body = JSON.stringify({ name, email, password });
    const { token, user } = await request('/api/user', 'POST', body, headers);

    localStorage.setItem('token', token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    localStorage.removeItem('token');

    const errors = handleErrors(error);

    dispatch({
      type: REGISTER_FAILURE,
      payload: { errors },
    });
  }
};

export const loginUser = ({ email, password }: ParamsLoginUser): RootThunkAction => async (
  dispatch
) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.token,
    };
    const body = JSON.stringify({ email, password });

    const { token, user } = await request('/api/auth', 'POST', body, headers);

    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    localStorage.removeItem('token');

    const errors = handleErrors(error);

    dispatch({
      type: LOGIN_FAILURE,
      payload: { errors },
    });
  }
};

export const logoutUser = (): RootThunkAction => async (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: LOGOUT });
};

export const clearErrors = (): RootThunkAction => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
