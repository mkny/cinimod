import { act, renderHook } from "@testing-library/react-hooks";

import { getEstados, useEstados } from "../index";

describe("estados tests", () => {
	it("should be able to get list of estados", async () => {
		expect.assertions(2);

		const estados = await getEstados();

		expect(estados).toHaveLength(27);
		expect(estados?.[0]).toStrictEqual({
			id: 12,
			label: "Acre",
			nome: "Acre",
			regiao: {
				id: 1,
				nome: "Norte",
				sigla: "N"
			},
			sigla: "AC",
			value: "AC"
		});
	});
	it("should be able to get list of estados, using the hook", async () => {
		const { result, waitForNextUpdate } = renderHook(() => useEstados());

		await waitForNextUpdate();
		const { estados } = result.current;

		expect(estados).toHaveLength(27);
	}, 5000);
	it("should be able to get list of estados, using hook, triggered by button", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useEstados(false)
		);

		const { estados, fetch } = result.current;

		expect(estados).toHaveLength(0);

		act(() => {
			fetch();
		});

		await waitForNextUpdate();

		expect(result.current.estados).toHaveLength(27);
	});
});
