import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user, loading } = useAuth();
    const location = useLocation(); // obtenemos la ruta actual

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    // si el usuario está logueado e intenta entrar a /login o /register, lo mandamos al home
    const publicPaths = ["/login", "/register"];
    if (user && publicPaths.includes(location.pathname)) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};
