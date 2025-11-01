import type { ProductDto } from "./productDto";
import type { QuestionDto } from "./questionDto";

/*
* Respuesta al iniciar una partida individual
*/
export interface StartSoloGameResponseDto {
    gameId: number;
    playerId: number;
    playerName: string;
    levelId: number;

    totalQuestions: number;
    timePerEquation: number;
    livesRemaining: number;
    gameStartedAt: Date;
    currentQuestion: QuestionDto;

    playerProducts: ProductDto;
    machineProducts: ProductDto;
}
