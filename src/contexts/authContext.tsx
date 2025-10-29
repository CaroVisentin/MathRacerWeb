import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebase/firebaseConfig";
import type { PlayerProfile } from "../models/ui/playerProfile";
import { sessionService } from "../services/game/sessionAPI";

type AuthContextType = {
    firebaseUser: User | null;
    playerProfile: PlayerProfile | null;
    singOut: () => Promise<void>;
};
export const AuthContext = createContext<AuthContextType>({
    firebaseUser: null,
    playerProfile: null,
    singOut: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setFirebaseUser(user);
            if (user) {
                try {
                    const profile = await sessionService.getPlayerProfileByUid(user.uid);
                    setPlayerProfile(profile);
                } catch (error) {
                    console.error("Error fetching player profile:", error);
                }
            } else {
                setPlayerProfile(null);
            }   
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ firebaseUser,playerProfile, singOut: async () => { await signOut(auth); } }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () =>  useContext(AuthContext);


