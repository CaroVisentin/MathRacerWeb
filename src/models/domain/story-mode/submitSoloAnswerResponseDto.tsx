
/*
* Respuesta al enviar una respuesta - Sólo feedback esencial
*/
export interface SubmitSoloAnswerResponseDto {
    isCorrect: number;
    playerAnswer: number;

    // Estado crítico del juego
    status: string;
    livesRemaining: number;
    playerPosition: number;
    totalQuestions: number;

    // Ganador (sólo si terminó)
    winnerId?: number;
    winnerName?: string;
}