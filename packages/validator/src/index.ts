import * as Yup from "yup";

import { CustomStringSchemaConstructor } from "./types";
import { cpf, cnpj, phone, zipCode } from "./validators";

const yup = {
	...Yup,
	string: Yup.string as CustomStringSchemaConstructor
};

yup.addMethod(yup.string, "cpf", cpf);
yup.addMethod(yup.string, "cnpj", cnpj);
yup.addMethod(yup.string, "zipCode", zipCode);
yup.addMethod(yup.string, "phone", phone);

export default yup;
export { yup };
