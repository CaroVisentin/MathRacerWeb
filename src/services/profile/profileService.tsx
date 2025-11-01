import { api } from '../network/api'; // o donde tengas tu instancia de axios
import { type PlayerProfileDto } from '../../models/domain/playerProfileDto'; // opcional si usás TS

class ProfileService {
  async getProfileByUid(uid: string): Promise<PlayerProfileDto> {
    try {
      const response = await api.get(`/player/uid/${uid}`);
      return response.data;
    } catch (error: any) {
      console.error('Error al obtener el perfil:', error);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener el perfil del jugador'
      );
    }
  }
}

export const profileService = new ProfileService();
