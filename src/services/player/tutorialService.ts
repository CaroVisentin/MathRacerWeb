import type { ChestResponseDto } from "../../models/domain/chest/chestResponseDto";
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
};