import type { PlayerDto } from "./playerDto";

export interface GameResponseDto {
    gameId: number;
    players: PlayerDto[];
    status: string;
    maxQuestions: number;
    winnerId?: number;
    winnerName?: string;
    expectedResult: string;
}