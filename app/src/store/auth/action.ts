import request from 'services/axios';

import { RootThunkAction } from 'store/types';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  /*   MAIN_LOADED_SUCCESS,
  USER_LOADING_REQUEST,
  USER_LOADED_SUCCESS,
  AUTH_ERROR, */
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  /*   LOGOUT, */
  ParamsRegisterUser,
  ParamsLoginUser,
} from './types';

/* export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      dispatch({ type: USER_LOADING_REQUEST });

      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      localStorage.removeItem('token');

      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: MAIN_LOADED_SUCCESS,
    });
  }
}; */

export const registerUser = ({
  name,
  email,
  password,
}: ParamsRegisterUser): RootThunkAction => async (dispatch) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.token,
  };
  const body = JSON.stringify({ name, email, password });

  try {
    dispatch({ type: REGISTER_REQUEST });

    const { token, user } = await request('/api/user', 'GET', body, headers);

    localStorage.setItem('token', token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    /* const { errors } = error.response.data;

    if (errors) {
      errors.forEach((element) => {
        message.error(element.msg);
      });
    } */

    localStorage.removeItem('token');

    dispatch({
      type: REGISTER_FAILURE,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

export const loginUser = ({ email, password }: ParamsLoginUser): RootThunkAction => async (
  dispatch
) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.token,
  };
  const body = JSON.stringify({ email, password });

  try {
    dispatch({ type: LOGIN_REQUEST });

    const { token, user } = await request('/api/user', 'GET', body, headers);

    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    /*  const { errors } = error.response.data;

    if (errors) {
      errors.forEach((element) => {
        message.error(element.msg);
      });
    } */

    localStorage.removeItem('token');

    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

/* export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
 */
