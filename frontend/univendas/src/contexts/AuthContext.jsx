import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventBus } from '../utils/eventBus';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        authService.obterSessao(controller.signal)
            .then((data) => setUsuario(data))
            .catch((erro) => {
                if (erro.name === 'AbortError' || erro.code === 'ERR_CANCELED') return;
                setUsuario(null)
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCarregando(false);
                }
            });
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const unsubscribe = eventBus.on('session-expired', () => {
            setUsuario(null);
            navigate('/auth/login');
        });
        return unsubscribe;
    }, [navigate]);

    const login = async (email, senha) => {
        await authService.login(email, senha);
        const dados = await authService.obterSessao();
        setUsuario(dados);
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUsuario(null);
            navigate('/auth/login');
        }
    };

    if (carregando) {
        return <div>Carregando sessão...</div>;
    }
    
    return (
        <AuthContext.Provider value={{ usuario, carregando, autenticado: !!usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
    return ctx;
};
