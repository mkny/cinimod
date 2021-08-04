import React, { ReactElement, PropsWithChildren } from "react";
import { ViewProps } from "react-native";
import {
	FlexboxProps,
	LayoutProps,
	SpaceProps,
	BorderProps,
	ColorProps
} from "styled-system";

import { ViewStyled } from "./style";

export interface BoxProps
	extends PropsWithChildren<ViewProps>,
		FlexboxProps,
		SpaceProps,
		LayoutProps,
		BorderProps,
		ColorProps {
	as?: React.ElementType;
}

function Box(props: BoxProps): ReactElement {
	return <ViewStyled {...props} />;
}

export default Box;
export { Box };
