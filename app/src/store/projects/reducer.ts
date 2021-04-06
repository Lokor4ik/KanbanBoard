import { AnyAction } from 'redux';

import {
  PROJECTS_LOADING_REQUEST,
  PROJECTS_LOADING_SUCCESS,
  CREATE_NEW_PROJECT_REQUEST,
  CREATE_NEW_PROJECT_SUCCESS,
  GET_ONE_PROJECT_REQUEST,
  GET_ONE_PROJECT_SUCCESS,
  PROJECTS_FAILURE,
  ProjectInitialState,
} from './types';

export const initialStateProjects: ProjectInitialState = {
  rows: [],
  loading: false,
  creatingProject: false,
  currentProject: {
    id: '',
    name: '',
    key: '',
    lead: '',
  },
};

export default function reducer(state = initialStateProjects, action: AnyAction) {
  switch (action.type) {
    case PROJECTS_LOADING_REQUEST:
    case GET_ONE_PROJECT_REQUEST:
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
    case GET_ONE_PROJECT_SUCCESS: {
      return {
        ...state,
        rows: [],
        loading: false,
        creatingProject: false,
        currentProject: action.payload.project,
      };
    }
    case PROJECTS_FAILURE: {
      return {
        ...initialStateProjects,
      };
    }
    default:
      return state;
  }
}
