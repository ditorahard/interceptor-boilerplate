import update from 'immutability-helper';
import { createAction, createReducer } from 'redux-act';

const defaultState = {
	pending_request: [],
};

const [
	add,
	remove
] = [
	'ADD_PENDING_REQUEST',
	'REMOVE_PENDING_REQUEST'
].map(createAction);

const reducer = createReducer({
	[add]: (state, url) => {
		return update(state, {
			pending_request: {$push: [url]}
		});
	},
	[remove]: (state, url) => {
		const {
			pending_request
		} = state;
		const index = pending_request.findIndex(iurl => iurl === url);
		return update(state, {
			pending_request: {$splice: [[index, 1]]}
		});
	}
}, defaultState);

export {
	add,
	remove
};

export default reducer;