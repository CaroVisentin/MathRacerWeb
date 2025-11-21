export interface GameInvitation {
  id: number;
  fromPlayerId: number;
  fromPlayerName: string;
  fromPlayerAvatar?: string;
  toPlayerId: number;
  gameId: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: Date;
  expiresAt?: Date;
}
