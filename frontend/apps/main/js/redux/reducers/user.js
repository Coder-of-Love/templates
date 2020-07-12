import { fromJS } from 'immutable';

const setUser = (state, user) => fromJS(user);

const updateUser = (state, payload) => state.merge(payload);

export default (state = null, action) => {
	switch(action.type) {
		case 'SET_USER':
			return setUser(state, action.payload);
		case 'UPDATE_USER':
			return updateUser(state, action.payload);
		case 'REMOVE_USER':
			return null;
		default:
			return state;
	}
};
