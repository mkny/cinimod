import React from "react";
import { render } from "@testing-library/react-native";

import Box from "../Box";

describe("<Box /> test suite", () => {
	test("should be able to have sizing", () => {
		const defaultProps = {
			testID: "hello123"
		};
		const { queryByTestId } = render(<Box {...defaultProps} size={30} />);

		const tid = queryByTestId(defaultProps.testID);

		expect(tid).toHaveStyle({ width: 30 });
		expect(tid).toHaveProp("size", 30);
	});
});
