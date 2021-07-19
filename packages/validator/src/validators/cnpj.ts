import { cnpj } from "cpf-cnpj-validator";

const isCnpjValid = (value: string) => cnpj.isValid(value);

function cnpjValid(this: any, message?: string) {
	return this.test("cnpj", message, isCnpjValid);
}

export default cnpjValid;
export { isCnpjValid };
