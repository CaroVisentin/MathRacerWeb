import type { PlayerDto } from "./playerDto";

export interface OnlineGameDto {
    gameId: number;
    gameName: string;
    isPrivate: boolean;
    status: string;
    players: PlayerDto[];
    winnerId?: number;
    createdAt: string;
    questionCount: number;
    conditionToWin: number;
    expectedResult: string;
    creatorPlayerId: number;
}