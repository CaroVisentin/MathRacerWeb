import { api, API_URLS } from "../network/api";
import type { GameInvitationDto } from "../../models/domain/game/gameInvitationDto";

interface SendInvitationRequest {
  invitedFriendId: number;
  difficulty: string;
  expectedResult: string;
}

interface SendInvitationResponse {
  invitationId: number;
  gameId: number;
  invitedPlayerName: string;
  gameName: string;
  difficulty: string;
  expectedResult: string;
  message: string;
}

interface GetInvitationsResponse {
  totalInvitations: number;
  invitations: GameInvitationDto[];
}

interface RespondInvitationRequest {
  invitationId: number;
  accept: boolean;
}

interface RespondInvitationResponse {
  accepted: boolean;
  gameId?: number;
  message: string;
}

export const gameInvitationService = {
  /**
   * Envía una invitación de juego a un amigo
   * Crea una partida privada automáticamente
   */
  async sendInvitation(request: SendInvitationRequest): Promise<SendInvitationResponse> {
    try {
      const { data } = await api.post<SendInvitationResponse>(
        `${API_URLS.gameInvitation}/send`,
        request
      );
      return data;
    } catch (error) {
      console.error("Error enviando invitación:", error);
      throw error;
    }
  },

  /**
   * Obtiene las invitaciones pendientes del jugador autenticado (buzón)
   */
  async getInvitations(): Promise<GameInvitationDto[]> {
    try {
      const { data } = await api.get<GetInvitationsResponse>(
        `${API_URLS.gameInvitation}/inbox`
      );
      return data.invitations;
    } catch (error) {
      console.error("Error obteniendo invitaciones:", error);
      throw error;
    }
  },

  /**
   * Responde a una invitación (aceptar o rechazar)
   */
  async respondInvitation(request: RespondInvitationRequest): Promise<RespondInvitationResponse> {
    try {
      const { data } = await api.post<RespondInvitationResponse>(
        `${API_URLS.gameInvitation}/respond`,
        request
      );
      return data;
    } catch (error) {
      console.error("Error respondiendo invitación:", error);
      throw error;
    }
  },
};
