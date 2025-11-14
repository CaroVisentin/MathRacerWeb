import type { InfiniteQuestionDto } from "./infiniteQuestionDto";

export interface LoadNextBatchResponseDto {
    gameId: number;
    questions: InfiniteQuestionDto[];
    currentBatch: number;
    totalCorrectAnswers: number;
}