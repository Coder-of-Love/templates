import { combineReducers } from 'redux-immutable';

import user from './user';

export const combinedReducers =  combineReducers({
	user,
});
