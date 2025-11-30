export interface GameInvitationDto {
  id: number;
  gameId: number;
  inviterPlayerName: string; // Nombre del jugador que invita
  gameName: string;
  difficulty: string;
  expectedResult: string;
  createdAt: string;
  status: string; // "Pending", "Accepted", "Rejected"
}

export interface SendInvitationRequest {
  invitedFriendId: number; // ID del amigo a invitar
  difficulty: string; // "Facil", "Medio", "Dificil"
  expectedResult: string; // "Mayor", "Menor"
}

export interface RespondInvitationRequest {
  invitationId: number;
  accept: boolean;
}

