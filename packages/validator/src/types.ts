import * as Yup from "yup";

type ValidatorFn<T> = (
	message?: string | ((params: object) => string) | undefined
) => T;

// declare module "yup" {
export interface CustomStringSchemaConstructor {
	(): CustomStringSchema;
	new (): CustomStringSchema;
}
export interface CustomStringSchema extends Yup.StringSchema {
	cpf: ValidatorFn<this>;
	cnpj: ValidatorFn<this>;
	phone: ValidatorFn<this>;
	zipCode: ValidatorFn<this>;
}
// }
