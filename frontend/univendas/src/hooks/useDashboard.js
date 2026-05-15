import { useEffect, useState } from "react";
import { vendasPorCategoria, qtdRegistrosPorMes } from "../services/dashboardService.js";

export function useDashboard() {
    const [porCategoria, setPorCategoria] = useState([]);
    const [qtdRegistros, setQtdRegistros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        vendasPorCategoria(controller.signal)
            .then((r) => setPorCategoria(r))
            .catch((e) => console.error("Erro no dashboard", e))
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        qtdRegistrosPorMes(controller.signal)
            .then((r) => setQtdRegistros(r))
            .catch((e) => console.error("Erro no dashboard", e))
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    return { porCategoria, qtdRegistros, loading };
}