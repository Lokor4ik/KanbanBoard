import { Color } from '@material-ui/lab/Alert';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const USER_LOADING_REQUEST = 'USER_LOADING_REQUEST';
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const MAIN_LOADED_SUCCESS = 'MAIN_LOADED_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export interface AuthInitialState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    date: Date;
  } | null;
  errors: Array<{ msg: string; severity: Color }>;
}

export type ParamsRegisterUser = ParamsLoginUser & {
  name: string;
};

export type ParamsLoginUser = {
  email: string;
  password: string;
};

export type AuthActionTypes = {
  type: string;
  payload: AuthInitialState;
};
