import { api } from "../network/api"; // o donde tengas tu instancia de axios
import type { AxiosError } from "axios";
import type { PlayerProfileDto } from "../../models/domain/profile/playerProfileDto";

class ProfileService {
  async getProfileByEmail(email: string): Promise<PlayerProfileDto> {
    try {
      const response = await api.get(`/player/email/${email}`);
      return response.data;
    } catch (error: unknown) {
      console.error("Error al obtener el perfil:", error);
      throw new Error(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          "No se pudo obtener el perfil del jugador"
      );
    }
  }
}

export const profileService = new ProfileService();
