import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

export type RootThunkAction = ThunkAction<void, RootState, null, Action<string>>;
