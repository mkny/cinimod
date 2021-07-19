import yup from "../index";

const validZipCode = "38400-468";

describe("zipCode-related tests", () => {
	it("should be able to test zipCode on schema", async () => {
		const schema = yup.object({
			zipCode: yup.string().zipCode()
		});

		expect(
			schema.isValid({
				zipCode: `${validZipCode}5`
			})
		).resolves.toBeFalsy();
		expect(
			schema.isValid({
				zipCode: validZipCode
			})
		).resolves.toBeTruthy();
	});
});
