import { Reducer, useCallback, useEffect, useReducer } from "react";

import reducer, * as actions from "./reducer";
import { ReducerActions, ReducerState } from "./types";

function useAsync<TData = any>(
	asyncFunction: (params?: any) => Promise<TData>,
	immediate = false,
	asyncTimeout = 300
) {
	const [{ value, error, status }, dispatch] = useReducer<
		Reducer<ReducerState<TData>, ReducerActions>
	>(reducer, actions.initialState);

	// The execute function wraps asyncFunction and
	// handles setting state for pending, value, and error.
	// useCallback ensures the below useEffect is not called
	// on every render, but only if asyncFunction changes.
	const execute = useCallback(
		(params?: any, onError: (reason: any) => void = () => {}) => {
			dispatch(actions.setValue(undefined));
			return asyncFunction(params)
				.then(response => {
					// Empty response causes infinite loop
					dispatch(actions.setValue(response ?? ""));
					return response;
				})
				.catch(error => {
					dispatch(actions.setError(error));
					onError(error);
				});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[asyncFunction]
	);

	// Call execute if we want to fire it right away.
	// Otherwise execute can be called later, such as
	// in an onClick handler.
	useEffect(() => {
		if (immediate) {
			execute();
		}
	}, [execute, immediate]);

	const ret = { execute, status, value, error };

	if (status === "pending") {
		throw new Promise(resolve => {
			setTimeout(resolve, asyncTimeout);
		});
	}

	return ret;
}

export default useAsync;
export { useAsync };
