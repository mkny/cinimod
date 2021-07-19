const isPhone = (value?: string) => {
	if (!value) {
		return true;
	}

	const size = value.length;

	if (size === 10 || size === 11) {
		return true;
	}

	return false;
};

const isPhoneValid = (value?: string) => isPhone(value);

function phoneValid(this: any, message: string = "form.phoneInvalid") {
	return this.test("phone", message, isPhoneValid);
}

export default phoneValid;
export { isPhoneValid };
