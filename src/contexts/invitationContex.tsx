import { createContext,useContext,useState, useEffect} from "react";
 import type {ReactNode, Dispatch, SetStateAction } from "react";
import { gameInvitationService } from "../services/game/gameInvitationService";

type InvitationContextType = {
    hasInvitation: boolean;
    setHasInvitation: Dispatch<SetStateAction<boolean>>;
    checkInvitations: () => Promise<void>;
};

export const InvitationContext = createContext<InvitationContextType>({
    hasInvitation: false,
    // no-op default implementation matching the Dispatch signature
    setHasInvitation: (_value: SetStateAction<boolean>) => { },
    checkInvitations: async () => { },
});

export const useInvitation = () => useContext(InvitationContext);

export const InvitationProvider=({ children }: { children: ReactNode }) => {

    const [hasInvitation, setHasInvitation] = useState<boolean>(false);

    const checkInvitations = async () => {
        try {
            const invitations = await gameInvitationService.getInvitations();
            setHasInvitation(invitations.length > 0);
        } catch (error) {
            console.error('Error al verificar invitaciones:', error);
            setHasInvitation(false);
        }
    };

    // Verificar invitaciones al montar el provider
    useEffect(() => {
        checkInvitations();
        
        // Verificar cada 30 segundos si hay nuevas invitaciones
        const interval = setInterval(checkInvitations, 30000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <InvitationContext.Provider value={{ hasInvitation, setHasInvitation, checkInvitations }}>
            {children}
        </InvitationContext.Provider>
    );
}