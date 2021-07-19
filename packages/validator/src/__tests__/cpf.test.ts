import yup from "../index";

const validCpf = "867.360.776-05";

describe("cpf-related tests", () => {
	it("should be able to test cpf on schema", async () => {
		const schema = yup.object({
			cpf: yup.string().cpf()
		});

		expect(
			schema.isValid({
				cpf: `${validCpf}5`
			})
		).resolves.toBeFalsy();
		expect(
			schema.isValid({
				cpf: validCpf
			})
		).resolves.toBeTruthy();
	});
});
