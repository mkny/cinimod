import { ActionTypes, ReducerActions, ReducerState } from "./types";

const initialState: ReducerState = {
	status: "idle"
};

const setError = (err?: Error) => ({
	type: ActionTypes.SET_ERROR,
	error: err
});

const setValue = (value?: ReducerState["value"]) => ({
	type: ActionTypes.SET_VALUE,
	payload: {
		status: value !== undefined ? "success" : "pending",
		value,
		error: undefined
	}
});

const setValueReducer = (
	state: ReducerState,
	payload: { value?: ReducerState["value"]; status: ReducerState["status"] }
): ReducerState => ({
	...state,
	status: payload.status,
	value: payload?.value ?? undefined
});

const setErrorReducer = (state: ReducerState, payload?: any): ReducerState => ({
	...state,
	error: payload,
	value: undefined,
	status: "error"
});

function reducer(state: ReducerState, action: ReducerActions) {
	const actions = {
		[ActionTypes.SET_VALUE]: setValueReducer,
		[ActionTypes.SET_ERROR]: setErrorReducer
	};

	return actions[action.type](state, action.payload) ?? state;
}

export default reducer;
export { initialState, setError, setValue };
