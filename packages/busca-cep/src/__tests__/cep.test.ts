import { act, renderHook } from "@testing-library/react-hooks";

import { getCep } from "../index";
import { useCep } from "../cep";

const cepInfo = {
	zipCode: "38400340",
	response: {
		bairro: "Martins",
		cep: "38400-340",
		complemento: "",
		ddd: "34",
		gia: "",
		ibge: "3170206",
		localidade: "Uberlândia",
		logradouro: "Rua José Andraus",
		siafi: "5403",
		uf: "MG"
	}
};

describe("cep tests", () => {
	it("should be able to get data from ws", async () => {
		const cep = await getCep(cepInfo.zipCode);
		expect(cep).toStrictEqual(cepInfo.response);
	});
	it("should be able to get data from ws, using hook", async () => {
		const { result, waitForNextUpdate } = renderHook(() => useCep());

		act(() => {
			result.current.fetch(cepInfo.zipCode);
		});

		await waitForNextUpdate();

		expect(result.current.cep).toStrictEqual(cepInfo.response);
	});
});
