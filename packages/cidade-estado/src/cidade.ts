import { useEffect, useState } from "react";

import api from "./api";
import { ICidade, ICidadeWithPicker } from "./types";

const getCidades = (uf: string): Promise<ICidadeWithPicker[]> =>
	api
		.get<ICidade[]>(`/estados/${uf}/municipios?orderBy=nome`)
		.then(({ data }) =>
			data.map(({ id, nome }) => ({
				id,
				nome,
				label: nome,
				value: id.toString()
			}))
		);

const useCidades = (uf: string) => {
	const [cidades, setCidades] = useState<ICidadeWithPicker[]>();
	const [hasError, setHasError] = useState(false);
	const [loading, setIsLoading] = useState(false);

	const handleGetCidades = (uf: string) => {
		setIsLoading(true);
		setHasError(false);
		getCidades(uf)
			.then(setCidades)
			.catch(() => {
				setHasError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	useEffect(() => {
		uf && handleGetCidades(uf);
	}, [uf]);

	return { cidades, fetch: handleGetCidades, loading, error: hasError };
};

export default getCidades;
export { getCidades, useCidades };
