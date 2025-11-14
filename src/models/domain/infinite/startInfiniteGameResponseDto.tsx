import type { InfiniteQuestionDto } from "./infiniteQuestionDto";

export interface StartInfiniteGameResponseDto {
    gameId: number;
    playerName: string;
    questions: InfiniteQuestionDto[];
    totalCorrectAnswers: number;
    currentBatch: number;
}