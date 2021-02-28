import { combineReducers } from 'redux';

import kanban from './kanban';

const rootReducer = combineReducers({
  kanban: kanban.reducer,
});

export default rootReducer;