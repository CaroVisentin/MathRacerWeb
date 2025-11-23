import type { AvailableGameDto } from "./availbleGameDto";


export interface AvailableGamesResponseDto {
    games: AvailableGameDto[];
    totalGames: number;
    publicGames: number;
    privateGames: number;
    timestamp: string;
}