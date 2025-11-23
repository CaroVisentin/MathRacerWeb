export interface InfiniteQuestionDto {
    questionId: number;
    equation: string;
    options: number[];
    correctAnswer: number;
    expectedResult: string;
}