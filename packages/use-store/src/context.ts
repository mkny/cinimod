import { createContext, useContext } from "react";

import { IContext } from "./types";

const storeContext = createContext<IContext>({
	state: {},
	set: () => void 0,
	get: (): any => void 0,
	dispatch: () => {}
});

const { Provider: StoreProvider } = storeContext;

const useStoreContext = () => useContext(storeContext);

export default storeContext;
export { StoreProvider, useStoreContext };
