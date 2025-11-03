import { type ChestResponseDto } from "../../models/domain/story-mode/chestResponseDto.tsx";
import { api } from "../network/api";


export const tutorialService = {
  
    completeTutorial: async (): Promise<ChestResponseDto | null> => {
        try {
            const response = await api.post(`/chest/complete-tutorial`, {});
            return response.data as ChestResponseDto;
        } catch (error) {
            console.error("Error completing tutorial:", error);
            return null;
        }
    },

    
    openRandomChest: async (): Promise<ChestResponseDto | null> => {
        try {
            
            const response = await api.post(`/chest/open-random`, {});
            return response.data as ChestResponseDto;
        } catch (error) {
            console.error("Error opening random chest:", error);
            return null;
        }
    },
};