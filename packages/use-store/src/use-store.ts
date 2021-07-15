import _reduce from "lodash.reduce";
import _get from "lodash.get";

import { IContext, IUseStore } from "./types";
import { useStoreContext } from "./context";

const keyOrMapKey = (
	key: string | Record<string, any>,
	initialPlacement?: string
) => {
	const addPlacement = (_keyHere: string) =>
		initialPlacement ? `${initialPlacement}.${_keyHere}` : _keyHere;

	if (typeof key === "string") {
		return addPlacement(key);
	} else {
		return _reduce(
			key,
			(result, value, _key) => ({
				...result,
				...{
					[addPlacement(_key)]: value
				}
			}),
			{}
		);
	}
};

const useStore: IUseStore = (initialPlacement = "") => {
	const { state: stateContext, set, get, dispatch } = useStoreContext();

	const setPlaced: IContext["set"] = (key, value) => {
		if (!value && initialPlacement) {
			set(initialPlacement, key);
		} else {
			set(keyOrMapKey(key, initialPlacement), value);
		}
	};

	const getPlaced: IContext["get"] = (key, defaultValue) => {
		const newKey = key
			? typeof key === "string"
				? `${initialPlacement ? `${initialPlacement}.` : ""}${key}`
				: [initialPlacement].concat(key)
			: initialPlacement;

		return get(newKey, defaultValue);
	};

	const state = initialPlacement
		? _get(stateContext, initialPlacement)
		: stateContext;

	const rootState = initialPlacement ? stateContext : undefined;

	return { state, set: setPlaced, get: getPlaced, rootState, dispatch };
};

export default useStore;
export { useStore };
