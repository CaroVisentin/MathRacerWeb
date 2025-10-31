import { createContext, useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/network/firebase';
import type { AuthUser } from '../models/domain/authTypes';
import { authService } from '../services/auth/authService';
import { setAuthToken } from '../services/network/api';
import type { Player } from '../models/ui/player';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  //agrego
  player: Player |null;
  setPlayer: (player:Player | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //agrego
  const[player,setPlayerState] = useState<Player |null>(null);
  const setPlayer = (updatedPlayer: Player |null) => {
  setPlayerState(updatedPlayer); 
};


  // Mantener token actualizado en Axios
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(); // token válido y renovado
        setAuthToken(token);

        setUser({
          id: 0, // actualizalo si tenés el id del backend
          email: firebaseUser.email || "",
          username: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
        });
      } else {
        setAuthToken(null);
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
      //agregue
      setPlayer(userData);
    } catch (err) {
      setError('Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      setError(null);
      setLoading(true);
      const userData = await authService.registerWithEmail(email, password, username);
      setUser(userData);
      setPlayer(userData);
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
      setPlayer(userData);
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
      //agreuge
      setPlayer(null);
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
        //agrego
        player,
        setPlayer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Mover useAuth a un archivo separado
export { AuthContext, AuthProvider };