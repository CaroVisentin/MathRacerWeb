import { createContext, useState, useEffect, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/network/firebase";
import type { AuthUser } from "../models/domain/auth/authTypes";
import { authService } from "../services/auth/authService";
import { setAuthToken } from "../services/network/api";
import type { Player } from "../models/ui/player/player";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  player: Player | null;
  setPlayer: (player: Player | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [player, setPlayerState] = useState<Player | null>(null);
  const setPlayer = (updatedPlayer: Player | null) => {
    setPlayerState(updatedPlayer);
  };

  const toUiPlayer = (data: Player): Player => ({
    id: data?.id ?? 0,
    name: data?.name ?? "",
    email: data?.email ?? "",
    lastlevelId: data?.lastlevelId ?? data?.lastlevelId ?? 1,
    points: data?.points ?? 0,
    coins: data?.coins ?? 0,
    background: data?.background || null,
    car: data?.car || null,
    character: data?.character || null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Obtener token fresco de Firebase
          const token = await firebaseUser.getIdToken(true); // true = force refresh
          setAuthToken(token);

          // Esperar explícitamente a que el token se configure
          await new Promise(resolve => setTimeout(resolve, 100));

          setUser({
            id: 0,
            email: firebaseUser.email || "",
            username:
              firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
          });

          try {
            const stored = localStorage.getItem("player");
            if (stored) {
              const parsed = JSON.parse(stored);
              setPlayer(toUiPlayer(parsed));
            }
          } catch (e) {
            console.warn("No se pudo restaurar el player del storage:", e);
          }
        } catch (error) {
          console.error("Error al configurar autenticación:", error);
          setAuthToken(null);
          setUser(null);
          setPlayer(null);
        }
      } else {
        setAuthToken(null);
        setUser(null);
        setPlayer(null);
        try {
          localStorage.removeItem("player");
        } catch (e) {
          console.warn("No se pudo eliminar player del storage", e);
        }
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
      const uiPlayer = toUiPlayer(userData);
      setPlayer(uiPlayer);
      try {
        localStorage.setItem("player", JSON.stringify(uiPlayer));
      } catch (e) {
        console.warn("No se pudo guardar el player en el storage:", e);
      }
    } catch (err) {
      setError("Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      setError(null);
      setLoading(true);
      const userData = await authService.registerWithEmail(
        email,
        password,
        username
      );
      setUser(userData);
      const uiPlayer = toUiPlayer(userData);
      setPlayer(uiPlayer);
      try {
        localStorage.setItem("player", JSON.stringify(uiPlayer));
      } catch (e) {
        console.warn("No se pudo guardar en el storage:", e);
      }
    } catch (err) {
      setError("Error al registrar usuario");

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
      const uiPlayer = toUiPlayer(userData);
      setPlayer(uiPlayer);
      try {
        localStorage.setItem("player", JSON.stringify(uiPlayer));
      } catch (e) {
        console.warn("No se pudo guardar el player en el storage:", e);
      }
    } catch (err) {
      setError("Error al iniciar sesión con Google");
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
      try {
        localStorage.removeItem("player");
      } catch (e) {
        console.warn("No se pudo eliminar el player del storage:", e);
      }
    } catch (err) {
      setError("Error al cerrar sesión");
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
        player,
        setPlayer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
