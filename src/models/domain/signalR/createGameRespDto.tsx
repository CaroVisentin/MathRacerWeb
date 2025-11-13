import type { PlayerDto } from "./playerDto";

export interface CreateGameResponseDto {
    gameId: number;
    gameName: string;
    isPrivate: boolean;
    status: string;
    players: PlayerDto[];
    createdAt: string;
    questionCount: number;
    conditionToWin: number;
    expectedResult: string;
    powerUpsEnabled: boolean;
    creatorPlayerId: number;
    message: string;
}