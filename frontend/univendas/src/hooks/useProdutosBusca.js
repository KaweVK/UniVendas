import { useEffect, useState } from 'react';
import { buscarProdutos } from '../services/produtosService.js';

const DEBOUNCE_MS = 350;

export const useProdutosBusca = (filtros) => {
    const [content, setContent] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setErro(null);

        const timeoutId = setTimeout(async () => {
            try {
                const data = await buscarProdutos(filtros, controller.signal);
                setContent(data.content || []);
                setTotalPages(data.totalPages || 0);
                setTotalElements(data.totalElements || 0);
            } catch (error) {
                if (error.name !== 'CanceledError') {
                    setErro(error);
                    setContent([]);
                }
            } finally {
                setLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [JSON.stringify(filtros)]);

    return { content, totalPages, totalElements, loading, erro };
};
