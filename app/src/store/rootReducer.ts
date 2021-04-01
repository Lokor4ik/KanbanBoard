import { combineReducers } from 'redux';

import kanban from './kanban';
import auth from './auth';
import projects from './projects';

const rootReducer = combineReducers({
  kanban: kanban.reducer,
  auth: auth.reducer,
  projects: projects.reducer,
});

export default rootReducer;
