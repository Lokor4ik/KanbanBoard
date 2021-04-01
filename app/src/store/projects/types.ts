import { Color } from '@material-ui/lab/Alert';

export const PROJECT_LOADING_REQUEST = 'PROJECT_LOADING_REQUEST';
export const PROJECT_LOADING_SUCCESS = 'PROJECT_LOADING_SUCCESS';
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export type ProjectsRows = Array<{ id: string; name: string; key: string; lead: string }>;

export interface ProjectInitialState {
  rows: ProjectsRows;
  loading: boolean;
  errors: Array<{ msg: string; severity: Color }>;
}

export type ProjectsActionTypes = {
  type: string;
  payload: ProjectInitialState;
};
