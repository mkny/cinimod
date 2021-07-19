import yup from "../index";

const validCnpj = "28.677.013/8750-85";

describe("cnpj-related tests", () => {
	it("should be able to test cnpj on schema", async () => {
		const schema = yup.object({
			cnpj: yup.string().cnpj()
		});

		expect(
			schema.isValid({
				cnpj: `${validCnpj}5`
			})
		).resolves.toBeFalsy();
		expect(
			schema.isValid({
				cnpj: validCnpj
			})
		).resolves.toBeTruthy();
	});
});
