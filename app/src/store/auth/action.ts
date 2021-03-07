import request from 'services/axios';

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

      dispatch({
        type: AUTH_ERROR,
        payload: { error },
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

    dispatch({
      type: REGISTER_FAILURE,
      payload: { error },
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

    dispatch({
      type: LOGIN_FAILURE,
      payload: { error },
    });
  }
};

export const logoutUser = (): RootThunkAction => async (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: LOGOUT });
};
