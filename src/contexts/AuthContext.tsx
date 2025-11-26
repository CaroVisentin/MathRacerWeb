import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/network/firebase";
import type { AuthUser } from "../models/domain/auth/authTypes";
import { authService } from "../services/auth/authService";
import { setAuthToken } from "../services/network/api";
import type { Player, PlayerItem } from "../models/ui/player/player";

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

  type BackendPlayer = {
    id?: number;
    name?: string;
    email?: string;
    lastLevelId?: number;
    points?: number;
    coins?: number;
    background?: PlayerItem | null;
    car?: PlayerItem | null;
    character?: PlayerItem | null;
    equippedBackground?: PlayerItem | null;
    equippedCar?: PlayerItem | null;
    equippedCharacter?: PlayerItem | null;
  };

  const toUiPlayer = useCallback(
    (data: BackendPlayer): Player => ({
      id: data?.id ?? 0,
      name: data?.name ?? "",
      email: data?.email ?? "",
      lastLevelId: data?.lastLevelId ?? 0,
      points: data?.points ?? 0,
      coins: data?.coins ?? 0,
      background: data?.background ?? data?.equippedBackground ?? null,
      car: data?.car ?? data?.equippedCar ?? null,
      character: data?.character ?? data?.equippedCharacter ?? null,
      equippedBackground: data?.equippedBackground ?? data?.background ?? null,
      equippedCar: data?.equippedCar ?? data?.car ?? null,
      equippedCharacter: data?.equippedCharacter ?? data?.character ?? null,
    }),
    []
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Obtener token fresco de Firebase
          const token = await firebaseUser.getIdToken(true); // true = force refresh
          setAuthToken(token);

          // Esperar explícitamente a que el token se configure
          await new Promise((resolve) => setTimeout(resolve, 100));

          setUser({
            id: 0,
            email: firebaseUser.email || "",
            username:
              firebaseUser.displayName ||
              firebaseUser.email?.split("@")[0] ||
              "",
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
  }, [toUiPlayer]);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const backendData: BackendPlayer = await authService.loginWithEmail(
        email,
        password
      );
      setUser({
        id: backendData.id ?? 0,
        username: backendData.name ?? "",
        email: backendData.email ?? email,
      });
      const uiPlayer = toUiPlayer(backendData);
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
      const backendData: BackendPlayer = await authService.registerWithEmail(
        email,
        password,
        username
      );
      setUser({
        id: backendData.id ?? 0,
        username: backendData.name ?? username,
        email: backendData.email ?? email,
      });
      const uiPlayer = toUiPlayer(backendData);
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
      const backendData: BackendPlayer = await authService.loginWithGoogle();
      setUser({
        id: backendData.id ?? 0,
        username: backendData.name ?? "",
        email: backendData.email ?? "",
      });
      const uiPlayer = toUiPlayer(backendData);
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
