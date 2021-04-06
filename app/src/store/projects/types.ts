export const PROJECTS_LOADING_REQUEST = 'PROJECTS_LOADING_REQUEST';
export const PROJECTS_LOADING_SUCCESS = 'PROJECTS_LOADING_SUCCESS';
export const CREATE_NEW_PROJECT_REQUEST = 'CREATE_NEW_PROJECT_REQUEST';
export const CREATE_NEW_PROJECT_SUCCESS = 'CREATE_NEW_PROJECT_SUCCESS';
export const GET_ONE_PROJECT_REQUEST = 'GET_ONE_PROJECT_REQUEST';
export const GET_ONE_PROJECT_SUCCESS = 'GET_ONE_PROJECT_SUCCESS';
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE';

export type ProjectsRows = Array<{ id: string; name: string; key: string; lead: string }>;

export interface ProjectInitialState {
  rows: ProjectsRows;
  loading: boolean;
  creatingProject: boolean;
  currentProject: {
    id: string;
    name: string;
    key: string;
    lead: string;
  };
}

export type ParamsNewProject = {
  name: string;
  key: string;
  lead: string;
};

export type ParamsGetOneProject = {
  id: string;
};
