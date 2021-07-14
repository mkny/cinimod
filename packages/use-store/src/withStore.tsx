import React from "react";

import { Provider } from "./Provider";
import { ProviderProps } from "./types";

const withStore =
	(config?: ProviderProps) =>
	(WrappedComponent: React.ComponentType<any>) =>
	(props: any) =>
		(
			<Provider {...config}>
				<WrappedComponent {...props} />
			</Provider>
		);

export default withStore;
export { withStore };
