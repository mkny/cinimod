export interface IContext {
	set: (key: string | Record<string, any>, value?: any) => void;
	get: <T = any>(key?: string | string[], defaultValue?: Partial<T>) => T;
	state: Record<string, any>;
	rootState?: Record<string, any>;
	dispatch: Function;
}

export type IUseStore = <T = any>(initial: string) => Omit<IContext, "state"> & { state: T };

export enum ActionTypes {
	SET_VALUE = "SET_VALUE"
}

export interface ReducerState {}

export interface ReducerActions {
	type: keyof typeof ActionTypes;
	payload?: any;
}

export interface ProviderProps {
	initialState?: ReducerState;
}
