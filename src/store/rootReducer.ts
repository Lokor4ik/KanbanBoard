import { combineReducers } from 'redux';
import kanban from './kanban';

export default combineReducers({
  kanban: kanban.reducer,
});
