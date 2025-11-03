import type { SoloProductDto } from "./productDto";
import type { SoloQuestionDto } from "./questionDto";

/*
* DTO de respuesta para el inicio de una partida individual
*/
export interface StartSoloGameResponseDto {
    //  ID único de la partida generada
    gameId: number;
    // ID del jugador que inició la partida
    playerId: number;
    // Nombre del jugador
    playerName: string;
    // ID del nivel seleccionado
    levelId: number;

    // Cantidad total de preguntas en la partida
    totalQuestions: number; 
    // Tiempo en segundos asignado por ecuación
    timePerEquation: number;
    // Vidas restantes del jugador (inicial: 3)
    livesRemaining: number;
    //  Fecha y hora UTC de inicio de la partida
    gameStartedAt: Date;
    //  Primera pregunta de la partida con sus opciones de respuesta
    currentQuestion: SoloQuestionDto;

    // Lista de productos activos del jugador (auto, personaje, fondo)
    playerProducts: SoloProductDto[];
    // Lista de productos aleatorios asignados a la máquina
    machineProducts: SoloProductDto[];
}
