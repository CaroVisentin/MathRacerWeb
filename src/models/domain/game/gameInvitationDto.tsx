export interface GameInvitationDto {
  id: number;
  fromPlayerId: number;
  fromPlayerName: string;
  toPlayerId: number;
  toPlayerName: string;
  gameId: number;
  status: string; // "Pending", "Accepted", "Rejected"
  createdAt: string;
  expiresAt?: string;
}

export interface SendInvitationRequest {
  fromPlayerId: number;
  toPlayerId: number;
  gameId: number;
}

export interface RespondInvitationRequest {
  invitationId: number;
  accept: boolean;
}
