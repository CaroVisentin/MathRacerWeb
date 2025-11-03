import { type ChestResponseDto } from "../../models/domain/story-mode/chestResponseDto.tsx";
import { api } from "../network/api";

// Servicio para acciones del tutorial y cofres
export const tutorialService = {
    // Marca el tutorial como completado y devuelve el cofre de recompensa
    completeTutorial: async (): Promise<ChestResponseDto | null> => {
        try {
            const response = await api.post(`/chest/complete-tutorial`, {});
            return response.data as ChestResponseDto;
        } catch (error) {
            console.error("Error completing tutorial:", error);
            return null;
        }
    },

    // Abre un cofre aleatorio (para otros flujos de recompensa)
    openRandomChest: async (): Promise<ChestResponseDto | null> => {
        try {
            // Nota: ajusta la ruta si tu backend usa otra, por ejemplo "/chest/open" o similar
            const response = await api.post(`/chest/open-random`, {});
            return response.data as ChestResponseDto;
        } catch (error) {
            console.error("Error opening random chest:", error);
            return null;
        }
    },
};