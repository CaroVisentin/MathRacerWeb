import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading, player } = useAuth();
    const location = useLocation();

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

    // Si el usuario no ha completado el tutorial (lastlevelId === 0) y no está ya en la página del tutorial
    if (player && player.lastlevelId === 0 && location.pathname !== '/tutorial') {
        console.log('Usuario nuevo detectado, redirigiendo al tutorial...');
        return <Navigate to="/tutorial" replace />;
    }

    return <>{children}</>;
};