import { createContext,useContext,useState} from "react";
 import type {ReactNode, Dispatch, SetStateAction } from "react";
import { gameInvitationService } from "../services/game/gameInvitationService";

type InvitationContextType = {
    hasInvitation: boolean;
    setHasInvitation: Dispatch<SetStateAction<boolean>>;
    checkInvitations: () => Promise<void>;
};

const InvitationContext = createContext<InvitationContextType>({
    hasInvitation: false,
    // no-op default implementation matching the Dispatch signature
    setHasInvitation: () => { },
    checkInvitations: async () => { },
});

// eslint-disable-next-line react-refresh/only-export-components
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

    return (
        <InvitationContext.Provider value={{ hasInvitation, setHasInvitation, checkInvitations }}>
            {children}
        </InvitationContext.Provider>
    );
}