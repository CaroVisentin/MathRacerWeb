export interface InfiniteGameStatusResponseDto {
    gameId: number;
    playerName: string;
    totalCorrectAnswers: number;
    currentQuestionIndex: number;
    currentBatch: number;
    isActive: boolean;
    gameStartedAt: number;
    abandonedAt?: Date;
}