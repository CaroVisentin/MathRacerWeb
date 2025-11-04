
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

    // Indica si el jugador debe abrir un cofre por completar el último nivel del mundo
    shouldOpenWorldCompletionChest: boolean;
    progressIncrement: number;

    coinsEarned: number; // Cantidad de monedas obtenidas al completar el nivel (0 si no completó)
}