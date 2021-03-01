import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADED_SUCCESS,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  AuthActionTypes,
} from './types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: {},
};

export default function reducer(state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case USER_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: {},
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        error: {},
      };
    case LOGOUT:
    case AUTH_ERROR:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
