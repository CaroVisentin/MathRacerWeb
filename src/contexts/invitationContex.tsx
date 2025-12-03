import { createContext,useContext,useState} from "react";
 import type {ReactNode, Dispatch, SetStateAction } from "react";
import { gameInvitationService } from "../services/game/gameInvitationService";

type InvitationContextType = {
    hasInvitation: boolean;
    invitationCount: number;
    setHasInvitation: Dispatch<SetStateAction<boolean>>;
    setInvitationCount: Dispatch<SetStateAction<number>>;
    checkInvitations: () => Promise<void>;
};

const InvitationContext = createContext<InvitationContextType>({
    hasInvitation: false,
    invitationCount: 0,
    // no-op default implementation matching the Dispatch signature
    setHasInvitation: () => { },
    setInvitationCount: () => { },
    checkInvitations: async () => { },
});

// eslint-disable-next-line react-refresh/only-export-components
export const useInvitation = () => useContext(InvitationContext);

export const InvitationProvider=({ children }: { children: ReactNode }) => {

    const [hasInvitation, setHasInvitation] = useState<boolean>(false);
    const [invitationCount, setInvitationCount] = useState<number>(0);

    const checkInvitations = async () => {
        try {
            const invitations = await gameInvitationService.getInvitations();
            const count = invitations.length;
            setHasInvitation(count > 0);
            setInvitationCount(count);
        } catch (error) {
            console.error('Error al verificar invitaciones:', error);
            setHasInvitation(false);
            setInvitationCount(0);
        }
    };

    return (
        <InvitationContext.Provider value={{ hasInvitation, invitationCount, setHasInvitation, setInvitationCount, checkInvitations }}>
            {children}
        </InvitationContext.Provider>
    );
}