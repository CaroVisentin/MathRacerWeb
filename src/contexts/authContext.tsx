import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebase/firebaseConfig";
import type { PlayerProfile } from "../models/ui/playerProfile";
import { sessionService } from "../services/game/sessionAPI";

type AuthContextType = {
    firebaseUser: User | null;
    playerProfile: PlayerProfile | null;
    signOut: () => Promise<void>;
};
export const AuthContext = createContext<AuthContextType>({
    firebaseUser: null,
    playerProfile: null,
    signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setFirebaseUser(user);
            if (user) {
                try {
                    const profile = await sessionService.obtenerPerfil(user.uid);
                    setPlayerProfile(profile);
                } catch (error) {
                    //sacar el console
                    console.error("Error para obtener el perfil del jugador:", error);
                }
            } else {
                setPlayerProfile(null);
            }   
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async() =>{
        await signOut(auth);
        setFirebaseUser(null);
        setPlayerProfile(null);
    }

    return (
        <AuthContext.Provider value={{ firebaseUser,playerProfile, signOut: handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () =>  useContext(AuthContext);


