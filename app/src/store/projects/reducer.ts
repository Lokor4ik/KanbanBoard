import { AnyAction } from 'redux';

import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  CREATE_NEW_PROJECT_REQUEST,
  CREATE_NEW_PROJECT_SUCCESS,
  PROJECTS_FAILURE,
  ProjectInitialState,
} from './types';

export const initialStateProjects: ProjectInitialState = {
  rows: [],
  loading: false,
  creatingProject: false,
};

export default function reducer(state = initialStateProjects, action: AnyAction) {
  switch (action.type) {
    case PROJECTS_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_PROJECT_REQUEST: {
      return {
        ...state,
        loading: true,
        creatingProject: true,
      };
    }
    case PROJECTS_LOADING_SUCCESS: {
      return {
        ...state,
        rows: action.payload.rows,
        loading: false,
      };
    }
    case CREATE_NEW_PROJECT_SUCCESS: {
      return {
        ...state,
        creatingProject: false,
      };
    }
    case PROJECTS_FAILURE: {
      return {
        rows: [],
        loading: false,
        creatingProject: false,
      };
    }
    default:
      return state;
  }
}
