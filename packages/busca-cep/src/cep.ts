import axios from "axios";
import { useState, useCallback } from "react";

import { ICep } from "./types";

const getCep = (str: string): Promise<ICep> =>
	axios.get(`https://viacep.com.br/ws/${str}/json/`).then(({ data }) => data);

const useCep = () => {
	const [cep, setCep] = useState<ICep | null>(null);

	const handleLoadCep = useCallback((cep: string) => {
		cep.length >= 8 && getCep(cep).then(setCep);
	}, []);

	return { cep, fetch: handleLoadCep };
};

// const formatCep = (zipCode: string) =>
// 	filterNotNums(zipCode).replace(/(\d{5})(\d{3})/, "$1-$2");

export default getCep;
export {
	getCep,
	useCep
	//
};
