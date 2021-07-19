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
	const [estados, setEstados] = useState<IEstado[]>([]);

	const handleGetEstados = () => {
		getEstados().then(setEstados);
	};

	useEffect(() => {
		execute && handleGetEstados();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { estados, fetch: handleGetEstados };
};

export default getEstados;
export { getEstados, useEstados };
