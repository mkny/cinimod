import styled from "styled-components/native";
import { flexbox, layout, space, border, color, compose } from "styled-system";

import { BoxProps } from "./types";

const ViewStyled = styled.View<BoxProps>(
	compose(space, layout, flexbox, border, color)
);

export { ViewStyled };
