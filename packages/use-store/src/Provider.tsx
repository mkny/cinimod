import React, {
	PropsWithChildren,
	ReactElement,
	useReducer,
	useCallback
} from "react";
import _get from "lodash.get";

import reducer, * as actions from "./reducer";
import { StoreProvider } from "./context";
import { IContext, ProviderProps } from "./types";

function Provider({
	children,
	initialState
}: PropsWithChildren<ProviderProps>): ReactElement {
	const [state, dispatch] = useReducer(reducer, {
		...actions.initialState,
		...initialState
	});

	const set: IContext["set"] = useCallback((key, value) => {
		dispatch(actions.setValueAction(key, value));
	}, []);

	const get: IContext["get"] = useCallback(
		(key = "", defaultValue) =>
			key ? _get(state, key, defaultValue) : state,
		[state]
	);

	return (
		<StoreProvider value={{ state, dispatch, set, get }}>
			{children}
		</StoreProvider>
	);
}

export default Provider;
export { Provider };
