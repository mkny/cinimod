import _set from "lodash.set";
import _map from "lodash.map";

import { ActionTypes, ReducerActions, ReducerState } from "./types";

const initialState: ReducerState = {};

const setValueAction = (key: string | Record<string, any>, value?: any) => ({
	type: ActionTypes.SET_VALUE,
	payload: { key, value }
});

const setValue = (state: ReducerState, payload?: any) => {
	const newState = { ...state };
	if (typeof payload.key !== "string") {
		_map(payload.key, (val, key) => {
			_set(newState, key, val);
		});
	} else {
		_set(newState, payload.key, payload.value);
	}

	return newState;
};

const reducer = (state: ReducerState, action: ReducerActions) => {
	const states = {
		[ActionTypes.SET_VALUE]: setValue
	};

	return states[action.type]?.(state, action.payload) ?? state;
};

export default reducer;
export { initialState, setValueAction };
