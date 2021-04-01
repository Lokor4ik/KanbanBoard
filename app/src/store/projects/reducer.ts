import {
  PROJECT_LOADING_REQUEST,
  PROJECT_LOADING_SUCCESS,
  PROJECTS_FAILURE,
  CLEAR_ERRORS,
  ProjectInitialState,
  ProjectsActionTypes,
} from './types';

const initialState: ProjectInitialState = {
  rows: [],
  loading: true,
  errors: [],
};

export default function reducer(state = initialState, action: ProjectsActionTypes) {
  switch (action.type) {
    case PROJECT_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_LOADING_SUCCESS: {
      return {
        ...state,
        rows: action.payload.rows,
        loading: false,
      };
    }
    case PROJECTS_FAILURE:
      return {
        ...state,
        rows: [],
        loading: false,
        errors: action.payload.errors,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
}
