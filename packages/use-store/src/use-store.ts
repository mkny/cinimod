import _reduce from "lodash.reduce";
import _get from "lodash.get";

import { IContext } from "./types";
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

const useStore = (initialPlacement: string = "") => {
	const { state, set, get } = useStoreContext();

	const setPlaced: IContext["set"] = (key, value) => {
		if(!value && initialPlacement){
			set(initialPlacement, key);
		} else {
			set(keyOrMapKey(key, initialPlacement), value);
		}
	};

	const statePlaced = initialPlacement
		? _get(state, initialPlacement)
		: state;

	return { state: statePlaced, set: setPlaced, get };
};

export default useStore;
export { useStore };
