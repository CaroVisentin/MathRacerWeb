import type { QuestionDto } from "./questionDto";

/*
* Estado completo de la partida individual (GET)
*/
export interface SoloGameStatusResponseDto {
    gameId: number;
    status: string;

    // Progreso
    playerPosition: number;
    machinePosition: number;
    livesRemaining: number;
    correctAnswers: number;

    // Pregunta actual
    currentQuestion?: QuestionDto;
    currentQuestionIndex: number;
    totalQuestions: number;
    timePerEquation: number;
    
    // Tiempos
    gameStartedAt: number;
    gameFinishedAt?: number;
    elapsedTime: number;
}