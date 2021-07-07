type StatusTypes = "pending" | "idle" | "error" | "success";

export enum ActionTypes {
	SET_VALUE = "SET_VALUE",
	SET_ERROR = "SET_ERROR"
}

export interface ReducerActions {
	type: keyof typeof ActionTypes;
	payload?: any;
}

export interface ReducerState<T = any> {
	value?: T;
	error?: any;
	status: StatusTypes;
}
