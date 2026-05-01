import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const RotaProtegida = () => {
    const { autenticado, carregando } = useAuth();

    if (carregando) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7eff8]">
                <p className="text-sm font-medium text-[#6b2e74]">Verificando sessão...</p>
            </div>
        );
    }

    return autenticado ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
