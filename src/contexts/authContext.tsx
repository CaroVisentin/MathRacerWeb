import { createContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import type { AuthUser } from '../models/domain/authTypes';
import { authService } from '../services/auth/authService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Ya no es necesario validar con el backend aquí
        setUser({
          id: 0, // Si tienes el id del backend, puedes actualizarlo aquí
          email: firebaseUser.email || '',
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          uid: firebaseUser?.uid || firebaseUser.uid,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const userData = await authService.loginWithEmail(email, password);
      setUser(userData);
      console.log('Respuesta del backend en login manual:', userData);
    } catch (err) {
      setError('Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      console.log('Register handler ejecutado', { email, password, username });
      setError(null);
      setLoading(true);
      const userData = await authService.registerWithEmail(email, password, username);
      setUser(userData);
      console.log('Respuesta del backend en registro manual:', userData);
    } catch (err) {
      setError('Error al registrar usuario');
      console.error('Error en register:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      const userData = await authService.loginWithGoogle();
      setUser(userData);
      console.log("Usuario logueado con google: ", userData)
    } catch (err) {
      setError('Error al iniciar sesión con Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      console.log("Usuario cerró sesión")
    } catch (err) {
      setError('Error al cerrar sesión');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Mover useAuth a un archivo separado
export { AuthContext, AuthProvider };