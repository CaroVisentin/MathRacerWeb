export interface SubmitInfiniteAnswerResponseDto {
    isCorrect: boolean;
    correctAnswer: number;
    totalCorrectAnswers: number;
    currentQuestionIndex: number;
    needsNewBatch: boolean;
}