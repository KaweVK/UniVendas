import { useEffect, useState } from 'react';
import { obterUsuario } from '../services/usuariosService.js';

export const useUsuario = (id) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        setCarregando(true);
        setErro(null);

        obterUsuario(id, controller.signal)
            .then((data) => setUsuario(data))
            .catch((e) => {
                if (e.name !== 'CanceledError') {
                    setErro(e);
                    setUsuario(null);
                }
            })
            .finally(() => setCarregando(false));

        return () => controller.abort();
    }, [id]);

    return { usuario, carregando, erro, setUsuario };
};
