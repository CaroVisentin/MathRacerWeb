import type { ChestResponseDto } from "../../models/domain/chest/chestResponseDto";
import { manageError } from "../../shared/utils/manageErrors";
import { api, API_URLS } from "../network/api";

export const tutorialService = {
  completeTutorial: async (): Promise<ChestResponseDto> => {
    try {
      const response = await api.post<ChestResponseDto>(
        `${API_URLS.chest}/complete-tutorial`
      );
      return response.data;
    } catch (error) {
      manageError(error);
      throw error;
    }
  },
};
