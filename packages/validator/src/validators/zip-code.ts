const zipRegex = /^\d{5}-?\d{3}$/;

const isZipCode = (value: string) => zipRegex.test(value);

function zipCode(this: any, message?: string) {
	return this.test("zipCode", message, isZipCode);
}

export default zipCode;
export { isZipCode };
