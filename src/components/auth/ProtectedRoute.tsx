import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading, player } = useAuth();
    //const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si player aún no se cargó, mostrar spinner
    if (!player) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    // Nuevo criterio: si NO tiene los 3 productos básicos (car, background, character) debe hacer el tutorial
    const lacksBasics = !player.car || !player.background || !player.character;
    if (lacksBasics && location.pathname !== '/tutorial') {
        return <Navigate to="/tutorial" replace />;
    }

    return <>{children}</>;
};