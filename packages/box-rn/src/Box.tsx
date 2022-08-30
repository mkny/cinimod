import React, { ReactElement } from "react";

import { ViewStyled } from "./style";
import { BoxProps } from "./types";

function Box(props: BoxProps): ReactElement {
	return <ViewStyled {...props} />;
}

export default Box;
export { Box };
