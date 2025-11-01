import type { QuestionDto } from "./questionDto";

/*
* Respuesta al enviar una respuesta - Contiene TODO lo necesario para continuar
*/
export interface SubmitSoloAnswerResponseDto {
    isCorrect: number;
    correctAnswer: number;
    playerAnswer: number;

    // Estado crítico del juego
    status: string;
    livesRemaining: number;
    playerPosition: number;
    machinePosition: number;
    correctAnswers: number;

    nextQuestion: QuestionDto
    currentQuestionIndex: number;

    // Ganador (sólo si terminó)
    winnerId?: number;
    winnerName?: string;
}