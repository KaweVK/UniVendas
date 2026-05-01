import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { eventBus } from '../utils/eventBus';
import { ENDPOINTS } from '../services/endpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    // Verifica sessão ativa ao iniciar a aplicação
    useEffect(() => {
        api.get(ENDPOINTS.ME)
            .then(r => setUsuario(r.data))
            .catch(() => setUsuario(null))
            .finally(() => setCarregando(false));
    }, []);

    // Escuta evento de sessão expirada disparado pelo interceptor do axios
    useEffect(() => {
        const unsubscribe = eventBus.on('session-expired', () => {
            setUsuario(null);
            navigate('/auth/login');
        });
        return unsubscribe;
    }, [navigate]);

    const login = async (email, senha) => {
        await api.post(ENDPOINTS.LOGIN, { email, password: senha });
        const resposta = await api.get(ENDPOINTS.ME);
        setUsuario(resposta.data);
    };

    const logout = async () => {
        try {
            await api.post(ENDPOINTS.LOGOUT);
        } finally {
            setUsuario(null);
            navigate('/auth/login');
        }
    };

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
