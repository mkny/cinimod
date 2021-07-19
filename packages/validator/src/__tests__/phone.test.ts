import yup from "../index";

const validPhone = "34999990000";

describe("phone-related tests", () => {
	it("should be able to test phone on schema", async () => {
		const schema = yup.object({
			phone: yup.string().phone()
		});

		expect(
			schema.isValid({
				phone: `${validPhone}5`
			})
		).resolves.toBeFalsy();
		expect(
			schema.isValid({
				phone: validPhone
			})
		).resolves.toBeTruthy();
		expect(
			schema.isValid({
				phone: ""
			})
		).resolves.toBeTruthy();
	});
});
