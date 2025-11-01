
/*
* Respuesta al enviar una respuesta en partida individual
*/
export interface SubmitSoloAnswerResponseDto {
    // Feedback de la respuesta
    isCorrect: number;
    correctAnswer: number;
    playerAnswer: number;

    // Estado del juego
    status: string;
    livesRemaining: number;
    playerPosition: number;
    machinePosition: number;
    correctAnswers: number;

    // Control de tiempo
    waitTimeSeconds: number;
    answeredAt: Date;

    currentQuestionIndex: number;
}