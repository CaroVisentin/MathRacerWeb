import type { QuestionDto } from "./questionDto";

/*
* Respuesta al iniciar una partida individual
*/
export interface StartSoloGameResponseDto {
    gameId: number;
    playerId: number;
    playerName: string;
    levelId: number;

    // Configuración del juego
    totalQuestions: number;
    timePerEquation: number;
    livesRemaining: number;

    // Primera pregunta
    currentQuestion: QuestionDto;

    gameStartedAt: Date;
}
