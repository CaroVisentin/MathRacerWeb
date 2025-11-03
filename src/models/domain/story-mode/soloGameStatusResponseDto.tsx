import type { WildcardDto } from "./wildcardDto";
import type { SoloQuestionDto } from "./soloQuestionDto";

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
    currentQuestion?: SoloQuestionDto;
    currentQuestionIndex: number;
    totalQuestions: number;
    timePerEquation: number;
    
    // Tiempos
    gameStartedAt: number;
    gameFinishedAt?: number;
    elapsedTime: number;

    // Wildcards
    availableWildcards: WildcardDto;
    usedWildcardTypes: number[];
    hasDoubleProgressActive: boolean;
    modifiedOptions?: number[];
}