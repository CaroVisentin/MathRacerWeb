import { api, API_URLS } from "../network/api";
import type { FriendDto } from "../../models/domain/profile/friends/friendDto";
import type { FriendRequestDto } from "../../models/domain/profile/friends/friendRequestDto";
import type { AxiosError } from "axios";
import type { PlayerProfileDto } from "../../models/domain/profile/playerProfileDto";

export const friendshipService = {
  async getFriends(playerId: number) {
    try {
      const res = await api.get(`/Friendship/${playerId}/friends`);
      return res.data as FriendDto[];
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      throw new Error(
        (axiosError.response?.data as string) || "Error al obtener amigos."
      );
    }
  },

  async sendFriendRequest(request: FriendRequestDto) {
    try {
      const res = await api.post(`${API_URLS.friends}/request`, request);
      return res.status === 201;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      throw new Error(
        (axiosError.response?.data as string) || "Error al enviar solicitud."
      );
    }
  },

  async acceptFriendRequest(request: FriendRequestDto) {
    try {
      const res = await api.post(`${API_URLS.friends}/accept`, request);
      return res.status === 200;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      throw new Error(
        (axiosError.response?.data as string) || "Error al aceptar solicitud."
      );
    }
  },

  async rejectFriendRequest(request: FriendRequestDto) {
    try {
      const res = await api.post(`${API_URLS.friends}/reject`, request);
      return res.status === 200;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      throw new Error(
        (axiosError.response?.data as string) || "Error al rechazar solicitud."
      );
    }
  },

  async getFriendRequests(playerId: number) {
    try {
      const res = await api.get(`${API_URLS.friends}/${playerId}/pending`);
      return res.data as FriendDto[];
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      throw new Error(
        (axiosError.response?.data as string) || "Error al obtener solicitudes."
      );
    }
  },

  async deleteFriend(request: FriendRequestDto) {
    try {
      const res = await api.post(`${API_URLS.friends}/delete`, request);
      return res.status === 200;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      throw new Error(
        (axiosError.response?.data as string) || "Error al eliminar amigo."
      );
    }
  },

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
    },
 
};
