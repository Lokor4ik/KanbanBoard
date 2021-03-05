import { combineReducers } from 'redux';

import kanban from './kanban';
import auth from './auth';

const rootReducer = combineReducers({
  kanban: kanban.reducer,
  auth: auth.reducer,
});

export default rootReducer;
