import { createContext, useContext } from "react";

import { IContext } from "./types";

export const MISSING_CONTEXT_ERROR =
	"Couldn't find a store context. Have you wrapped your app with 'StoreProvider'?";
const storeContext = createContext<IContext>({
	get state(): any {
		throw new Error(MISSING_CONTEXT_ERROR);
	},
	get set(): any {
		throw new Error(MISSING_CONTEXT_ERROR);
	},
	get get(): any {
		throw new Error(MISSING_CONTEXT_ERROR);
	},
	get dispatch(): any {
		throw new Error(MISSING_CONTEXT_ERROR);
	}
});

const { Provider: StoreProvider } = storeContext;

const useStoreContext = () => useContext(storeContext);

export default storeContext;
export { StoreProvider, useStoreContext };
