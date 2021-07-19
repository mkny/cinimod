import { cpf } from "cpf-cnpj-validator";

const isCpfValid = (value: string) => cpf.isValid(value);

function cpfValid(this: any, message?: string) {
	return this.test("cpf", message, isCpfValid);
}

export default cpfValid;
export { isCpfValid };
