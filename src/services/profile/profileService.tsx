import { api } from '../network/api'; // o donde tengas tu instancia de axios
import { type Player } from '../../models/ui/player'; // opcional si usás TS
import type { AxiosError } from 'axios';

class ProfileService {
  async getProfileByUid(uid: string): Promise<Player> {
    try {
      const response = await api.get(`/player/uid/${uid}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Error al obtener el perfil:', error);
      throw new Error(
        (error as AxiosError<{ message: string }>).response?.data?.message || 'No se pudo obtener el perfil del jugador'
      );
    }
  }
}

export const profileService = new ProfileService();
