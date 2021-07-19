import { act, renderHook } from "@testing-library/react-hooks";

import { getCidades, useCidades } from "../index";

const AC_STATE_LENGTH = 22;
const AP_STATE_LENGTH = 16;
const AC_STATE_CITY_0 = {
	id: 1200013,
	label: "Acrelândia",
	nome: "Acrelândia",
	value: "1200013"
};

describe("cidades tests", () => {
	it("should be able to get list of cidades", async () => {
		expect.assertions(2);

		const cidades = await getCidades("AC");

		expect(cidades).toHaveLength(AC_STATE_LENGTH);
		expect(cidades?.[0]).toStrictEqual(AC_STATE_CITY_0);
	});
	it("should be able to get list of cidades, using the hook", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useCidades("AC")
		);

		await waitForNextUpdate();

		expect(result.current.cidades).toHaveLength(AC_STATE_LENGTH);

		act(() => {
			result.current.fetch("AP");
		});

		await waitForNextUpdate();

		expect(result.current.cidades).toHaveLength(AP_STATE_LENGTH);
	});
});
