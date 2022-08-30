import { useEffect, useState } from "react";

import api from "./api";
import { IEstado, IEstadoWithPicker } from "./types";

const getEstados = (): Promise<IEstadoWithPicker[]> =>
	api
		.get<IEstado[]>("/estados?orderBy=nome")
		.then(({ data }) =>
			data.map(item => ({ ...item, value: item.sigla, label: item.nome }))
		);

const useEstados = (execute = true) => {
	const [estados, setEstados] = useState<IEstadoWithPicker[]>([]);
	const [hasError, setHasError] = useState(false);
	const [loading, setIsLoading] = useState(false);

	const handleGetEstados = () => {
		setIsLoading(true);
		setHasError(false);
		getEstados()
			.then(setEstados)
			.catch(() => {
				setHasError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		execute && handleGetEstados();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { estados, fetch: handleGetEstados, loading, error: hasError };
};

export default getEstados;
export { getEstados, useEstados };
