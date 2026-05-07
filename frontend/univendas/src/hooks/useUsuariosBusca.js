import { useEffect, useState } from 'react';
import { buscarUsuarios } from '../services/usuariosService.js';

export const useUsuariosBusca = (filtros) => {
    const [content, setContent] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setCarregando(true);
        setErro(null);

        buscarUsuarios(filtros, controller.signal)
            .then((data) => {
                setContent(data.content || []);
                setTotalPages(data.totalPages || 0);
                setTotalElements(data.totalElements || 0);
            })
            .catch((e) => {
                if (e.name !== 'CanceledError') {
                    setErro(e);
                    setContent([]);
                }
            })
            .finally(() => setCarregando(false));

        return () => controller.abort();
    }, [JSON.stringify(filtros)]);

    return { content, totalPages, totalElements, carregando, erro };
};
