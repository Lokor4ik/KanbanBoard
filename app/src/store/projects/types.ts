export const PROJECTS_LOADING_REQUEST = 'PROJECTS_LOADING_REQUEST';
export const PROJECTS_LOADING_SUCCESS = 'PROJECTS_LOADING_SUCCESS';
export const CREATE_NEW_PROJECT_REQUEST = 'CREATE_NEW_PROJECT_REQUEST';
export const CREATE_NEW_PROJECT_SUCCESS = 'CREATE_NEW_PROJECT_SUCCESS';
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE';

export type ProjectsRows = Array<{ id: string; name: string; key: string; lead: string }>;

export interface ProjectInitialState {
  rows: ProjectsRows;
  loading: boolean;
  creatingProject: boolean;
}

export type ParamsNewProject = {
  name: string;
  key: string;
  lead: string;
};
