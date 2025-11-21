export interface AvailableGameDto {
    gameId: number;
    gameName: string;
    isPrivate: boolean;
    requiresPassword: boolean;
    currentPlayers: number;
    maxPlayers: number;
    difficulty: string;
    expectedResult: string;
    createdAt: string;
    creatorName: string;
    isFull: boolean;
    status: string;
}