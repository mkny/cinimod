interface Option {
	label: string;
	value: any;
}

interface IRegiao {
	id: number;
	nome: string;
	sigla: string;
}

export interface IEstado {
	id: number;
	nome: string;
	regiao: IRegiao;
	sigla: string;
}

export interface ICidade {
	id: number;
	nome: string;
}

export type ICidadeWithPicker = ICidade & Option;

export type IEstadoWithPicker = IEstado & Option;
