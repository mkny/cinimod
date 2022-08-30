import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";
import {
	FlexboxProps,
	LayoutProps,
	SpaceProps,
	BorderProps,
	ColorProps
} from "styled-system";

export interface BoxProps
	extends PropsWithChildren<ViewProps>,
		FlexboxProps,
		SpaceProps,
		LayoutProps,
		BorderProps,
		ColorProps {
	// FIXME Fix this typing in further versions
	as?: any;
}
