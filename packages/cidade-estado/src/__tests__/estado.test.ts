import { act, cleanup, renderHook } from "@testing-library/react-hooks";

import { getEstados, useEstados } from "../index";

const stateLength = 27;
const timeout = 5000;

describe("estados tests", () => {
	afterEach(cleanup);
	it("should be able to get list of estados", async () => {
		expect.assertions(2);

		const estados = await getEstados();

		expect(estados).toHaveLength(stateLength);
		expect(estados).toStrictEqual(
			expect.arrayContaining([
				expect.objectContaining({
					label: "Acre",
					nome: "Acre",
					sigla: "AC",
					value: "AC"
				})
			])
		);
	});
	it(
		"should be able to get list of estados, using the hook",
		async () => {
			const { result, waitForNextUpdate } = renderHook(() =>
				useEstados()
			);

			await waitForNextUpdate({ timeout });
			const { estados } = result.current;

			expect(estados).toHaveLength(stateLength);
		},
		timeout
	);
	it(
		"should be able to get list of estados, using hook, triggered by button",
		async () => {
			const { result, waitForNextUpdate } = renderHook(() =>
				useEstados(false)
			);

			const { estados, fetch } = result.current;

			expect(estados).toHaveLength(0);

			act(() => {
				fetch();
			});

			await waitForNextUpdate({ timeout });

			expect(result.current.estados).toHaveLength(stateLength);
		},
		timeout
	);
});
