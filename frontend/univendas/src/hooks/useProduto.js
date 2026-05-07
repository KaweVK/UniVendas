import { useEffect, useState } from 'react';
import { obterProduto } from '../services/produtosService.js';

export const useProduto = (id) => {
    const [produto, setProduto] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        setCarregando(true);
        setErro(null);

        obterProduto(id, controller.signal)
            .then((data) => setProduto(data))
            .catch((e) => {
                if (e.name !== 'CanceledError') {
                    setErro(e);
                    setProduto(null);
                }
            })
            .finally(() => setCarregando(false));

        return () => controller.abort();
    }, [id]);

    return { produto, carregando, erro, setProduto };
};
